import express from "express";
import {
  getAllProperties,
  newProperty,
} from "../controllers/propertyController.js";
import { rateLimiter, refreshTokenLimit } from "../middlewares/rateLimit.js";


const router = express.Router();

router.get("/all", rateLimiter, getAllProperties);
router.post(
  "/create",
  rateLimiter,
  newProperty
);

export default router;
