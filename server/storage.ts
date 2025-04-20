import { students, type Student, type InsertStudent } from "@shared/schema";

// Storage interface for student operations
export interface IStorage {
  getStudents(): Promise<Student[]>;
  getStudent(id: number): Promise<Student | undefined>;
  getStudentByStudentId(studentId: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student | undefined>;
  deleteStudent(id: number): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private students: Map<number, Student>;
  currentId: number;

  constructor() {
    this.students = new Map();
    this.currentId = 1;
    
    // Initialize with sample student data
    const sampleStudents: InsertStudent[] = [
      {
        studentId: "STU00123",
        name: "Alex Johnson",
        email: "alexj@example.com",
        phone: "(555) 123-4567",
        major: "Computer Science",
        status: "Active"
      },
      {
        studentId: "STU00456",
        name: "Sarah Williams",
        email: "sarahw@example.com",
        phone: "(555) 987-6543",
        major: "Biology",
        status: "Active"
      },
      {
        studentId: "STU00789",
        name: "Michael Chen",
        email: "michaelc@example.com",
        phone: "(555) 234-5678",
        major: "Engineering",
        status: "Inactive"
      },
      {
        studentId: "STU00234",
        name: "Emily Rodriguez",
        email: "emilyr@example.com",
        phone: "(555) 345-6789",
        major: "Psychology",
        status: "Active"
      },
      {
        studentId: "STU00567",
        name: "David Kim",
        email: "davidk@example.com",
        phone: "(555) 456-7890",
        major: "Business",
        status: "Inactive"
      },
      {
        studentId: "STU00890",
        name: "Jessica Patel",
        email: "jessicap@example.com",
        phone: "(555) 567-8901",
        major: "Chemistry",
        status: "Active"
      },
      {
        studentId: "STU00345",
        name: "Ryan Smith",
        email: "ryans@example.com",
        phone: "(555) 678-9012",
        major: "Physics",
        status: "Active"
      },
      {
        studentId: "STU00678",
        name: "Olivia Brown",
        email: "oliviab@example.com",
        phone: "(555) 789-0123",
        major: "Mathematics",
        status: "Inactive"
      },
      {
        studentId: "STU00901",
        name: "Ethan Wilson",
        email: "ethanw@example.com",
        phone: "(555) 890-1234",
        major: "History",
        status: "Active"
      },
      {
        studentId: "STU00432",
        name: "Sophia Martinez",
        email: "sophiam@example.com",
        phone: "(555) 901-2345",
        major: "English",
        status: "Inactive"
      },
      {
        studentId: "STU00765",
        name: "Noah Garcia",
        email: "noahg@example.com",
        phone: "(555) 012-3456",
        major: "Sociology",
        status: "Active"
      },
      {
        studentId: "STU00198",
        name: "Ava Thompson",
        email: "avat@example.com",
        phone: "(555) 123-4567",
        major: "Art",
        status: "Active"
      },
      {
        studentId: "STU00321",
        name: "Benjamin Lee",
        email: "benjaminl@example.com",
        phone: "(555) 234-5678",
        major: "Music",
        status: "Inactive"
      },
      {
        studentId: "STU00654",
        name: "Mia Nguyen",
        email: "mian@example.com",
        phone: "(555) 345-6789",
        major: "Political Science",
        status: "Active"
      },
      {
        studentId: "STU00987",
        name: "William Clark",
        email: "williamc@example.com",
        phone: "(555) 456-7890",
        major: "Economics",
        status: "Active"
      }
    ];
    
    // Add sample students to in-memory storage
    sampleStudents.forEach(student => {
      const id = this.currentId++;
      this.students.set(id, { ...student, id });
    });
  }

  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentByStudentId(studentId: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(
      (student) => student.studentId === studentId,
    );
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.currentId++;
    const student: Student = { ...insertStudent, id };
    this.students.set(id, student);
    return student;
  }

  async updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student | undefined> {
    const existingStudent = this.students.get(id);
    if (!existingStudent) {
      return undefined;
    }
    
    const updatedStudent = { ...existingStudent, ...student };
    this.students.set(id, updatedStudent);
    return updatedStudent;
  }

  async deleteStudent(id: number): Promise<boolean> {
    return this.students.delete(id);
  }
}

// Create and export the storage instance
export const storage = new MemStorage();
