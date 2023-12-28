// ChatService.js
import axios from 'axios';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = '****';


async function chatWithGemini(userMessage) {
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Extract the response data
      const responseData = response.data;
  
      // Extract the 'text' from the 'parts' in the response content
      const responseText = responseData.candidates[0]?.content?.parts[0]?.text || '';
  
      return responseText;
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
  
  export { chatWithGemini };