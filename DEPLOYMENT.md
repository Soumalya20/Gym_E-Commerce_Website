# Deployment Guide for Koushiks Supplements E-commerce

This guide provides step-by-step instructions for deploying the Koushiks Supplements e-commerce application to production.

## Prerequisites

- GitHub account with repository access
- MongoDB Atlas account (or other MongoDB hosting)
- Razorpay account with production keys
- Render/Heroku account (for backend)
- Netlify/Vercel account (for frontend)

## Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in

2. **Create a Cluster**
   - Click "Create" → "Cluster"
   - Choose a free tier (M0) for development
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and strong password
   - Set user privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For production, add `0.0.0.0/0` to allow all IPs (or specific IPs for security)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `koushiks-supplements`)

## Step 2: Razorpay Production Setup

1. **Create Razorpay Account**
   - Go to [Razorpay](https://razorpay.com/)
   - Sign up for a business account
   - Complete KYC verification

2. **Get Production Keys**
   - Go to Dashboard → Settings → API Keys
   - Generate new API keys (Key ID and Key Secret)
   - Save these securely

3. **Configure Webhooks (Optional)**
   - Go to Settings → Webhooks
   - Add webhook URL: `https://your-backend-url.com/api/payment/webhook`
   - Select events: `payment.captured`, `payment.failed`

## Step 3: Backend Deployment (Render)

### Option A: Render Deployment

1. **Create Render Account**
   - Go to [Render](https://render.com/)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Build Settings**
   - **Name**: `koushiks-supplements-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free tier (or paid for better performance)

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add the following variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_super_secret_jwt_key_min_32_chars
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     NODE_ENV=production
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your service URL (e.g., `https://koushiks-supplements-api.onrender.com`)

### Option B: Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create koushiks-supplements-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI=your_mongodb_atlas_connection_string
   heroku config:set JWT_SECRET=your_super_secret_jwt_key_min_32_chars
   heroku config:set RAZORPAY_KEY_ID=your_razorpay_key_id
   heroku config:set RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a koushiks-supplements-api
   git push heroku main
   ```

## Step 4: Frontend Deployment (Netlify)

### Option A: Netlify Deployment

1. **Create Netlify Account**
   - Go to [Netlify](https://www.netlify.com/)
   - Sign up with GitHub

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Node version**: `18` (or latest LTS)

4. **Add Environment Variables**
   - Go to "Site settings" → "Environment variables"
   - Add:
     ```
     VITE_API_BASE_URL=https://your-backend-url.com/api
     ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Your site will be available at `https://your-site-name.netlify.app`

### Option B: Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```
   - Follow the prompts
   - Set root directory: `frontend`
   - Add environment variable: `VITE_API_BASE_URL=https://your-backend-url.com/api`

## Step 5: Update CORS Settings

If your frontend and backend are on different domains, update CORS in `backend/server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://your-frontend-url.netlify.app', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

## Step 6: Create Admin User

After deployment, create an admin user:

1. **Using MongoDB Atlas:**
   - Go to MongoDB Atlas → Browse Collections
   - Find the `users` collection
   - Find your user document
   - Edit `role` field to `"admin"`

2. **Using the Script:**
   ```bash
   cd backend
   node scripts/createAdmin.js admin@koushikssupplements.com AdminPassword123
   ```

## Step 7: Post-Deployment Checklist

- [ ] Backend is accessible at the deployed URL
- [ ] Frontend is accessible at the deployed URL
- [ ] Health check endpoint works: `https://your-backend-url.com/api/health`
- [ ] User registration works
- [ ] User login works
- [ ] Products can be fetched
- [ ] Cart functionality works
- [ ] Payment integration works (test with Razorpay test mode first)
- [ ] Admin dashboard is accessible
- [ ] All environment variables are set correctly
- [ ] MongoDB connection is working
- [ ] CORS is configured correctly

## Step 8: Domain Setup (Optional)

### Custom Domain for Frontend (Netlify)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Update SSL certificate (automatic with Netlify)

### Custom Domain for Backend (Render)

1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records as instructed

## Step 9: Monitoring and Maintenance

1. **Set up Error Monitoring**
   - Consider using Sentry or similar service
   - Add error tracking to both frontend and backend

2. **Set up Analytics**
   - Add Google Analytics to frontend
   - Monitor user behavior and conversions

3. **Regular Backups**
   - MongoDB Atlas provides automatic backups
   - Configure backup schedule in Atlas dashboard

4. **Performance Monitoring**
   - Monitor API response times
   - Set up alerts for downtime
   - Monitor database performance

## Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check environment variables are set correctly
- Check MongoDB connection string
- Review logs in Render/Heroku dashboard

**Problem**: CORS errors
- Verify CORS origin includes your frontend URL
- Check browser console for specific error messages

### Frontend Issues

**Problem**: API calls failing
- Verify `VITE_API_BASE_URL` is set correctly
- Check backend is running and accessible
- Verify CORS is configured

**Problem**: Build fails
- Check Node version compatibility
- Review build logs for specific errors
- Ensure all dependencies are in `package.json`

### Payment Issues

**Problem**: Razorpay not working
- Verify Razorpay keys are correct
- Check if using production keys (not test keys)
- Review Razorpay dashboard for transaction logs

## Security Checklist

- [ ] All `.env` files are in `.gitignore`
- [ ] JWT_SECRET is strong (32+ characters, random)
- [ ] MongoDB user has appropriate permissions
- [ ] CORS is configured to specific origins (not `*`)
- [ ] HTTPS is enabled for all services
- [ ] Admin routes are protected
- [ ] Rate limiting is implemented (recommended)
- [ ] Regular security updates for dependencies

## Support

For deployment issues:
1. Check application logs in hosting dashboard
2. Review MongoDB Atlas logs
3. Check Razorpay dashboard for payment issues
4. Review browser console for frontend errors

---

**Last Updated**: 2024

