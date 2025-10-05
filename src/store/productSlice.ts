import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductState, Product, SearchState } from "../types";
import { fetchProducts } from "../services/api";

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 0,
    totalPages: 0,
  },
  search: {
    query: "",
    category: "",
    minPrice: null,
    maxPrice: null,
  },
  filters: {
    categories: [],
    priceRange: {
      min: 0,
      max: 1000,
    },
  },
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1;
      state.pagination.totalPages = Math.ceil(
        (state.filteredProducts.length || state.products.length) /
          action.payload
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
      state.pagination.currentPage = 1;
      state.filteredProducts = filterProducts(state.products, state.search);
      state.pagination.totalItems = state.filteredProducts.length;
      state.pagination.totalPages = Math.ceil(
        state.filteredProducts.length / state.pagination.itemsPerPage
      );
    },
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.search.category = action.payload;
      state.pagination.currentPage = 1;
      state.filteredProducts = filterProducts(state.products, state.search);
      state.pagination.totalItems = state.filteredProducts.length;
      state.pagination.totalPages = Math.ceil(
        state.filteredProducts.length / state.pagination.itemsPerPage
      );
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>
    ) => {
      state.search.minPrice = action.payload.min;
      state.search.maxPrice = action.payload.max;
      state.pagination.currentPage = 1;
      state.filteredProducts = filterProducts(state.products, state.search);
      state.pagination.totalItems = state.filteredProducts.length;
      state.pagination.totalPages = Math.ceil(
        state.filteredProducts.length / state.pagination.itemsPerPage
      );
    },
    clearFilters: (state) => {
      state.search = {
        query: "",
        category: "",
        minPrice: null,
        maxPrice: null,
      };
      state.filteredProducts = state.products;
      state.pagination.currentPage = 1;
      state.pagination.totalItems = state.products.length;
      state.pagination.totalPages = Math.ceil(
        state.products.length / state.pagination.itemsPerPage
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsAsync.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
          state.filteredProducts = action.payload;

          const categories = Array.from(
            new Set(action.payload.map((p) => p.category))
          );
          const prices = action.payload.map((p) => p.price);

          state.filters = {
            categories,
            priceRange: {
              min: Math.min(...prices),
              max: Math.max(...prices),
            },
          };

          state.pagination.totalItems = action.payload.length;
          state.pagination.totalPages = Math.ceil(
            action.payload.length / state.pagination.itemsPerPage
          );
        }
      )
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

const filterProducts = (
  products: Product[],
  search: SearchState
): Product[] => {
  return products.filter((product) => {
    const matchesQuery =
      !search.query ||
      product.title.toLowerCase().includes(search.query.toLowerCase()) ||
      product.description.toLowerCase().includes(search.query.toLowerCase()) ||
      product.category.toLowerCase().includes(search.query.toLowerCase());

    const matchesCategory =
      !search.category || product.category === search.category;

    const matchesMinPrice =
      search.minPrice === null || product.price >= search.minPrice;
    const matchesMaxPrice =
      search.maxPrice === null || product.price <= search.maxPrice;

    return (
      matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice
    );
  });
};

export const {
  setCurrentPage,
  setItemsPerPage,
  setSearchQuery,
  setSearchCategory,
  setPriceRange,
  clearFilters,
} = productSlice.actions;
export default productSlice.reducer;
