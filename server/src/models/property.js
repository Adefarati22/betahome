import mongoose, { model, Schema } from "mongoose";

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location cannot be more than 100 characters"],
    },
    bedrooms: {
      type: String,
      required: true,
    },
    bathrooms: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["For Sale", "For Rent"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: {
      type: String,
      required: true,
    },
    sqft: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
 const Property = mongoose.models.Property || model("Property", propertySchema);
 export default Property;
