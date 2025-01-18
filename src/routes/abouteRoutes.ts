import express from "express";
import { addTimeline, getTimeline } from "../controllers/timelineController";
import {
  addCurrentInterests,
  getCurrentInterests,
} from "../controllers/currentInterestsController";
import { getAboutLabels } from "../controllers/aboutLabelsController";

const router = express.Router();

// Timeline routes
router.post("/timeline", addTimeline); // Yeni zaman çizelgesi ekle
router.get("/timeline/:component/:language", getTimeline); // Zaman çizelgesi getir

// Current Interests routes
router.post("/interests", addCurrentInterests); // Yeni ilgi alanları ekle
router.get("/interests/:component/:language", getCurrentInterests); // İlgi alanları getir

router.get("/labels/:language", getAboutLabels);
export default router;
