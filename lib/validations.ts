import { z } from "zod";

// Admin Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Gallery Creation/Upload Schema
export const gallerySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long")
    .trim(),
  category: z
    .string()
    .min(1, "Please select or enter a category")
    .max(50, "Category is too long")
    .trim(),
  url: z.string().url("Please provide a valid image URL"),
});

export type GalleryInput = z.infer<typeof gallerySchema>;

// Donation Schema (Matches Indian Compliance Requirements)
export const donationSchema = z.object({
  name: z
    .string()
    .min(1, "Donor name is required")
    .min(2, "Donor name must be at least 2 characters")
    .max(100, "Donor name is too long")
    .trim(),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be a positive number")
    .min(1, "Amount must be at least ₹1"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\+?[0-9\s\-]+$/, "Invalid phone number format")
    .trim(),
  panCard: z
    .string()
    .min(1, "PAN Card is required")
    .length(10, "PAN Card must be exactly 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, "Invalid PAN Card format (e.g. ABCDE1234F)")
    .toUpperCase()
    .trim(),
  transactionId: z
    .string()
    .min(1, "Transaction ID / UTR is required")
    .min(6, "Transaction ID / UTR must be at least 6 characters")
    .trim(),
});

export type DonationInput = z.infer<typeof donationSchema>;
