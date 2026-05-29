import express from 'express';

import { signup, login, logout, onBoarding } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/onboarding", protectRoute, onBoarding);

router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({success: true, user: req.user, "timestamp": new Date()});
})

export default router;
