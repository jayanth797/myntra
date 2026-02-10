const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Product.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const productid = req.params.id;
  try {
    const product = await Product.findById(productid);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Record a product view
router.post("/:id/view", async (req, res) => {
  const { userId } = req.body;
  const productId = req.params.id;

  if (!userId) return res.status(200).json({ message: "No user to track" });

  try {
    const User = require("../models/User");
    const Category = require("../models/Category");

    // 1. Update viewedProducts (limit to last 20)
    await User.findByIdAndUpdate(userId, {
      $pull: { viewedProducts: { productId: productId } }, // Remove if exists to push to top
    });
    await User.findByIdAndUpdate(userId, {
      $push: {
        viewedProducts: {
          $each: [{ productId, timestamp: new Date() }],
          $slice: -20 // Keep only last 20
        }
      }
    });

    // 2. Find category of this product to update preferences
    const category = await Category.findOne({ productId: productId });
    if (category) {
      // Check if category exists in preferences
      const user = await User.findById(userId);
      const existingPref = user.preferredCategories.find(p => p.categoryId.toString() === category._id.toString());

      if (existingPref) {
        await User.updateOne(
          { _id: userId, "preferredCategories.categoryId": category._id },
          { $inc: { "preferredCategories.$.count": 1 } }
        );
      } else {
        await User.findByIdAndUpdate(userId, {
          $push: { preferredCategories: { categoryId: category._id, count: 1 } }
        });
      }
    }

    res.status(200).json({ message: "View recorded" });
  } catch (e) {
    console.error("Tracking error", e);
    res.status(500).json({ message: "Tracking failed" });
  }
});

// Get Recommendations
router.get("/:id/recommendations", async (req, res) => {
  const currentProductId = req.params.id;
  const { userId } = req.query;

  try {
    const Category = require("../models/Category");

    // 1. Baseline: Get products from same category
    const category = await Category.findOne({ productId: currentProductId });
    let recommendations = [];
    let excludedIds = [currentProductId];

    if (category) {
      // Fetch products in this category
      const sameCategoryProducts = await Product.find({
        _id: { $in: category.productId, $ne: currentProductId }
      }).limit(5);
      recommendations = [...sameCategoryProducts];
      excludedIds = [...excludedIds, ...sameCategoryProducts.map(p => p._id.toString())];
    }

    // 2. User Specific: if logged in, fetch from preferred categories
    if (userId) {
      const User = require("../models/User");
      const user = await User.findById(userId);
      if (user && user.preferredCategories && user.preferredCategories.length > 0) {
        // Sort categories by count desc
        const topCategories = user.preferredCategories.sort((a, b) => b.count - a.count).slice(0, 3);

        for (const pref of topCategories) {
          // Don't fetch from the same category we just fetched if possible, or just add more diversity
          if (category && pref.categoryId.toString() === category._id.toString()) continue;

          const prefCat = await Category.findById(pref.categoryId);
          if (prefCat) {
            const similarProducts = await Product.find({
              _id: { $in: prefCat.productId, $nin: excludedIds }
            }).limit(3);
            recommendations = [...recommendations, ...similarProducts];
            excludedIds = [...excludedIds, ...similarProducts.map(p => p._id.toString())];
          }
        }
      }
    }

    // 3. Fallback: Random products if we don't have enough
    if (recommendations.length < 5) {
      const randomProducts = await Product.find({ _id: { $nin: excludedIds } }).limit(5 - recommendations.length);
      recommendations = [...recommendations, ...randomProducts];
    }

    res.status(200).json(recommendations);

  } catch (e) {
    console.error("Recommendation error", e);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
});

module.exports = router;
