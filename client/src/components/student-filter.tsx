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
    <div className="mb-4">
      <div className="flex mb-2">
        {filters.map((filter) => (
          <button 
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`mr-3 px-2 py-1 ${
              activeFilter === filter.id
                ? "bg-blue-100 text-blue-800 font-medium"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
