import express from "express";
import {
  addText,
  getAllTexts,
  getTextsByComponent,
  getTextsByComponentAndLang,
} from "../controllers/textController";

const router = express.Router();

// Tüm textleri getir
router.get("/", getAllTexts);

// Belirli bir component'e ait textleri getir
router.get("/:component", getTextsByComponent);

// Belirli bir component ve dile göre textleri getir
router.get("/:component/:language", getTextsByComponentAndLang);

// Text ekle
router.post("/addText", addText);

export default router;
