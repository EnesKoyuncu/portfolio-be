import mongoose, { Schema, Document } from "mongoose";

export interface ICurrentInterests extends Document {
  component: string; // Örneğin "about"
  language: string; // Örneğin "en", "tr", "de"
  interests: string[]; // İlgi alanları dizisi
}

const currentInterestsSchema: Schema = new Schema({
  component: { type: String, required: true },
  language: { type: String, required: true },
  interests: { type: [String], required: true },
});

const CurrentInterests = mongoose.model<ICurrentInterests>(
  "CurrentInterests",
  currentInterestsSchema
);

export default CurrentInterests;
