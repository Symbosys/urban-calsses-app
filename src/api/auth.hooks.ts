import { useMutation } from '@tanstack/react-query';
import api from './api.config';
import { ApiResponse, AuthResponse, OtpResponse } from '../types/api.types';

export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post<ApiResponse<OtpResponse>>('/user/auth/send-otp', { email });
      return data;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const { data } = await api.post<ApiResponse<AuthResponse>>('/user/auth/verify-otp', payload);
      return data;
    },
  });
};
