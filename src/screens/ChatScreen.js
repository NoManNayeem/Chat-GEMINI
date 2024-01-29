import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { chatWithGemini } from '../api/chatService';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollViewRef = useRef();

  useEffect(() => {
    // Initial bot message
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
          <View key={index} style={[styles.message, msg.isUser ? styles.userMessage : styles.geminiMessage]}>
            <Text style={[styles.messageText, msg.isUser ? styles.userMessageText : styles.geminiMessageText]}>
              {msg.text}
            </Text>
            <Text style={styles.timestamp}>
              {msg.timestamp.toLocaleTimeString()}
            </Text>
          </View>
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
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timestamp: {
    fontSize: 12,
    color: '#666',
    paddingTop: 5,
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    alignSelf: 'center',
    margin: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  messagesList: {
    flex: 1,
  },
  message: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 4,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  geminiMessage: {
    backgroundColor: '#ECE5DD',
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
});

export default ChatScreen;
