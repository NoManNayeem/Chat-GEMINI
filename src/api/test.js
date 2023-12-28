// const axios = require('axios');

// const apiKey = 'AIzaSyAs9KuSSQ2XaBWjW8U-gcIMjwUKeyyGkX0';
// const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent';

// async function DoChat(userMessage) {
//   try {
//     const response = await axios.post(apiUrl, {
//       contents: [
//         {
//           parts: [
//             {
//               text: userMessage,
//             },
//           ],
//         },
//       ],
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       params: {
//         key: apiKey,
//       },
//       responseType: 'stream',  // Enables streaming response
//     });

//     const { data } = response;
//     const result = [];

//     data.on('data', (chunk) => {
//       result.push(chunk);
//     });

//     return new Promise((resolve, reject) => {
//       data.on('end', () => {
//         const generatedText = Buffer.concat(result).toString();
//         resolve(generatedText);
//       });

//       data.on('error', (error) => {
//         reject(error);
//       });
//     });
//   } catch (error) {
//     console.error('Error:', error.message || error.response.data);
//     throw error;
//   }
// }

// // Example usage
// const userMessage = 'Write a story about a magic backpack.';
// DoChat(userMessage)
//   .then((result) => {
//     console.log('Response:', result);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


const axios = require('axios');

const apiKey = 'AIzaSyAs9KuSSQ2XaBWjW8U-gcIMjwUKeyyGkX0';
const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const headers = {
  'Content-Type': 'application/json',
};

async function DoChat(userMessage) {
  const data = {
    contents: [
      {
        parts: [
          {
            text: userMessage,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(`${apiUrl}?key=${apiKey}`, data, { headers });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error! Status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

// Example usage
const userMessage = 'Write a story about a magic backpack.';
DoChat(userMessage)
  .then((result) => {
    console.log('Success! Response:');
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
