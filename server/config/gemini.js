const axios = require("axios");
const API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

async function gemini(prompt) {
  try {
    console.log('Making request to Gemini API...');
    console.log('API Key present:', !!API_KEY);
    console.log('Prompt length:', prompt.length);
    
    if (!API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    }, {
      timeout: 60000, // 60 second timeout (increased from 30s)
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Gemini API response status:', response.status);
    console.log('Gemini API response data keys:', Object.keys(response.data || {}));

    if (!response.data) {
      throw new Error('Empty response from Gemini API');
    }

    if (!response.data.candidates || !response.data.candidates[0]) {
      console.error('Unexpected Gemini response structure:', JSON.stringify(response.data, null, 2));
      throw new Error('Invalid response structure from Gemini API');
    }

    const text = response.data.candidates[0].content.parts[0].text;
    
    if (!text) {
      throw new Error('Empty text response from Gemini API');
    }

    console.log('Gemini API response text length:', text.length);
    return text;
    
  } catch (err) {
    console.error("Gemini API error details:");
    console.error("Error message:", err.message);
    console.error("Error response:", err.response?.data);
    console.error("Error status:", err.response?.status);
    console.error("Error headers:", err.response?.headers);
    
    if (err.response?.status === 401) {
      throw new Error('Gemini API authentication failed - check API key');
    } else if (err.response?.status === 429) {
      throw new Error('Gemini API rate limit exceeded');
    } else if (err.response?.status >= 500) {
      throw new Error('Gemini API server error');
    } else if (err.code === 'ECONNABORTED') {
      throw new Error('Gemini API request timeout');
    } else if (err.code === 'ENOTFOUND') {
      throw new Error('Gemini API endpoint not found');
    } else {
      throw new Error(`Gemini API failed: ${err.message}`);
    }
  }
}

module.exports = gemini;
