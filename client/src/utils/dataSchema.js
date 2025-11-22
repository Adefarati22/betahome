import { z } from "zod";

export const validatedSignUpSchema = z
  .object({
    firstName: z.string().min(3, {
      message: "First name must be at least 3 characters long",
    }),
    lastName: z.string().min(3, {
      message: "Last Name must be at least 3 characters long",
    }),
    email: z.email(),
    password: z
      .string()
      .min(8, {
        message: "password must be at least 8 characters long",
      })
      .regex(/[A-Z]/, {
        message: "password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "password must contain at least one number",
      })
      .regex(/[!@$%^&*(,.?":{}|<>]/, {
        message: "password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const validatedSignInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, {
      message: "password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "password must contain at least one number",
    })
    .regex(/[!@$%^&*(,.?":{}|<>~#_/-]/, {
      message: "password must contain at least one special character",
    }),
});

export const validateAccountSchema = z.object({
  verificationToken: z.string().min(6, {
    message: "Verification code must be at least 6 characters long",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
});

export const validateResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
       .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
