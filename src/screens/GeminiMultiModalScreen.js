import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { chatWithGemini } from '../api/chatService';
import { chatWithGeminiMultiModal } from '../api/GeminiMultiModalService';
import * as FileSystem from 'expo-file-system';
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

const GeminiMultiModal = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi, how can I help you today?", isUser: false, timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollViewRef = useRef();

  const handleCaptureImage = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access the camera was denied.');
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
  
      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      Alert.alert('Error', 'An error occurred while capturing the image.');
    }
  };

  const handleSelectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access the gallery was denied.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'An error occurred while selecting the image.');
    }
  };

  const handleSend = async () => {
    if (!message.trim() && !selectedImage) {
      Alert.alert('Message Empty', 'Please enter a message or select an image.');
      return;
    }

    setIsLoading(true);
    const userMessage = { text: message, isUser: true, timestamp: new Date(), imageUri: selectedImage };

    try {
      let geminiResponse = '';

      if (selectedImage) {
        const defaultMessage = 'Explain the image';
        const userMessage = message.trim() ? message : defaultMessage;

        const base64Data = await FileSystem.readAsStringAsync(selectedImage, {
          encoding: FileSystem.EncodingType.Base64,
        });

        geminiResponse = await chatWithGeminiMultiModal(userMessage, base64Data);
      } else {
        geminiResponse = await chatWithGemini(message);
      }

      const botMessage = { text: geminiResponse, isUser: false, timestamp: new Date(), imageUri: null };

      setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while sending the message. Please try again.');
    } finally {
      setIsLoading(false);
      setMessage('');
      setSelectedImage(null);
    }
  };

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        MaterialCommunityIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Or a loading spinner if you wish
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messagesList}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.isUser ? styles.userMessage : styles.geminiMessage]}>
            {msg.isUser ? (
              <MaterialCommunityIcons name="face-agent" size={24} color="#1e88e5" />
            ) : (
              <MaterialCommunityIcons name="robot" size={24} color="#1a73e8" />
            )}
            {msg.imageUri && <Image source={{ uri: msg.imageUri }} style={styles.messageImage} />}
            <Text style={[styles.messageText, msg.isUser ? styles.userMessageText : styles.geminiMessageText]}>
              {msg.text}
              <Text style={styles.timestamp}>
                {msg.timestamp ? msg.timestamp.toLocaleTimeString() : 'No timestamp'}
              </Text>
            </Text>
          </View>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => {setMessage(text);}}
          placeholder="Type a message"
          placeholderTextColor="#121111"
          multiline
          numberOfLines={4}
        />
        <View style={styles.buttonArea}>
          <TouchableOpacity onPress={handleSelectImage} style={styles.button}>
            <MaterialCommunityIcons name="camera-image" size={24} color="#e342f5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCaptureImage} style={styles.button}>
            <MaterialCommunityIcons name="camera-front-variant" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSend} style={styles.button} disabled={isLoading}>
            <MaterialCommunityIcons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // A light background color for the whole screen
    padding: 10,
  },
  messagesList: {
    flex: 1,
  },
  message: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center', // Align items in a row
  },
  inputArea: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
    flexDirection: 'row', // Align input and buttons in a row
    alignItems: 'center', // Vertically center items
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '30%', // Adjust width as needed
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50, // Circular buttons
    backgroundColor: '#1e88e5',
    width: 40, // Fixed size for buttons
    height: 40, // Fixed size for buttons
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6', // Different background for user messages
  },
  geminiMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 15,
    color: '#333333', // Dark text for readability
  },
  userMessageText: {
    color: '#004d40', // Slightly different color for user text
  },
  geminiMessageText: {
    color: '#1a73e8', // Different color for Gemini responses
  },
  messageImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 15, // Rounded corners for images
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    alignSelf: 'center',
    margin: 10,
  },
  inputArea: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
  },
  input: {
    borderRadius: 25,
    padding: 5, // Be mindful of the interaction between padding and height
    backgroundColor: '#fff',
    flexGrow: 1, // Allows the input to expand as needed
    fontSize: 15, // Visible font size
    color: 'black', // Visible text color
    marginBottom: 10,
},
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#1e88e5',
    width: '30%',
  },
  buttonText: {
    color: '#fff', // White text for contrast on buttons
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default GeminiMultiModal;