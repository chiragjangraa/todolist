import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  category: String,
  inStock: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;