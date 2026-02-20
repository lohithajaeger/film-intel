import express from "express";
import Project from "../models/project.js";
import Influencer from "../models/influencer.js";
import Banner from "../models/banner.js";
import PrintMedia from "../models/print.js";

const router = express.Router();

// Create Project
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Marketing Options for a Project
router.get("/:id/marketing-options", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const budget = project.marketingBudget;
    const city = project.targetCity;
    const genre = project.genre;

    // 🔹 Influencers
    const influencers = await Influencer.find({
      niche: genre,
      reelCost: { $lte: budget },
      location: city
    });

    const sortedInfluencers = influencers
      .map((inf) => ({
        ...inf._doc,
        roi: inf.engagementRate / inf.reelCost
      }))
      .sort((a, b) => b.roi - a.roi)
      .slice(0, 10);

    // 🔹 Banners
    const banners = await Banner.find({
      location: city,
      dailyCost: { $lte: budget }
    });

    const sortedBanners = banners
      .map((b) => ({
        ...b._doc,
        roi: b.estimatedReach / b.dailyCost
      }))
      .sort((a, b) => b.roi - a.roi);

    // 🔹 Print Media
    const printMedia = await PrintMedia.find({
      city: city,
      adCost: { $lte: budget }
    });

    const sortedPrintMedia = printMedia
      .map((p) => ({
        ...p._doc,
        roi: p.estimatedReach / p.adCost
      }))
      .sort((a, b) => b.roi - a.roi);

    res.json({
      influencers: sortedInfluencers,
      banners: sortedBanners,
      printMedia: sortedPrintMedia
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;   // ← THIS LINE IS IMPORTANT