import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(1, { message: "Description must not be empty" })
    .optional(),
  status: z.enum(["pending", "in-progress", "complete"]).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  status: z.enum(["pending", "in-progress", "complete"]),
  description: z
    .string()
    .min(1, { message: "Description must not be empty" })
    .optional(),
});
