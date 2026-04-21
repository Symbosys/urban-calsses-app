import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Todo } from '../types/api.types';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
      return data;
    },
  });
};
