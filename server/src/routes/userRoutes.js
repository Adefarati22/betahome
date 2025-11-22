import express from "express";
import {
  register,
  login,
  authenticateUser,
  refreshAccessToken,
  verifyUserAccount,
  resendVerificationToken,
  forgotPassword,
  resetPassword,
  logout,
  uploadAvatar,
} from "../controllers/userController.js";
import { validateFormData } from "../middlewares/validateForm.js";
import { verifyAuth } from "../middlewares/authenticate.js";
import { rateLimiter, refreshTokenLimit } from "../middlewares/rateLimit.js";
import { cacheMiddleware, clearCache } from "../middlewares/cache.js";
import {
  forgotPasswordSchema,
  validateAccountSchema,
  validatedSignInSchema,
  validatedSignUpSchema,
  validateResetPasswordSchema,
} from "../utils/dataSchema.js";

const router = express.Router();

router.post("/create", validateFormData(validatedSignUpSchema), register);
router.post(
  "/login",
  rateLimiter,
  validateFormData(validatedSignInSchema),
  login
);

router.get(
  "/user",
  verifyAuth,
  cacheMiddleware("auth_user", 3600),
  authenticateUser
);

router.post("/refresh-token", refreshAccessToken);

router.patch(
  "/verify-account",
  rateLimiter,
  verifyAuth,
  validateFormData(validateAccountSchema),
  clearCache("auth_user"),
  verifyUserAccount
);

router.post(
  "/resend/verify-token",
  rateLimiter,
  verifyAuth,
  resendVerificationToken
);

router.post(
  "/forgot-password",
  rateLimiter,
  validateFormData(forgotPasswordSchema),
  forgotPassword
);

router.patch(
  "/reset-password",
  rateLimiter,
  validateFormData(validateResetPasswordSchema),
  resetPassword
);

router.post("/logout", verifyAuth, clearCache("auth_user"), logout);
router.patch(
  "/upload-avatar",
  verifyAuth,
  clearCache("auth_user"),
  uploadAvatar
);

export default router;
