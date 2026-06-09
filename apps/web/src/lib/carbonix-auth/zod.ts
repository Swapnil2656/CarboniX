import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long")
        .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = z
    .object({
        userName: z.string().min(2, "Username must be at least 2 characters"),
        email: z.string().min(1, "Email is required").email("Invalid Email"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters long")
            .max(32, "Password must be less than 32 characters"),
        confirmPassword: z.string().min(1, "Confirm Password is required"),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// Used server-side in auth-actions (no confirmPassword needed)
export const createUserSchema = z.object({
    userName: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long")
        .max(32, "Password must be less than 32 characters"),
});
