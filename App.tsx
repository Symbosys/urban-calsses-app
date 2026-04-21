import React from 'react';
import { StatusBar, useColorScheme, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import StackNavigation from './src/navigation/stack/stack.navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const MyTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: isDarkMode ? '#121212' : '#ffffff',
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={MyTheme}>
          <StackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
