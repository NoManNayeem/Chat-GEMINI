// ChatScreen.js
import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { chatWithGemini } from '../api/chatService';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (!message.trim()) return;

    // Set loading state while waiting for the response
    setIsLoading(true);

    try {
      const geminiResponse = await chatWithGemini(message);

      // Add the user's message to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser: true },
      ]);

      // Add the Gemini's response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: geminiResponse, isUser: false },
      ]);

      // Scroll to the bottom of the chat
      scrollViewRef.current.scrollToEnd();
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately
    } finally {
      // Clear loading state after the response is received
      setIsLoading(false);
    }

    setMessage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messagesList}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={[
              styles.message,
              msg.isUser ? styles.userMessage : styles.geminiMessage,
            ]}>
            {msg.text}
          </Text>
        ))}
        {isLoading && <Text>Loading...</Text>}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        multiline
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  messagesList: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  userMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-end',
  },
  geminiMessage: {
    backgroundColor: '#007bff',
    color: '#fff',
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    maxHeight: 150,
  },
});

export default ChatScreen;
