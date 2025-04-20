import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStudentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Endpoint to get all students
  app.get("/api/students", async (req, res) => {
    try {
      const students = await storage.getStudents();
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Failed to fetch students" });
    }
  });

  // API Endpoint to get a single student by ID
  app.get("/api/students/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }

      const student = await storage.getStudent(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ message: "Failed to fetch student" });
    }
  });

  // API Endpoint to create a new student
  app.post("/api/students", async (req, res) => {
    try {
      const validatedData = insertStudentSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid student data", 
          errors: validatedData.error.errors 
        });
      }

      const newStudent = await storage.createStudent(validatedData.data);
      res.status(201).json(newStudent);
    } catch (error) {
      console.error("Error creating student:", error);
      res.status(500).json({ message: "Failed to create student" });
    }
  });

  // API Endpoint to update an existing student
  app.put("/api/students/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }

      // Validate the update data, allowing partial updates
      const partialSchema = insertStudentSchema.partial();
      const validatedData = partialSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid student data", 
          errors: validatedData.error.errors 
        });
      }

      const updatedStudent = await storage.updateStudent(id, validatedData.data);
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json(updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ message: "Failed to update student" });
    }
  });

  // API Endpoint to delete a student
  app.delete("/api/students/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }

      const success = await storage.deleteStudent(id);
      if (!success) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ message: "Failed to delete student" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
