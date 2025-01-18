import { Request, Response } from "express";
import Timeline from "../models/timelineModel";

// POST: Yeni bir zaman çizelgesi ekle
export const addTimeline = async (req: Request, res: Response) => {
  try {
    const { component, language, date, icon, title, subtitle, description } =
      req.body;
    const newTimeline = new Timeline({
      component,
      language,
      date,
      icon,
      title,
      subtitle,
      description,
    });
    await newTimeline.save();
    res.status(201).json({ success: true, message: "Timeline added!" });
  } catch (error) {
    console.error("Error adding timeline:", error);
    res
      .status(500)
      .json({ success: false, message: "Timeline could not be added." });
  }
};

// GET: Belirli bir component ve dile ait zaman çizelgesini getir
export const getTimeline = async (req: Request, res: Response) => {
  try {
    const { component, language } = req.params;
    const timelines = await Timeline.find({ component, language });
    res.status(200).json({ success: true, data: timelines });
  } catch (error) {
    console.error("Error fetching timeline:", error);
    res
      .status(500)
      .json({ success: false, message: "Timeline could not be fetched." });
  }
};
