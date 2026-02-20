import mongoose from "mongoose";

const castSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }
});

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String },
    marketingBudget: { type: Number, required: true },
    targetCity: { type: String, required: true },
    releaseDate: { type: Date },
    cast: [castSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);