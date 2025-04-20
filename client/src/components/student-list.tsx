import { Student } from "@shared/schema";
import StudentCard from "./student-card";

interface StudentListProps {
  students?: Student[];
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
  onClearSearch: () => void;
}

export default function StudentList({
  students,
  isLoading,
  error,
  onRetry,
  onClearSearch
}: StudentListProps) {
  // Function to render loading skeleton
  const renderSkeleton = () => {
    return Array(6).fill(0).map((_, i) => (
      <div key={`skeleton-${i}`} className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-5">
          <div className="bg-neutral-200 h-6 w-3/4 rounded mb-4 animate-pulse"></div>
          <div className="bg-neutral-200 h-4 w-1/2 rounded mb-2 animate-pulse"></div>
          <div className="bg-neutral-200 h-4 w-2/3 rounded mb-4 animate-pulse"></div>
          <div className="flex items-center mt-4">
            <div className="bg-neutral-200 h-10 w-10 rounded-full mr-3 animate-pulse"></div>
            <div>
              <div className="bg-neutral-200 h-4 w-24 rounded mb-1 animate-pulse"></div>
              <div className="bg-neutral-200 h-3 w-32 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  // Render loading state
  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderSkeleton()}
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading students</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.message || "Unable to fetch student data. Please try again later."}</p>
            </div>
            <div className="mt-4">
              <button 
                type="button" 
                onClick={onRetry}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render empty results
  if (students && students.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-neutral-900">No students found</h3>
        <p className="mt-1 text-sm text-neutral-500">Try adjusting your search or filter criteria</p>
        <div className="mt-6">
          <button 
            type="button" 
            onClick={onClearSearch}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Clear search
          </button>
        </div>
      </div>
    );
  }

  // Render student list
  return (
    <div className="bg-white rounded p-4">
      <div className="mb-2 pb-2 border-b border-gray-300 font-medium">
        <div className="flex justify-between">
          <span>Name</span>
          <span>Status</span>
        </div>
      </div>
      <div>
        {students?.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Total: {students?.length || 0} students
      </div>
    </div>
  );
}
