import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  location: { type: String, required: true },
  dailyCost: { type: Number, required: true },
  estimatedReach: { type: Number, required: true }
});

export default mongoose.model("Banner", bannerSchema);