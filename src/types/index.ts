export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[]; // Add this
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  search: SearchState;
  filters: ProductFilters; // Add this
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedProducts {
  products: Product[];
  pagination: PaginationState;
}

export interface SearchState {
  query: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
}

export interface ProductFilters {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
}
