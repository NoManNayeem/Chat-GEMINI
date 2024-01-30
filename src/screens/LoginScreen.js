import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Animated, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [logoAnimation] = useState(new Animated.Value(1));
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('Nayeem');
  const [password, setPassword] = useState('password');
  const [checked, setChecked] = useState(true);
  const [termsModalVisible, setTermsModalVisible] = useState(false);

  const users = [
    { username: 'Nayeem', password: 'password' },
    // Add more users as needed
  ];

  const handleLogin = () => {
    const isValidUser = users.some(user => user.username === username && user.password === password);
    if (isValidUser) {
      navigation.navigate('Chat');
    } else {
      Alert.alert("Login Failed", "Invalid username or password.");
    }
  };

  const handleRegister = () => {
    // Registration logic here
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

  const toggleCheckbox = () => setChecked(!checked);
  const showTermsModal = () => setTermsModalVisible(true);
  const hideTermsModal = () => setTermsModalVisible(false);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/appIcon.png')}
        style={[styles.logo, { transform: [{ scale: logoAnimation }] }]}
      />

      <Text style={styles.title}>Chat-Gemini</Text>

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

      <Button mode="contained" onPress={isLogin ? handleLogin : handleRegister} style={styles.button}>
        {isLogin ? 'Login' : 'Register'}
      </Button>

      <Button onPress={() => setIsLogin(!isLogin)} style={styles.switchButton}>
        {isLogin ? 'Do not have an account? Register!' : 'Have an account? Login!'}
      </Button>

      <TouchableOpacity style={styles.termsContainer} onPress={showTermsModal}>
        <MaterialCommunityIcons name="checkbox-marked" size={24} color="#0052cc" />
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.link}>Terms and Conditions</Text>
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={termsModalVisible} onRequestClose={hideTermsModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={styles.scrollViewStyle}>
              <Text style={styles.headerText}>Terms and Conditions</Text>
              <View style={styles.termItem}>
                <MaterialCommunityIcons name="check-circle-outline" size={24} color="#0052cc" />
                <Text style={styles.modalText}>Use Chat-Gemini responsibly and respectfully.</Text>
              </View>
              <View style={styles.termItem}>
                <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#0052cc" />
                <Text style={styles.modalText}>Do not engage in any unlawful activities or violate others' rights.</Text>
              </View>
              <View style={styles.termItem}>
                <MaterialCommunityIcons name="information-outline" size={24} color="#0052cc" />
                <Text style={styles.modalText}>Understand that interactions with the AI are for informational purposes only.</Text>
              </View>
              <View style={styles.termItem}>
                <MaterialCommunityIcons name="shield-account-outline" size={24} color="#0052cc" />
                <Text style={styles.modalText}>Your personal data will be handled as per our Privacy Policy.</Text>
              </View>
              <View style={styles.termItem}>
                <MaterialCommunityIcons name="update" size={24} color="#0052cc" />
                <Text style={styles.modalText}>We reserve the right to modify these terms as necessary.</Text>
              </View>
              <Text style={styles.continuedText}>Continued use of the app implies acceptance of these terms.</Text>
            </ScrollView>

            <Button 
              mode="contained" 
              onPress={hideTermsModal}
              icon={({ size, color }) => (
                <MaterialCommunityIcons name="close" size={size} color={color} />
              )}
              style={styles.closeButton}
            >
             Agree & Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
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
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0052cc',
    marginBottom: 10,
  },
  switchButton: {
    marginTop: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  termsText: {
    marginLeft: 8,
    color: '#666',
  },
  link: {
    fontWeight: 'bold',
    color: '#0052cc',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewStyle: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0052cc',
    marginBottom: 20,
    textAlign: 'center',
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginLeft: 10,
    flex: 1,
  },
  continuedText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginTop: 20,
    textAlign: 'justify',
  },
  closeButton: {
    backgroundColor: '#0052cc',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
    marginBottom: 5,
  },
});

export default LoginScreen;
