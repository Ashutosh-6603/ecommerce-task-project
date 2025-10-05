import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setSearchQuery } from "../../store/productSlice";
import { debounce } from "lodash";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state: RootState) => state.products);
  const [localQuery, setLocalQuery] = useState(search.query);

  // Debounced search to avoid too many dispatches
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalQuery(query);
    debouncedSearch(query);
  };

  const handleClearSearch = () => {
    setLocalQuery("");
    dispatch(setSearchQuery(""));
  };

  return (
    <div className="relative">
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          value={localQuery}
          onChange={handleSearchChange}
          placeholder="Search products by name, description, or category..."
          className="block w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {localQuery ? (
            <button
              onClick={handleClearSearch}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <svg
              className="h-4 w-4 text-gray-400"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
