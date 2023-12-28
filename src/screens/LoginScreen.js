import React, { useState } from 'react';
import { View, Text, Linking, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'Nayeem' && password === 'password') {
    //   Alert.alert("Login Successful", "You have logged in successfully!",
    //     [
    //       { text: "OK", onPress: () => navigation.navigate('Chat') }
    //     ]
    //   );
    navigation.navigate('Chat');
    } else {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat-Gemini</Text>
      <Text style={styles.subtitle}>
        Developed by <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/nomannayeem')}>Nayeem Islam</Text>
      </Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      {isLogin ? (
        <Button mode="contained" onPress={handleLogin}>Login</Button>
      ) : (
        <Button mode="contained" onPress={handleRegister}>Register</Button>
      )}
      {isLogin ? (
        <Button onPress={() => setIsLogin(false)}>Do not have an account? Register!</Button>
      ) : (
        <Button onPress={() => setIsLogin(true)}>Have an account? Login!</Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default LoginScreen;
