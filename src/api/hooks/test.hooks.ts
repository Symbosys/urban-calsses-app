import { useQuery } from '@tanstack/react-query';
import api from '../api.config';
import { ApiResponse, Test, TestListResponse } from '../../types/api.types';

export interface TestFilters {
  type?: string;
  status?: string;
  subject?: string;
}

/**
 * Hook to fetch all tests with optional filters
 */
export const useTests = (filters: TestFilters = {}) => {
  return useQuery({
    queryKey: ['tests', filters],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<TestListResponse>>('/tests', {
        params: filters,
      });
      return data.data.tests;
    },
  });
};

/**
 * Hook to fetch a single test by ID
 */
export const useTest = (id: string | null) => {
  return useQuery({
    queryKey: ['test', id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ test: Test }>>(`/tests/${id}`);
      return data.data.test;
    },
    enabled: !!id,
  });
};
