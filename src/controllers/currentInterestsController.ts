import { Request, Response } from "express";
import CurrentInterests from "../models/currentInterestsModel";

// POST: Yeni bir ilgi alanları dizisi ekle
export const addCurrentInterests = async (req: Request, res: Response) => {
  try {
    const { component, language, interests } = req.body;
    const newInterests = new CurrentInterests({
      component,
      language,
      interests,
    });
    await newInterests.save();
    res
      .status(201)
      .json({ success: true, message: "Current interests added!" });
  } catch (error) {
    console.error("Error adding current interests:", error);
    res.status(500).json({
      success: false,
      message: "Current interests could not be added.",
    });
  }
};

// GET: Belirli bir component ve dile ait ilgi alanlarını getir
export const getCurrentInterests = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { component, language } = req.params;
    const interests = await CurrentInterests.findOne({ component, language });
    if (!interests) {
      return res
        .status(404)
        .json({ success: false, message: "No interests found." });
    }
    res.status(200).json({ success: true, data: interests });
  } catch (error) {
    console.error("Error fetching current interests:", error);
    res.status(500).json({
      success: false,
      message: "Current interests could not be fetched.",
    });
  }
};
