import { useQuery } from '@tanstack/react-query';
import api from '../api.config';
import { ApiResponse, CourseListResponse, Category } from '../../types/api.types';

export interface CourseFilters {
  page?: number;
  limit?: number;
  search?: string;
  subCategoryId?: string;
  categoryId?: string;
  status?: string;
  level?: string;
  isFeatured?: boolean;
}

export const useCourses = (filters: CourseFilters = {}) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<CourseListResponse>>('/courses', {
        params: filters,
      });
      return data.data;
    },
  });
};

