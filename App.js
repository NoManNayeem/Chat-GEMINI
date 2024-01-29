
import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from './src/screens/LoginScreen';
import DrawerNavigator from './src/navigation/DrawerNavigator';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible

const App = () => {
  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync(); // Hide the splash screen
      }
    }

    loadResourcesAndData();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Chat" 
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          {/* Add more screens if necessary */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
