import mongoose from "mongoose";

const influencerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    niche: [{ type: String, required: true }],
    followers: { type: Number, required: true },
    engagementRate: { type: Number, required: true },
    reelCost: { type: Number, required: true },
    location: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Influencer", influencerSchema);