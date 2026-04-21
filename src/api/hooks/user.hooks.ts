import { useQuery } from '@tanstack/react-query';
import api from '../api.config';
import { ApiResponse } from '../../types/api.types';

export interface DashboardCourse {
  id: string;
  title: string;
  level: string;
  thumbnail?: {
    secure_url: string;
    public_id: string;
  };
  instructors?: any[];
  progress: number;
}

export interface DashboardMetrics {
  enrolledCoursesCount: number;
  learningHours: number;
  certificatesCount: number;
  courses: DashboardCourse[];
}

/**
 * Hook to fetch student dashboard metrics (enrolled courses, progress, etc.)
 */
export const useDashboard = () => {
  return useQuery({
    queryKey: ['user-dashboard'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<DashboardMetrics>>('/users/dashboard');
      return data.data;
    },
  });
};
