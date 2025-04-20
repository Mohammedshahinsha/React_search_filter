import { ChangeEvent } from "react";

interface StudentSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearching: boolean;
}

export default function StudentSearch({ 
  searchQuery, 
  onSearchChange, 
  isSearching 
}: StudentSearchProps) {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="mb-6">
      <div className="relative rounded-md shadow-sm max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-neutral-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out sm:text-sm"
          placeholder="Search by name, ID, or email..." 
          aria-label="Search students"
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          {isSearching && (
            <svg 
              className="animate-spin h-5 w-5 text-primary" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
