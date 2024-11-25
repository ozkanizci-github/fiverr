import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

// 1) Router oluştur
const router = express.Router();

//2) Yolları belirler
router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

//3)Router app'e tanıtmak için export et
export default router;
