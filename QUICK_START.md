# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js v18+ installed
- ✅ MongoDB running (local or Atlas connection string)
- ✅ Backend `.env` file configured
- ✅ Frontend `.env` file configured

## Step 1: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/koushiks-supplements
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   MongoDB Connected: ...
   Server listening on port 5000
   ```

## Step 2: Frontend Setup

1. **Open a new terminal and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the frontend server:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```

## Step 3: Access the Application

1. Open your browser and go to: `http://localhost:5173`
2. You should see the homepage
3. Navigate to Products page to see the product listing

## Step 4: Create Test Data (Optional)

### Create an Admin User

```bash
cd backend
node scripts/createAdmin.js admin@test.com Admin123
```

### Add Sample Products (via MongoDB or Admin Dashboard)

Once logged in as admin, you can add products through the admin dashboard at `/admin`.

## Troubleshooting

### Backend won't start

**Error: MongoDB connection failed**
- Check if MongoDB is running: `mongod --version`
- Verify `MONGO_URI` in `.env` is correct
- For MongoDB Atlas, ensure your IP is whitelisted

**Error: Port 5000 already in use**
- Change `PORT` in `.env` to another port (e.g., 5001)
- Or kill the process using port 5000

### Frontend won't start

**Error: Port 5173 already in use**
- Vite will automatically use the next available port
- Or specify a port: `npm run dev -- --port 3000`

**Error: Cannot connect to backend**
- Verify backend is running on port 5000
- Check `VITE_API_BASE_URL` in frontend `.env`
- Check browser console for CORS errors

### Products not loading

- Ensure backend is running
- Check backend logs for errors
- Verify MongoDB connection
- Check browser console for API errors

## Next Steps

1. **Register a new user** at `/register`
2. **Login** at `/login`
3. **Browse products** at `/products`
4. **Add products to cart**
5. **Complete checkout flow**

## Development Tips

- Backend auto-reloads with `nodemon` (via `npm run dev`)
- Frontend auto-reloads with Vite hot module replacement
- Check browser console (F12) for frontend errors
- Check terminal for backend errors
- Use MongoDB Compass to view database data

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

---

**Need help?** Check the main README.md or DEPLOYMENT.md for more details.

