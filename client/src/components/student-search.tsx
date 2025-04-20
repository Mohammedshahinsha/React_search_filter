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
    <div className="mb-4">
      <input 
        type="text" 
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 mb-2"
        placeholder="Search by name" 
      />
    </div>
  );
}
