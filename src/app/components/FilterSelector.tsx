import { Plus } from "lucide-react";
import { useState, forwardRef, useImperativeHandle } from "react";

interface FilterProps {
  options: string[];
  filterList: string[];
  setFilterList: (filters: string[]) => void;
}

const FilterSelector = ({
  filterList,
  setFilterList,
  options,
}: FilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleAddFilter = () => {
    if (selectedFilter && !filterList.includes(selectedFilter)) {
      setFilterList([...filterList, selectedFilter]);
    }
  };

  const handleRemoveFilter = (filter: string) => {
    setFilterList(filterList.filter((f: string) => f !== filter));
  };

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <div className="flex w-full overflow-hidden rounded-md border border-gray-300 focus-within:ring-1 focus-within:ring-black transition">
          <select
            id="template"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="flex-1 bg-transparent text-sm px-3 py-2 focus:outline-none appearance-none"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAddFilter}
            className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors rounded-r-md"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div className="mt-3 min-h-[40px] flex flex-wrap gap-2">
        {filterList.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full"
          >
            <span className="mr-2 capitalize">{filter.replace("-", " ")}</span>
            <button
              type="button"
              onClick={() => handleRemoveFilter(filter)}
              className="text-gray-500 hover:text-black"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterSelector;
