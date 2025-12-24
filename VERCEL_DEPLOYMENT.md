# Vercel Deployment Guide

## 🚀 Quick Setup

### 1. Set Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables and add:

```env
# Required Environment Variables
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_here_at_least_32_characters
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key

# Frontend URL (your Vercel deployment URL)
FRONTEND_URL=https://your-app.vercel.app

# Google OAuth Callback (update after first deployment)
GOOGLE_CALLBACK_URL=https://your-app.vercel.app/api/auth/google/callback

# Optional
PORT=8080
NODE_ENV=production
```

### 2. Update Google OAuth Settings

After your first deployment, update your Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Add Authorized JavaScript origins:
   ```
   https://your-app.vercel.app
   ```
4. Add Authorized redirect URIs:
   ```
   https://your-app.vercel.app/api/auth/google/callback
   ```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a cluster (free tier available)
3. **IMPORTANT**: Add Vercel IPs to Network Access
   - Go to Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add specific Vercel IPs
4. Get your connection string from Database → Connect → Connect your application
5. Copy the connection string to Vercel environment variable `MONGO_URL`

## 📝 Common Issues & Solutions

### ❌ "MONGO_URL is NOT SET"
**Solution**: Add `MONGO_URL` in Vercel environment variables and redeploy

### ❌ "Error: ENOENT: no such file or directory, mkdir"
**Solution**: Already fixed! Code now uses `/tmp` directory for Vercel

### ❌ MongoDB connection timeout
**Solution**: 
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Verify connection string is correct
- Ensure your MongoDB cluster is running

### ❌ Google OAuth not working
**Solution**: 
- Update `GOOGLE_CALLBACK_URL` to match your Vercel URL
- Add your Vercel domain to Google OAuth authorized origins

## 🔄 Redeployment

After setting environment variables:
```bash
git add .
git commit -m "Update deployment configuration"
git push origin main
```

Vercel will automatically redeploy with the new environment variables.

## 🧪 Test Your Deployment

1. **Check Environment Variables**: Visit your Vercel logs to confirm all variables are loaded
2. **Test MongoDB Connection**: Check logs for "✅ MongoDB Connected Successfully!"
3. **Test Google OAuth**: Try logging in with Google
4. **Test File Upload**: Try OCR feature to verify `/tmp` directory works

## 📊 Monitoring

Check Vercel deployment logs:
- Go to your Vercel project → Deployments → Select latest → View Function Logs
- Look for:
  - ✅ MongoDB Connected Successfully!
  - ✅ Gemini API configured successfully
  - ✅ Created uploads directory: /tmp/uploads

## 🔒 Security Best Practices

1. ✅ Never commit `.env` files to Git
2. ✅ Use strong, random values for `JWT_SECRET`
3. ✅ Rotate credentials regularly
4. ✅ Use MongoDB Atlas IP whitelist (or 0.0.0.0/0 for serverless)
5. ✅ Enable 2FA on MongoDB Atlas and Google Cloud Console

## 🆘 Still Having Issues?

1. Check Vercel function logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test MongoDB connection string locally first
4. Ensure Google OAuth credentials match your Vercel domain
