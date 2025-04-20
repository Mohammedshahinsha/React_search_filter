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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students?.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {/* Pagination - Note: This would be implemented with actual pagination logic in a real app */}
      <div className="mt-6 flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">Previous</button>
          <button className="relative ml-3 inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">Next</button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-neutral-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{students?.length || 0}</span> of <span className="font-medium">{students?.length || 0}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">1</button>
              <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
