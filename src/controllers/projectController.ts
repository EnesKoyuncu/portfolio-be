import { Request, Response } from "express";
import Project from "../models/projectModel";
import { IProject } from "../models/projectModel";

// Tüm projeleri getir (dil desteği ile)
export const getProjects = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { language } = req.query;

    if (!language) {
      return res
        .status(400)
        .json({ success: false, message: "Language query param is required" });
    }

    const projects = await Project.find();

    const localizedProjects = projects.map((project: IProject) => ({
      id: project._id.toString(), // ObjectId'yi string'e çevir
      title: project.title[language as string] || project.title["en"],
      description:
        project.description[language as string] || project.description["en"],
      images: project.images,
      link: project.link,
    }));

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
