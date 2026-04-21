import { useQuery } from '@tanstack/react-query';
import api from '../api.config';
import { ApiResponse, Category, SubCategory } from '../../types/api.types';

export interface CategoryListResponse {
  categories: Category[];
}

export interface SingleCategoryResponse {
  category: Category & {
    subCategories: SubCategory[];
  };
}

/**
 * Hook to fetch all categories from the backend
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<CategoryListResponse>>('/categories');
      return data.data;
    },
  });
};

/**
 * Hook to fetch a single category by ID, including its sub-categories
 */
export const useCategory = (id: string | null) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<SingleCategoryResponse>>(`/categories/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

/**
 * Hook to fetch all sub-categories
 */
export const useSubCategories = () => {
  return useQuery({
    queryKey: ['sub-categories'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ subCategories: SubCategory[] }>>('/sub-categories');
      return data.data;
    },
  });
};

/**
 * Hook to fetch promotional banners
 */
export const useBanners = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ banners: any[] }>>('/admin/banners');
      return data.data.banners;
    },
  });
};
