const fs = require('fs');
const path = require('path');

console.log('🔧 Gemini API Setup for OCR System');
console.log('=====================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  const envContent = `# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Other configurations
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=your_mongodb_uri_here
PORT=8080
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created');
} else {
  console.log('✅ .env file already exists');
}

// Check if GEMINI_API_KEY is set
const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('GEMINI_API_KEY=') || envContent.includes('your_gemini_api_key_here')) {
  console.log('\n⚠️  GEMINI_API_KEY not configured in .env file');
  console.log('\n📋 To get your Gemini API key:');
  console.log('1. Go to https://makersuite.google.com/app/apikey');
  console.log('2. Sign in with your Google account');
  console.log('3. Click "Create API Key"');
  console.log('4. Copy the API key');
  console.log('5. Replace "your_gemini_api_key_here" in the .env file');
} else {
  console.log('✅ GEMINI_API_KEY is configured');
}

// Test Gemini configuration
console.log('\n🧪 Testing Gemini configuration...');
try {
  const gemini = require('./config/gemini');
  console.log('✅ Gemini module loaded successfully');
  
  // Test with a simple prompt
  const testPrompt = 'Hello, this is a test. Please respond with "Test successful"';
  console.log('📤 Sending test request to Gemini...');
  
  gemini(testPrompt)
    .then(response => {
      console.log('✅ Gemini API test successful!');
      console.log('📄 Response:', response.substring(0, 100) + '...');
    })
    .catch(error => {
      console.log('❌ Gemini API test failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check if your API key is correct');
      console.log('2. Make sure you have internet connection');
      console.log('3. Verify the API key has proper permissions');
    });
} catch (error) {
  console.log('❌ Failed to load Gemini module:', error.message);
}

console.log('\n📚 Setup Instructions:');
console.log('1. Get your Gemini API key from https://makersuite.google.com/app/apikey');
console.log('2. Add the key to your .env file');
console.log('3. Restart the server: npm start');
console.log('4. Test the OCR feature with a financial document');

console.log('\n🎯 Benefits of using Gemini:');
console.log('- Free tier with generous limits');
console.log('- No billing required');
console.log('- High-quality AI analysis');
console.log('- Fast response times');
console.log('- Reliable JSON output'); 