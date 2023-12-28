// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen'; // Add this if you have a profile screen
import CustomDrawerContent from './CustomDrawerContent'; // Ensure this import is correct

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Chat"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Chat-Gemini" component={ChatScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      {/* Additional Drawer Screens can be added here */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
