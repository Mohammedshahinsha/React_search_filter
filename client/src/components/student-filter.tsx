import { cn } from "@/lib/utils";

interface StudentFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  totalResults: number;
}

export default function StudentFilter({ 
  activeFilter, 
  onFilterChange,
  totalResults
}: StudentFilterProps) {
  const filters = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" }
  ];

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-neutral-700">Filter by:</span>
      
      {filters.map((filter) => (
        <button 
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
            activeFilter === filter.id
              ? "bg-primary text-white shadow-sm hover:bg-primary-dark"
              : "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50"
          )}
        >
          {filter.label}
        </button>
      ))}
      
      <div className="ml-auto text-sm text-neutral-500">
        <span>{totalResults}</span> students found
      </div>
    </div>
  );
}
