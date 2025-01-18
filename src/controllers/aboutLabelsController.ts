import { Request, Response } from "express";
import Text from "../models/textModel";

// About için başlıkları getir
export const getAboutLabels = async (req: Request, res: Response) => {
  try {
    const { language } = req.params;

    // Text koleksiyonunda "about" componenti ve gerekli keyler için veri bul
    const texts = await Text.find({
      component: "about",
      key: {
        $in: ["technologiesLabel", "currentInterestsLabel", "timelineLabel"],
      },
    });

    // Gelen verilerden sadece seçili dile ait çevirileri al
    const labels = texts.reduce((acc: any, text: any) => {
      acc[text.key] = text.translations[language] || text.translations["en"];
      return acc;
    }, {});

    res.status(200).json({ success: true, labels });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching about labels:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch about labels",
        error: error.message,
      });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};
