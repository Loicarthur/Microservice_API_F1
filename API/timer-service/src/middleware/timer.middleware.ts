import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Variable d'état pour le timer (dans un contexte de production, cette logique peut être plus complexe)
let timerActive = false;

// Middleware complet pour le service Timer
export const timerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Vérification de l'authentification (Token JWT)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, access denied" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = user; // Déclarez `user` dans le type `Request` si besoin
  } catch (err) {
    return res.status(403).json({ message: "Invalid token, access denied" });
  }

  // 2. Vérification des permissions (l'utilisateur doit avoir le rôle "timer")
  if (!req.user.permissions || !req.user.permissions.includes("timer")) {
    return res
      .status(403)
      .json({
        message:
          "Access denied: insufficient permissions for timer operations.",
      });
  }

  // 3. Vérification de l'état du timer selon l'action demandée
  if (req.path === "/start" && timerActive) {
    return res.status(400).json({ message: "A timer is already active." });
  } else if (req.path === "/stop" && !timerActive) {
    return res.status(400).json({ message: "No active timer to stop." });
  }

  // Si tout est bon, continuer à l'action du contrôleur
  next();
};

// Fonctions du timer à inclure dans le contrôleur (pour un exemple simple)
export const startTimer = (req: Request, res: Response) => {
  timerActive = true;
  res.json({ message: "Timer started." });
};

export const stopTimer = (req: Request, res: Response) => {
  timerActive = false;
  res.json({ message: "Timer stopped." });
};
