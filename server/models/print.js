import mongoose from "mongoose";

const printSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  adCost: { type: Number, required: true },
  estimatedReach: { type: Number, required: true }
});

export default mongoose.model("PrintMedia", printSchema);