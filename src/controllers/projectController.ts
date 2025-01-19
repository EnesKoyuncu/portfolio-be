import { Request, Response } from "express";
import Project from "../models/projectModel";

// Tüm projeleri getir (dil desteği ile)
export const getProjects = async (req: Request, res: Response) => {
  try {
    const { language } = req.query;
    const projects = await Project.find();

    const localizedProjects = projects.map((project) => ({
      id: project._id,
      title: project.title[language as string] || project.title["en"],
      description:
        project.description[language as string] || project.description["en"],
      images: project.images,
      link: project.link,
    }));

    // `success` alanını ekleyin
    res.status(200).json({ success: true, data: localizedProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch projects" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, images, link } = req.body;
    const newProject = new Project({ title, description, images, link });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};
