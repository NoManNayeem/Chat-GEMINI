import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { chatWithGemini } from '../api/chatService'; // Adjust the import path as needed
import * as Clipboard from 'expo-clipboard';
import Markdown from 'react-native-markdown-renderer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollViewRef = useRef();

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Text copied to clipboard!');
  };


  useEffect(() => {
    setMessages([{ text: "Hi there! How can I help you today?", isUser: false, timestamp: new Date() }]);
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    const userMessage = { text: message, isUser: true, timestamp: new Date() };

    try {
      const geminiResponse = await chatWithGemini(message);
      const botMessage = { text: geminiResponse, isUser: false, timestamp: new Date() };

      setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messagesList}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <TouchableOpacity key={index} onLongPress={() => copyToClipboard(msg.text)} style={[styles.message, msg.isUser ? styles.userMessage : styles.geminiMessage]}>
            {!msg.isUser && <MaterialCommunityIcons name="robot-happy" size={24} color="#3f0857" />}
            {msg.isUser && <MaterialCommunityIcons name="human-greeting-variant" size={24} color="#007bff" />}
            <View style={styles.messageBubble}>
              {msg.isUser ? (
                <Text style={[styles.messageText, styles.userMessageText]}>{msg.text}</Text>
              ) : (
                <Markdown>{msg.text}</Markdown>
              )}
              <Text style={styles.timestamp}>{msg.timestamp.toLocaleTimeString()}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          multiline
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={isLoading}>
          <Text style={styles.sendButtonText}><MaterialCommunityIcons name="send-circle" size={24} color="white" /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messagesList: {
    flex: 1,
  },
  message: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  geminiMessage: {
    backgroundColor: '#ECE5DD',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#000',
  },
  geminiMessageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#d4c8c7',
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#007bff',
  },
  loadingContainer: {
    alignSelf: 'center',
    margin: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    paddingTop: 5,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    flexShrink: 1,
    marginLeft: 8,
  },
});

export default ChatScreen;
