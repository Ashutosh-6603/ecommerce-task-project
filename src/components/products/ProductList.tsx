import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import {
  clearFilters,
  fetchProductsAsync,
  setCurrentPage,
  setItemsPerPage,
} from "../../store/productSlice";
import ProductCard from "./ProductCard";
import Pagination from "../common/Pagination";
import SearchBar from "./SearchBar";
import ProductFilters from "./ProductFilters";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, filteredProducts, loading, error, pagination, search } =
    useSelector((state: RootState) => state.products);
  const [showFilters, setShowFilters] = useState(false);

  const currentProducts = useMemo(() => {
    const productsToUse =
      filteredProducts.length > 0 ? filteredProducts : products;
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return productsToUse.slice(startIndex, endIndex);
  }, [
    filteredProducts,
    products,
    pagination.currentPage,
    pagination.itemsPerPage,
  ]);

  useEffect(() => {
    dispatch(fetchProductsAsync() as any);
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    dispatch(setItemsPerPage(itemsPerPage));
  };

  const resultsCount =
    filteredProducts.length > 0 ? filteredProducts.length : products.length;
  const hasSearchResults =
    search.query ||
    search.category ||
    search.minPrice !== null ||
    search.maxPrice !== null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading products: {error}</p>
        <button
          onClick={() => dispatch(fetchProductsAsync() as any)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {hasSearchResults ? (
                  <>
                    Found <span className="font-semibold">{resultsCount}</span>{" "}
                    products
                    {(search.query || search.category) && (
                      <span className="ml-2">
                        for "
                        {search.query && (
                          <span className="font-semibold">{search.query}</span>
                        )}
                        {search.query && search.category && " in "}
                        {search.category && (
                          <span className="font-semibold capitalize">
                            {search.category}
                          </span>
                        )}
                        "
                      </span>
                    )}
                  </>
                ) : (
                  <span>
                    Total <span className="font-semibold">{resultsCount}</span>{" "}
                    products
                  </span>
                )}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                  />
                </svg>
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <ProductFilters />
            </div>
          </div>

          <div className="lg:col-span-3">
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
                <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Filters
                      </h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          className="h-6 w-6"
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
                    </div>
                    <ProductFilters />
                  </div>
                </div>
              </div>
            )}

            {currentProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  {hasSearchResults
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "No products available at the moment."}
                </p>
                {hasSearchResults && (
                  <button
                    onClick={() => dispatch(clearFilters())}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
