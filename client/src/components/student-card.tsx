import { Student } from "@shared/schema";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  // Function to determine status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  return (
    <Card className="bg-white shadow hover:shadow-md transition duration-150 ease-in-out overflow-hidden">
      <CardContent className="p-0">
        <div className="px-6 py-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-neutral-900">{student.name}</h3>
              <p className="text-sm text-neutral-500">ID: {student.studentId}</p>
            </div>
            <span 
              className={cn(
                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                getStatusBadgeClass(student.status)
              )}
            >
              {student.status}
            </span>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-neutral-400 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <span className="text-sm text-neutral-500">{student.email}</span>
            </div>
            
            <div className="flex items-center mt-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-neutral-400 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span className="text-sm text-neutral-500">{student.phone}</span>
            </div>
            
            <div className="flex items-center mt-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-neutral-400 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
              <span className="text-sm text-neutral-500">{student.major}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
