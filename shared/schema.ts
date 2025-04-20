import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Student table schema
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  studentId: text("student_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  major: text("major").notNull(),
  status: text("status").notNull(), // "Active", "Inactive", "On Leave"
});

// Insert schema for students table
export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
});

// Types for the student
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;

// For form validation
export const studentSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  major: z.string().min(1, "Major is required"),
  status: z.enum(["Active", "Inactive"]),
});
