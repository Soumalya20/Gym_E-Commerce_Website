# Setup Checklist for Koushiks Supplements E-commerce

Use this checklist to ensure everything is properly configured before running the application.

## Pre-Installation

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB installed locally OR MongoDB Atlas account created
- [ ] Razorpay account created (for payment testing)

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```
- [ ] Dependencies installed successfully
- [ ] No errors in installation

### 2. Environment Configuration
Create `backend/.env` file with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

- [ ] `.env` file created in `backend/` directory
- [ ] `PORT` set (default: 5000)
- [ ] `MONGO_URI` configured (local or Atlas)
- [ ] `JWT_SECRET` set (minimum 32 characters)
- [ ] `RAZORPAY_KEY_ID` set
- [ ] `RAZORPAY_KEY_SECRET` set

### 3. Database Connection
- [ ] MongoDB is running (if using local MongoDB)
- [ ] MongoDB Atlas cluster created (if using Atlas)
- [ ] Database user created with read/write permissions
- [ ] Network access configured (IP whitelist)
- [ ] Connection string tested

### 4. Start Backend Server
```bash
cd backend
npm run dev
```

- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Server listening on port 5000 (or configured port)
- [ ] Health check works: `http://localhost:5000/api/health`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```
- [ ] Dependencies installed successfully
- [ ] No errors in installation

### 2. Environment Configuration
Create `frontend/.env` file with:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

- [ ] `.env` file created in `frontend/` directory
- [ ] `VITE_API_BASE_URL` points to backend URL

### 3. Start Frontend Server
```bash
cd frontend
npm run dev
```

- [ ] Server starts without errors
- [ ] Frontend accessible at `http://localhost:5173` (or shown port)
- [ ] No console errors in browser

## Application Testing

### Basic Functionality
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] All pages are accessible
- [ ] No 404 errors

### Authentication
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can logout
- [ ] Protected routes redirect to login when not authenticated
- [ ] User info persists after page refresh

### Products
- [ ] Products page loads
- [ ] Products are displayed (if any exist)
- [ ] Filters work (category, price, search)
- [ ] Product detail page loads
- [ ] Can view product details

### Cart
- [ ] Can add products to cart
- [ ] Cart count updates in navigation
- [ ] Cart page displays items
- [ ] Can update quantities
- [ ] Can remove items
- [ ] Cart persists on page refresh

### Checkout (Requires Authentication)
- [ ] Shipping page loads
- [ ] Can enter shipping address
- [ ] Can proceed to payment
- [ ] Payment screen loads
- [ ] Razorpay integration works (test mode)

### Admin Features (Requires Admin User)
- [ ] Admin dashboard accessible at `/admin`
- [ ] Can create new products
- [ ] Can edit products
- [ ] Can delete products
- [ ] Can view all orders
- [ ] Can mark orders as delivered

## Admin User Setup

### Create Admin User
```bash
cd backend
node scripts/createAdmin.js admin@test.com Admin123
```

- [ ] Script runs without errors
- [ ] Admin user created or updated
- [ ] Can login with admin credentials
- [ ] Admin dashboard accessible

## Production Readiness

### Security
- [ ] `.env` files are in `.gitignore`
- [ ] No sensitive data in code
- [ ] JWT_SECRET is strong and unique
- [ ] CORS configured correctly

### Performance
- [ ] Images optimized (if any)
- [ ] API responses are fast
- [ ] No console errors
- [ ] No memory leaks

### Documentation
- [ ] README.md reviewed
- [ ] QUICK_START.md reviewed
- [ ] DEPLOYMENT.md reviewed (if deploying)

## Troubleshooting Common Issues

### Backend Issues
- [ ] **Port already in use**: Change PORT in `.env` or kill process
- [ ] **MongoDB connection failed**: Check MONGO_URI and MongoDB status
- [ ] **JWT errors**: Verify JWT_SECRET is set correctly

### Frontend Issues
- [ ] **API connection refused**: Verify backend is running
- [ ] **CORS errors**: Check backend CORS configuration
- [ ] **Build errors**: Clear node_modules and reinstall

### Database Issues
- [ ] **Connection timeout**: Check network access settings
- [ ] **Authentication failed**: Verify database user credentials
- [ ] **Database not found**: Create database or update connection string

## Final Verification

- [ ] All checklist items completed
- [ ] Application runs without errors
- [ ] All features tested and working
- [ ] Ready for development or deployment

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Date Completed**: _______________

**Notes**: 
_________________________________________________
_________________________________________________
_________________________________________________

