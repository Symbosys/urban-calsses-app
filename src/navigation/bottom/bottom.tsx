import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StudyScreen from '../../screen/bottom/StudyScreen';
import OfflineScreen from '../../screen/bottom/OfflineScreen';
import BatchesScreen from '../../screen/bottom/BatchesScreen';
import StoreScreen from '../../screen/bottom/StoreScreen';
import TestScreen from '../../screen/bottom/TestScreen';
import ProfileScreen from '../../screen/bottom/ProfileScreen';
import { useTheme } from '../../theme/theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      id="bottom-tabs"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Study') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Offline') {
            iconName = focused ? 'cloud-off' : 'cloud-off-outline';
          } else if (route.name === 'Batches') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Store') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Test') {
            iconName = focused ? 'clipboard-text' : 'clipboard-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
        headerTintColor: theme.text,
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen name="Study" component={StudyScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Offline" component={OfflineScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Batches" component={BatchesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Store" component={StoreScreen} options={{ title: 'PW Store', headerShown: false }} />
      <Tab.Screen name="Test" component={TestScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;