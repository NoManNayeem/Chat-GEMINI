import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawerContent from './CustomDrawerContent';
import AboutFAQsScreen from '../screens/AboutScreen';
import GeminiMultiModal from '../screens/GeminiMultiModalScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Chat"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#e91e63', // Active item color
        itemStyle: { marginVertical: 5 },
      }}
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (route.name === 'Chat-Gemini') {
            iconName = focused ? 'chat' : 'chat-outline';
            iconColor = '#4CAF50'; // Green
          } else if (route.name === 'Gemini-MultiModal') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
            iconColor = '#FF9800'; // Orange
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
            iconColor = '#9C27B0'; // Purple
          } else if (route.name === 'About') {
            iconName = focused ? 'information' : 'information-outline';
            iconColor = '#03A9F4'; // Blue
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <Drawer.Screen name="Chat-Gemini" component={ChatScreen} />
      <Drawer.Screen name="Gemini-MultiModal" component={GeminiMultiModal} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="About" component={AboutFAQsScreen} />
      {/* Additional Drawer Screens can be added here */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
