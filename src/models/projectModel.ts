import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: {
    [key: string]: string; // Örneğin: { en: "Web Project", tr: "Web Projesi", de: "Web Projekt" }
  };
  description: {
    [key: string]: string; // Örneğin: { en: "Description in English", tr: "Türkçe Açıklama", de: "Beschreibung auf Deutsch" }
  };
  images: string[];
  link: string;
}

const projectSchema: Schema = new Schema({
  title: { type: Object, required: true },
  description: { type: Object, required: true },
  images: { type: [String], required: true },
  link: { type: String, required: true },
});

export default mongoose.model<IProject>("Project", projectSchema);
