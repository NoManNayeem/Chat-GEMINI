// CustomDrawerContent.js
import React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    // Implement your logout logic here
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Chat-Gemini</Text>
      </View>
      {/* Other Drawer Items */}
      <DrawerItemList {...props} />
      {/* Position Logout at the bottom */}
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Logout"
          icon={() => <MaterialCommunityIcons name="logout" size={24} color="black" />}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // Add any additional styling if needed
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    // Add any additional styling if needed
  },
  bottomDrawerSection: {
    marginTop: 'auto', // This pushes the logout button to the bottom
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default CustomDrawerContent;
