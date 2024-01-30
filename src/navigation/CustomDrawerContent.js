import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value for fade-in effect

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000, // Duration of animation in milliseconds
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  const handleLogout = () => {
    // Implement your logout logic here
    props.navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Animated.View style={[styles.drawerHeader, { opacity: fadeAnim }]}>
          <Text style={styles.drawerHeaderText}>Chat-Gemini</Text>
        </Animated.View>
        {/* Other Drawer Items */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {/* Position Logout at the bottom */}
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Logout"
          icon={() => <MaterialCommunityIcons name="logout" size={24} color="black" />}
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  bottomDrawerSection: {
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
});

export default CustomDrawerContent;
