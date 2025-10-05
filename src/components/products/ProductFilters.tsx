import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import {
  setSearchCategory,
  setPriceRange,
  clearFilters,
} from "../../store/productSlice";

export default function ProductFilters() {
  const dispatch = useDispatch();
  const { search, filters } = useSelector((state: RootState) => state.products);
  const { categories, priceRange } = filters;

  const hasActiveFilters =
    search.category || search.minPrice !== null || search.maxPrice !== null;

  const handleCategoryChange = (category: string) => {
    dispatch(setSearchCategory(category === "all" ? "" : category));
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = e.target.value ? Number(e.target.value) : null;
    dispatch(
      setPriceRange({
        min: minPrice,
        max: search.maxPrice,
      })
    );
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = e.target.value ? Number(e.target.value) : null;
    dispatch(
      setPriceRange({
        min: search.minPrice,
        max: maxPrice,
      })
    );
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="all"
              checked={!search.category}
              onChange={() => handleCategoryChange("all")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={search.category === category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600 capitalize">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="minPrice"
              className="block text-xs text-gray-500 mb-1"
            >
              Min Price (₹)
            </label>
            <input
              type="number"
              id="minPrice"
              value={search.minPrice || ""}
              onChange={handleMinPriceChange}
              placeholder={priceRange.min.toString()}
              min={priceRange.min}
              max={priceRange.max}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-xs text-gray-500 mb-1"
            >
              Max Price (₹)
            </label>
            <input
              type="number"
              id="maxPrice"
              value={search.maxPrice || ""}
              onChange={handleMaxPriceChange}
              placeholder={priceRange.max.toString()}
              min={priceRange.min}
              max={priceRange.max}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
