import { Student } from "@shared/schema";

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  // Function to determine status text style
  const getStatusStyle = (status: string) => {
    return status === "Active" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="py-2 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <span className="font-medium">{student.name}</span>
        <span className={getStatusStyle(student.status)}>
          {student.status}
        </span>
      </div>
    </div>
  );
}
