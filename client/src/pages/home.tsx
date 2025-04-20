import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import StudentSearch from "@/components/student-search";
import StudentFilter from "@/components/student-filter";
import StudentList from "@/components/student-list";
import { Student } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Fetch student data
  const { 
    data: students, 
    isLoading, 
    error,
    refetch 
  } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  // Filter students based on search query and active filter
  const filteredStudents = students?.filter((student) => {
    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.major.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply status filter
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "active" && student.status === "Active") ||
      (activeFilter === "inactive" && student.status === "Inactive");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-4">
          <h1 className="text-xl font-bold mb-1">Student List</h1>
        </header>

        {/* Search Bar */}
        <StudentSearch 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
          isSearching={isLoading} 
        />

        {/* Student Filter */}
        <StudentFilter 
          activeFilter={activeFilter} 
          onFilterChange={handleFilterChange} 
          totalResults={filteredStudents?.length || 0}
        />

        {/* Student List */}
        <StudentList 
          students={filteredStudents} 
          isLoading={isLoading} 
          error={error instanceof Error ? error : null}
          onRetry={refetch}
          onClearSearch={() => {
            setSearchQuery("");
            setActiveFilter("all");
          }}
        />
      </div>
    </div>
  );
}
