import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AdmitCardScreen from '../screens/AdmitCardScreen';
import DriveDetailScreen from '../screens/DriveDetailScreen';
import DriveListScreen from '../screens/DriveListScreen';
import LoginScreen from '../screens/LoginScreen';
import MyApplicationsScreen from '../screens/MyApplicationsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Drives" component={DriveListScreen} options={{ headerBackVisible: false }} />
        <Stack.Screen name="DriveDetail" component={DriveDetailScreen} options={{ title: 'Drive Details' }} />
        <Stack.Screen name="MyApplications" component={MyApplicationsScreen} options={{ title: 'My Applications' }} />
        <Stack.Screen name="AdmitCard" component={AdmitCardScreen} options={{ title: 'Admit Card' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
