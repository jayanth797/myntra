const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    viewedProducts: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        timestamp: { type: Date, default: Date.now }
      }
    ],
    preferredCategories: [
      {
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        count: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
