import mongoose from "mongoose";
import dotenv from "dotenv";

import Influencer from "./models/influencer.js";
import Banner from "./models/banner.js";
import PrintMedia from "./models/print.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Mongo Connected for Seeding");

    // Clear old data
    await Influencer.deleteMany();
    await Banner.deleteMany();
    await PrintMedia.deleteMany();

    console.log("🗑 Old marketing data cleared");

    const genres = ["Action", "Mass", "Romance", "Family", "Comedy", "Thriller"];
    const cities = ["Hyderabad", "Vijayawada", "Visakhapatnam"];

    // ------------------------
    // 🎥 TELUGU INFLUENCERS
    // ------------------------
    const influencers = [];

    for (let i = 1; i <= 50; i++) {
      const genre = genres[Math.floor(Math.random() * genres.length)];
      const followers = Math.floor(Math.random() * 800000) + 50000;
      const engagementRate = parseFloat((Math.random() * 0.1 + 0.05).toFixed(2));
      const reelCost = Math.floor(followers * 0.04);

      influencers.push({
        name: `Telugu Cine Influencer ${i}`,
        niche: [genre],
        followers,
        engagementRate,
        reelCost,
        location: cities[Math.floor(Math.random() * cities.length)]
      });
    }

    await Influencer.insertMany(influencers);
    console.log("🎥 Influencers Seeded");

    // ------------------------
    // 🏙 TELUGU BANNER LOCATIONS
    // ------------------------
   const banners = [
  { location: "Hyderabad", dailyCost: 20000, estimatedReach: 150000 },
  { location: "Hyderabad", dailyCost: 12000, estimatedReach: 90000 },
  { location: "Hyderabad", dailyCost: 15000, estimatedReach: 110000 },
  { location: "Vijayawada", dailyCost: 8000, estimatedReach: 60000 },
  { location: "Vijayawada", dailyCost: 10000, estimatedReach: 70000 },
  { location: "Visakhapatnam", dailyCost: 10000, estimatedReach: 75000 },
  { location: "Visakhapatnam", dailyCost: 14000, estimatedReach: 95000 },
  { location: "Warangal", dailyCost: 6000, estimatedReach: 45000 },
  { location: "Tirupati", dailyCost: 7000, estimatedReach: 50000 },
  { location: "Guntur", dailyCost: 9000, estimatedReach: 65000 }
];

    await Banner.insertMany(banners);
    console.log("🏙 Banners Seeded");

    // ------------------------
    // 📰 TELUGU PRINT MEDIA
    // ------------------------
    const printMedia = [
  { name: "Eenadu", city: "Hyderabad", adCost: 80000, estimatedReach: 500000 },
  { name: "Sakshi", city: "Hyderabad", adCost: 75000, estimatedReach: 450000 },
  { name: "Andhra Jyothy", city: "Vijayawada", adCost: 50000, estimatedReach: 300000 },
  { name: "Namaste Telangana", city: "Hyderabad", adCost: 40000, estimatedReach: 250000 },
  { name: "Suryaa", city: "Visakhapatnam", adCost: 35000, estimatedReach: 200000 },
  { name: "Vaartha", city: "Vijayawada", adCost: 30000, estimatedReach: 180000 },
  { name: "Andhra Bhoomi", city: "Hyderabad", adCost: 45000, estimatedReach: 220000 },
  { name: "Prajashakti", city: "Warangal", adCost: 25000, estimatedReach: 150000 },
  { name: "Great Andhra Weekly", city: "Hyderabad", adCost: 20000, estimatedReach: 120000 },
  { name: "Telangana Today", city: "Hyderabad", adCost: 38000, estimatedReach: 210000 }
];

    await PrintMedia.insertMany(printMedia);
    console.log("📰 Print Media Seeded");

    console.log("🎉 Telugu Marketing Data Ready");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeding Error:", err);
  });