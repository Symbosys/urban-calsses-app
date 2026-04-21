import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api.config';
import { ApiResponse, UserGoalsResponse, SubCategory } from '../../types/api.types';

/**
 * Hook to fetch all available subcategories (goals)
 */
export const useGetAllSubCategories = () => {
  return useQuery({
    queryKey: ['subcategories'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ subCategories: SubCategory[] }>>('/sub-categories');
      return data.data.subCategories;
    },
  });
};

/**
 * Hook to fetch goals for a specific user
 */
export const useGetUserGoals = (userId: string) => {
  return useQuery({
    queryKey: ['user-goals', userId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<UserGoalsResponse>>(`/user/goals/${userId}`);
      return data.data.goals;
    },
    enabled: !!userId,
  });
};

/**
 * Hook to set/update goals for a user
 */
export const useSetUserGoals = () => {
  return useMutation({
    mutationFn: async (payload: { userId: string; subCategoryIds: string[] }) => {
      const { data } = await api.post<ApiResponse<UserGoalsResponse>>('/user/goals', payload);
      return data;
    },
  });
};
