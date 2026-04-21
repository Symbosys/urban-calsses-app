import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '../bottom/bottom';
import LoginScreen from '../../screen/authetication/auth';
import GoalSelectionScreen from '../../screen/selection/GoalSelectionScreen';
import AddressScreen from '../../screen/location/AddressScreen';
import PersonalInformationScreen from '../../screen/profile/PersonalInformationScreen';
import EnrolledCoursesScreen from '../../screen/profile/EnrolledCoursesScreen';

import { useAuthStore } from '../../store/auth.store';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const selectedGoal = useAuthStore((state) => state.selectedGoal);

  return (
    <Stack.Navigator   
      id="root-stack"
      // screenOptions={{ headerShown: false }}
      // initialRouteName="Address"
    >
      {/* <Stack.Screen name="Address" component={AddressScreen} /> */}
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : !selectedGoal ? (
        <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};


export default StackNavigation;
 