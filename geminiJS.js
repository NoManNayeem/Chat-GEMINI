const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');

async function fetchAndResizeImage(imageUrl, displaySize = { width: 400, height: 400 }) {
    // Fetch the image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const img = await sharp(response.data).resize(displaySize.width, displaySize.height).toBuffer();

    // Resize for API request
    const resizedImg = await sharp(img).resize(512).toBuffer();
    return resizedImg;
}

function encodeImageToBase64(imageBuffer) {
    return imageBuffer.toString('base64');
}

async function makeApiRequest(encodedImage, apiKey, text = "What is this picture?") {
    const requestUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`;
    const headers = { 'Content-Type': 'application/json' };

    const requestData = {
        contents: [
            {
                parts: [
                    { text: text },
                    {
                        inline_data: {
                            mime_type: "image/jpeg",
                            data: encodedImage
                        }
                    }
                ]
            }
        ]
    };

    const response = await axios.post(requestUrl, requestData, { headers: headers });
    return response.data;
}

async function main() {
    const imageUrl = "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ_Kevbk21QBRy-PgB4kQpS79brbmmEG7m3VOTShAn4PecDU5H5UxrJxE3Dw1JiaG17V88QIol19-3TM2wCHw";
    const apiKey = "*****";

    try {
        const resizedImg = await fetchAndResizeImage(imageUrl);
        const encodedImage = encodeImageToBase64(resizedImg);
        const responseJson = await makeApiRequest(encodedImage, apiKey);

        // Extract and print the generated text
        const generatedText = responseJson.candidates[0].content.parts[0].text;
        console.log(`Generated Text: ${generatedText}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
