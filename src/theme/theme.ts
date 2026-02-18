import { useColorScheme } from 'react-native';

export const Colors = {
  light: {
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#333333',
    textSecondary: '#666666',
    primary: '#0056d2',
    accent: '#f0f7ff',
    border: '#eeeeee',
    inputBackground: '#f5f5f5',
    placeholder: '#999999',
    white: '#ffffff',
    black: '#000000',
  },
  dark: {
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#aaaaaa',
    primary: '#4dabff',
    accent: '#1a2633',
    border: '#333333',
    inputBackground: '#2c2c2c',
    placeholder: '#777777',
    white: '#ffffff',
    black: '#000000',
  },
};

export const useTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode ? Colors.dark : Colors.light;
};
