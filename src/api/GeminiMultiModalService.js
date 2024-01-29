// Service: GeminiMultiModalService.js
import axios from 'axios';
import secrets from './apis';


const API_KEY = secrets.API_KEY
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent';
const axiosConfig = {
    headers: { 'Content-Type': 'application/json' },
    timeout: 60000,
};

const chatWithGeminiMultiModal = async (message, encodedImage = null) => {
    try {
        const parts = [{ text: message }];
        if (encodedImage) {
            parts.push({
                inline_data: {
                    mime_type: 'image/jpeg',
                    data: encodedImage,
                }
            });
        }

        const requestPayload = { contents: [{ parts }] };
        console.log('API Request Payload:', requestPayload);

        const response = await axios.post(`${API_URL}?key=${API_KEY}`, requestPayload, axiosConfig);
        const responseData = response.data;

        let geminiResponse = '';
        if (responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content && responseData.candidates[0].content.parts) {
            const textPart = responseData.candidates[0].content.parts.find(part => part.text);
            if (textPart) {
                geminiResponse = textPart.text;
            }
        }

        return geminiResponse;
    } catch (error) {
        if (error.response) {
            console.error('API Error Response:', error.response.data);
        } else {
            console.error('Error in chatWithGeminiMultiModal:', error);
        }
        throw error;
    }
};

export { chatWithGeminiMultiModal };
