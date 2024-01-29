import React, { useState, useEffect } from 'react';
import { View, Text, Linking, StyleSheet, Alert, Image, Animated } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [logoAnimation] = useState(new Animated.Value(1));
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('Nayeem');
  const [password, setPassword] = useState('password1');
  const users = [
    { username: 'Nayeem', password: 'password1' },
    { username: 'Mudara', password: 'Mudara' },
    { username: 'Masud', password: 'Masud' },
    { username: 'Sadid', password: 'Sadid' },
    { username: 'Bappy', password: 'Bappy' },
    // Add more users as needed
  ];


  const handleLogin = () => {
  // Check if the username and password match any user in the list
  const isValidUser = users.some(user => user.username === username && user.password === password);

  if (isValidUser) {
    // Login successful
    navigation.navigate('Chat');
  } else {
    // Login failed
    Alert.alert("Login Failed", "Invalid username or password.");
  }
};
  

  const handleRegister = () => {
    if (username === 'Nayeem' && password === 'password') {
      Alert.alert("Registration Successful", "You have registered successfully!");
      // Here, navigate to ChatScreen or handle the registration success scenario
      // For example: navigation.navigate('Chat');
    } else {
      Alert.alert("Registration Failed", "Username or password not acceptable.");
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/appIcon.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: logoAnimation }],
          },
        ]}
      />

      <Text style={styles.title}>Chat-Gemini</Text>
      <Text style={styles.subtitle}>
        Developed by <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/nomannayeem')}>Nayeem Islam</Text>
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <Button
        mode="contained"
        onPress={isLogin ? handleLogin : handleRegister}
        style={styles.button}
      >
        {isLogin ? 'Login' : 'Register'}
      </Button>

      <Button
        onPress={() => setIsLogin(!isLogin)}
        style={styles.switchButton}
      >
        {isLogin ? 'Do not have an account? Register!' : 'Have an account? Login!'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background color for a modern look
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333', // Dark color for the title
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666', // Softer color for the subtitle
  },
  link: {
    fontWeight: 'bold',
    color: '#0052cc', // Theme color for links
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff', // White background for input fields
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0052cc', // Theme color for buttons
    marginBottom: 10,
  },
  switchButton: {
    marginTop: 10,
  },
});

export default LoginScreen;