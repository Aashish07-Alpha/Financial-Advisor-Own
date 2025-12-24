# Credentials Setup Guide

## ⚠️ IMPORTANT: Never commit credentials to Git!

This guide explains how to set up your credentials securely.

## Required Credentials

### 1. Environment Variables (.env file)

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database
MONGO_URL=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_random_secret_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

### 2. Google Cloud Service Account (google-credentials.json)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a service account
3. Download the JSON credentials file
4. Rename it to `google-credentials.json`
5. Place it in the `server` directory

**Important:** This file is automatically ignored by `.gitignore`

## Getting Your Credentials

### MongoDB
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string

### Google OAuth
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create OAuth 2.0 credentials
- Copy Client ID and Client Secret

### Gemini API
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create an API key

## Security Best Practices

✅ **DO:**
- Keep `.env` file in `.gitignore`
- Keep `google-credentials.json` in `.gitignore`
- Use environment variables for all sensitive data
- Rotate credentials regularly

❌ **DON'T:**
- Commit `.env` files to Git
- Share credentials in chat/email
- Hardcode credentials in source code
- Push credentials to GitHub

## Deployment

For production deployment:
1. Set environment variables in your hosting platform
2. Upload `google-credentials.json` securely through your hosting dashboard
3. Never commit production credentials to Git
