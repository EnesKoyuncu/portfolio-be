import express from "express";
import {
  addText,
  getAllTexts,
  getTextsByComponent,
} from "../controllers/textController";

const router = express.Router();

// Tüm textleri getir
router.get("/", getAllTexts);

// Belirli bir component'e ait textleri getir
router.get("/:component", getTextsByComponent);

router.post("/addText", addText);

export default router;
