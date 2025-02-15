import express from "express";
import { signup, login, logout, googleCallback } from "../controllers/auth.controller.js";
import passport from "passport";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// 🔹 Google Authentication Route
router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",passport.authenticate("google", { failureRedirect: "/login", session: true }), googleCallback);


export default router;