🏋️ Koushiks Supplements E-commerce Platform

<div align="center">

A full-featured, production-ready e-commerce platform for sports nutrition supplements

Features • Quick Start • Installation • Documentation • Support

</div>

📖 Table of Contents

Overview

Features

Technology Stack

Prerequisites

Installation

Configuration

Running the Application

Project Structure

API Documentation

Testing

Deployment

Troubleshooting

Documentation

Support

🎯 Overview

Koushiks Supplements E-commerce is a modern, full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. This platform provides a complete online shopping experience for sports nutrition supplements, featuring secure authentication, product management, shopping cart functionality, Razorpay payment integration, and a comprehensive admin dashboard.

Key Highlights

✅ Production-Ready: Fully functional with error handling and security measures

✅ Responsive Design: Mobile-first approach with Tailwind CSS

✅ Secure Payments: Integrated Razorpay payment gateway

✅ Admin Dashboard: Complete product and order management system

✅ SEO Optimized: Dynamic meta tags and semantic HTML

✅ Scalable Architecture: Clean code structure for easy maintenance

✨ Features

👤 Customer Features

Feature

Description

🔐 Authentication

Secure user registration and login with JWT tokens

🛍️ Product Browsing

Browse products with advanced filtering (category, price, search)

📦 Product Details

Detailed product pages with images, reviews, and ratings

🛒 Shopping Cart

Persistent cart with quantity management and localStorage

💳 Checkout Flow

Complete shipping address collection and payment processing

💸 Payment Gateway

Secure Razorpay integration with order verification

📋 Order History

View past orders and track delivery status

⭐ Product Reviews

Submit and view customer reviews with star ratings

👨‍💼 Admin Features

Feature

Description

📊 Dashboard

Centralized control panel for store operations

📦 Product Management

Create, update, and delete products with full CRUD operations

📋 Order Management

View all orders and mark them as delivered

📈 Inventory Control

Real-time stock management and tracking

👥 User Management

View and manage user accounts (future enhancement)

🛠️ Technical Features

Responsive Design: Mobile-first approach with Tailwind CSS

SEO Optimized: Dynamic meta tags using react-helmet-async

Error Handling: Comprehensive error handling throughout

Security: JWT authentication, password hashing, admin route protection

Performance: Optimized queries, pagination, and lazy loading

Type Safety: TypeScript support in frontend

🛠️ Technology Stack

Backend

Node.js - JavaScript runtime

Express.js - Web framework

MongoDB - NoSQL database

Mongoose - MongoDB object modeling

JWT - Authentication tokens

bcryptjs - Password hashing

Razorpay - Payment gateway integration

Frontend

React 18 - UI library

TypeScript - Type safety

React Router DOM - Routing

Tailwind CSS - Styling framework

Axios - HTTP client

React Helmet Async - SEO management

Vite - Build tool

Development Tools

Nodemon - Auto-restart for backend

ESLint - Code linting (optional)

Git - Version control

📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

Required Software

Node.js (v18 or higher)

Download from nodejs.org

Verify installation: node --version

Verify npm: npm --version

MongoDB (v6 or higher)

Option A: Local MongoDB

Download from mongodb.com

Install and start MongoDB service

Option B: MongoDB Atlas (Cloud)

Sign up at mongodb.com/cloud/atlas

Create a free cluster

Git (Optional, for version control)

Download from git-scm.com

Code Editor (Recommended)

Visual Studio Code

WebStorm

Any editor of your choice

Required Accounts

Razorpay Account (For payment processing)

Sign up at razorpay.com

Get API keys from dashboard

See RAZORPAY_SETUP.md for detailed setup

🚀 Installation

Step 1: Clone or Download the Project

If you have the project in a Git repository:

git clone <repository-url>
cd koushiks-supplements-ecommerce


If you have the project files locally, navigate to the project directory:

cd koushiks-supplements-ecommerce


Step 2: Backend Setup

Navigate to backend directory:

cd backend


Install dependencies:

npm install


This will install all required packages listed in package.json.

Create environment file:
Create a .env file in the backend directory:

# Windows (PowerShell)
New-Item -Path .env -ItemType File

# Mac/Linux
touch .env


Configure environment variables:
Open .env and add the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/koushiks-supplements
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret


Important Notes:

Replace MONGO_URI with your MongoDB connection string

Local: mongodb://localhost:27017/koushiks-supplements

Atlas: mongodb+srv://username:password@cluster.mongodb.net/koushiks-supplements

Generate a strong JWT_SECRET (minimum 32 characters)

Get Razorpay keys from Razorpay Dashboard

See RAZORPAY_SETUP.md for Razorpay setup

Step 3: Frontend Setup

Navigate to frontend directory:

cd ../frontend


Install dependencies:

npm install


This may take a few minutes as it installs React and all dependencies.

Create environment file:

# Windows (PowerShell)
New-Item -Path .env -ItemType File

# Mac/Linux
touch .env


Configure environment variables:
Open .env and add:

VITE_API_BASE_URL=http://localhost:5000/api


For production, change this to your deployed backend URL.

Step 4: Database Setup

Start MongoDB:

Local MongoDB: Ensure MongoDB service is running

# Windows (as Administrator)
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
# or
mongod


MongoDB Atlas: No action needed, it's cloud-based

Create Admin User (Optional but Recommended):

cd backend
node scripts/createAdmin.js


This creates an admin user with:

Email: admin@koushikssupplements.com

Password: Admin123

Change this password after first login!

Seed Sample Products (Optional):

node scripts/seedProducts.js


This adds 8 sample products to your database for testing.

⚙️ Configuration

Backend Configuration

The backend uses environment variables from backend/.env:

Variable

Description

Example

PORT

Server port

5000

MONGO_URI

MongoDB connection string

mongodb://localhost:27017/koushiks-supplements

JWT_SECRET

Secret key for JWT tokens

your_secret_key_min_32_chars

RAZORPAY_KEY_ID

Razorpay API Key ID

rzp_test_xxxxxxxxxxxxx

RAZORPAY_KEY_SECRET

Razorpay API Key Secret

your_key_secret_here

Frontend Configuration

The frontend uses environment variables from frontend/.env:

Variable

Description

Example

VITE_API_BASE_URL

Backend API base URL

http://localhost:5000/api

MongoDB Connection Strings

Local MongoDB:

mongodb://localhost:27017/koushiks-supplements


MongoDB Atlas:

mongodb+srv://<username>:<password>@<cluster>.mongodb.net/koushiks-supplements?retryWrites=true&w=majority


Replace:

<username> - Your MongoDB Atlas username

<password> - Your MongoDB Atlas password

<cluster> - Your cluster name

🚀 Running the Application

Development Mode

You need two terminal windows - one for backend and one for frontend.

Terminal 1: Backend Server

cd backend
npm run dev


Expected Output:

MongoDB Connected: localhost:27017
Server listening on port 5000


The backend API will be available at: http://localhost:5000

API Health Check:
Visit http://localhost:5000/api/health in your browser to verify the server is running.

Terminal 2: Frontend Server

cd frontend
npm run dev


Expected Output:

  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose


The frontend will be available at: http://localhost:5173 (or another port if 5173 is busy)

Production Build

Backend Production

cd backend
npm start


Frontend Production

Build the application:

cd frontend
npm run build


This creates an optimized dist folder.

Preview the build:

npm run preview


Deploy the dist folder to your hosting service (Netlify, Vercel, etc.)

📁 Project Structure

koushiks-supplements-ecommerce/
│
├── backend/                    # Backend server
│   ├── config/                # Configuration files
│   │   └── db.js              # MongoDB connection
│   ├── controllers/           # Request handlers
│   │   ├── authController.js  # Authentication logic
│   │   ├── productController.js # Product CRUD operations
│   │   ├── orderController.js  # Order management
│   │   └── paymentController.js # Razorpay integration
│   ├── middleware/            # Custom middleware
│   │   ├── auth.js            # JWT authentication
│   │   └── admin.js           # Admin authorization
│   ├── models/                # Database models
│   │   ├── User.js            # User schema
│   │   ├── Product.js         # Product schema
│   │   └── Order.js           # Order schema
│   ├── routes/                # API routes
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── productRoutes.js   # Product endpoints
│   │   ├── orderRoutes.js     # Order endpoints
│   │   └── paymentRoutes.js   # Payment endpoints
│   ├── scripts/               # Utility scripts
│   │   ├── createAdmin.js     # Create admin user
│   │   └── seedProducts.js   # Seed sample products
│   ├── utils/                 # Utility functions
│   │   ├── generateToken.js   # JWT token generation
│   │   └── razorpay.js        # Razorpay instance
│   ├── .env                   # Environment variables (create this)
│   ├── package.json           # Backend dependencies
│   └── server.js              # Server entry point
│
├── frontend/                   # Frontend React app
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Nav.tsx        # Navigation bar
│   │   │   ├── Hero.tsx       # Hero section
│   │   │   ├── ProductCard.tsx # Product card component
│   │   │   └── Rating.tsx     # Star rating component
│   │   ├── contexts/          # React Context providers
│   │   │   ├── AuthContext.tsx # Authentication state
│   │   │   └── CartContext.tsx # Shopping cart state
│   │   ├── layouts/           # Layout components
│   │   │   └── MainLayout.tsx # Main page layout
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.tsx   # Homepage
│   │   │   ├── ProductListPage.tsx # Product listing
│   │   │   ├── ProductDetailPage.tsx # Product details
│   │   │   ├── CartPage.tsx   # Shopping cart
│   │   │   ├── ShippingPage.tsx # Shipping form
│   │   │   ├── PaymentScreen.tsx # Payment page
│   │   │   ├── LoginPage.tsx  # Login page
│   │   │   ├── RegisterPage.tsx # Registration page
│   │   │   ├── AdminDashboard.tsx # Admin panel
│   │   │   └── ...            # Other pages
│   │   ├── utils/             # Utility functions
│   │   │   ├── apiClient.ts   # Axios configuration
│   │   │   └── loadRazorpay.ts # Razorpay script loader
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── .env                   # Environment variables (create this)
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   └── tsconfig.json          # TypeScript configuration
│
├── README.md                   # This file
├── QUICK_START.md              # Quick setup guide
├── RAZORPAY_SETUP.md          # Razorpay integration guide
├── TESTING_REPORT.md           # Testing documentation
├── DEPLOYMENT.md               # Deployment guide
└── IMPROVEMENTS_SUMMARY.md     # Recent improvements



📡 API Documentation

Base URL

http://localhost:5000/api


Authentication Endpoints

Method

Endpoint

Description

Auth Required

POST

/auth/register

Register new user

No

POST

/auth/login

Login user

No

GET

/auth/me

Get current user

Yes

Example - Register:

POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}


Product Endpoints

Method

Endpoint

Description

Auth Required

Admin Only

GET

/products

Get all products (with filters)

No

No

GET

/products/:id

Get single product

No

No

POST

/products

Create product

Yes

Yes

PUT

/products/:id

Update product

Yes

Yes

DELETE

/products/:id

Delete product

Yes

Yes

POST

/products/:id/reviews

Submit review

Yes

No

Example - Get Products with Filters:

GET /api/products?category=Whey+Protein&minPrice=1000&maxPrice=5000&sortBy=price


Order Endpoints

Method

Endpoint

Description

Auth Required

Admin Only

GET

/orders/mine

Get user's orders

Yes

No

GET

/orders

Get all orders

Yes

Yes

GET

/orders/:id

Get order details

Yes

No*

PUT

/orders/:id/deliver

Mark as delivered

Yes

Yes

*Users can only view their own orders unless admin

Payment Endpoints

Method

Endpoint

Description

Auth Required

POST

/payment/orders

Create Razorpay order

Yes

POST

/payment/verify

Verify payment

Yes

Example - Create Payment Order:

POST /api/payment/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 2799,
  "currency": "INR"
}


🧪 Testing

Quick Test Checklist

✅ Backend Running

Visit http://localhost:5000/api/health

Should see: {"status":"OK","message":"Koushiks Supplements API is running"}

✅ Frontend Running

Visit http://localhost:5173

Should see the homepage

✅ Database Connected

Check backend console for: MongoDB Connected: localhost:27017

✅ Test User Registration

Go to /register

Create a test account

Should redirect to homepage

✅ Test Admin Login

Go to /login

Use: admin@koushikssupplements.com / Admin123

Should see "Admin" link in navigation

✅ Test Product Browsing

Go to /products

Should see 8 sample products (if seeded)

Manual Testing Guide

See TESTING_REPORT.md for comprehensive testing documentation.

Test Credentials

Admin User:

Email: admin@koushikssupplements.com

Password: Admin123

Regular User:

Create your own via registration page

🌐 Deployment

Backend Deployment

Option 1: Render

Connect your GitHub repository

Set build command: npm install

Set start command: npm start

Add environment variables in dashboard

Deploy!

Option 2: Heroku

heroku create koushiks-supplements-api
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set RAZORPAY_KEY_ID=your_key_id
heroku config:set RAZORPAY_KEY_SECRET=your_key_secret
git push heroku main


Frontend Deployment

Option 1: Netlify

Connect GitHub repository

Build command: npm run build

Publish directory: dist

Add environment variable: VITE_API_BASE_URL=your_backend_url/api

Option 2: Vercel

npm i -g vercel
cd frontend
vercel


MongoDB Atlas Setup

Create account at mongodb.com/cloud/atlas

Create a free cluster

Create database user

Whitelist IP (use 0.0.0.0/0 for all IPs in development)

Get connection string

Update MONGO_URI in backend .env

Detailed deployment guide: See DEPLOYMENT.md

🐛 Troubleshooting

Common Issues and Solutions

Backend Issues

❌ MongoDB Connection Error

Error: connect ECONNREFUSED 127.0.0.1:27017


Solution:

Ensure MongoDB is running: mongod or start MongoDB service

Check MONGO_URI in .env is correct

For Atlas, verify connection string and IP whitelist

❌ Port Already in Use

Error: listen EADDRINUSE: address already in use :::5000


Solution:

Change PORT in .env to another port (e.g., 5001)

Or kill the process: npx kill-port 5000

❌ JWT Errors

Error: jwt malformed


Solution:

Ensure JWT_SECRET is set in .env

Use a strong secret (minimum 32 characters)

Restart server after changing .env

Frontend Issues

❌ API Connection Error

Network Error: Failed to fetch


Solution:

Verify backend is running on http://localhost:5000

Check VITE_API_BASE_URL in frontend .env

Ensure CORS is enabled in backend (it is by default)

❌ Build Errors

Module not found: Can't resolve...


Solution:

cd frontend
rm -rf node_modules package-lock.json
npm install


❌ Razorpay Not Loading

Razorpay is not defined


Solution:

Check browser console for script loading errors

Verify Razorpay keys are correct

Ensure internet connection (Razorpay loads from CDN)

Payment Issues

❌ Razorpay Modal Not Opening
Solution:

Verify RAZORPAY_KEY_ID is correct in backend .env

Check browser console for errors

Ensure Razorpay script is loaded

❌ Payment Verification Fails
Solution:

Check backend logs for signature verification errors

Verify RAZORPAY_KEY_SECRET matches the Key ID

Ensure payment data is sent correctly

Database Issues

❌ Products Not Showing
Solution:

Run seed script: node backend/scripts/seedProducts.js

Check MongoDB connection

Verify products exist in database

❌ Admin User Not Working
Solution:

Run admin creation script: node backend/scripts/createAdmin.js

Verify user role is set to "admin" in database

Check email matches exactly: admin@koushikssupplements.com

Still Having Issues?

Check backend console for error messages

Check browser console (F12) for frontend errors

Verify all environment variables are set correctly

Ensure all dependencies are installed: npm install in both folders

Review TESTING_REPORT.md for known issues

📚 Documentation

This project includes comprehensive documentation:

Document

Description

README.md

Main project documentation (this file)

QUICK_START.md

Quick setup guide for experienced developers

RAZORPAY_SETUP.md

Detailed Razorpay payment integration guide

TESTING_REPORT.md

Comprehensive testing results and checklist

DEPLOYMENT.md

Step-by-step deployment instructions

IMPROVEMENTS_SUMMARY.md

Recent improvements and fixes

Additional Resources

MongoDB Documentation

Express.js Documentation

React Documentation

Razorpay Documentation

Tailwind CSS Documentation

TypeScript Documentation

🔒 Security Considerations

Important Security Practices

Never commit .env files

.env files are in .gitignore

Never share your environment variables

Use Strong Secrets

JWT_SECRET should be minimum 32 characters

Use random, complex strings

Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Keep API Keys Secure

Never expose Razorpay keys in frontend code

Use environment variables only

Rotate keys if compromised

Production Checklist

✅ Use HTTPS (required for Razorpay live mode)

✅ Set strong JWT secret

✅ Use MongoDB Atlas with proper access controls

✅ Enable CORS only for your frontend domain

✅ Implement rate limiting (recommended)

✅ Regular dependency updates

✅ Monitor error logs

🎯 Next Steps

After setting up the project:

✅ Configure Razorpay

Sign up at razorpay.com

Get test API keys

Add to backend/.env

See RAZORPAY_SETUP.md

✅ Test Complete Flow

Register a user

Browse products

Add to cart

Complete checkout

Test payment (use test cards)

✅ Customize Content

Update product images

Modify branding and colors

Add your own products via admin dashboard

✅ Deploy to Production

Set up MongoDB Atlas

Deploy backend (Render/Heroku)

Deploy frontend (Netlify/Vercel)

Configure production environment variables

👥 Support

Getting Help

Check Documentation

Review this README

Check TESTING_REPORT.md for known issues

See TROUBLESHOOTING section above

Common Questions

Q: How do I create an admin user?

A: Run node backend/scripts/createAdmin.js

Q: How do I add sample products?

A: Run node backend/scripts/seedProducts.js

Q: Where do I get Razorpay keys?

A: See RAZORPAY_SETUP.md

Contact

Email: support@koushikssupplements.com

Check backend/frontend console logs for errors

Review browser console (F12) for frontend issues

📄 License

This project is proprietary software for Koushiks Supplements.

All rights reserved. Unauthorized copying, modification, or distribution is prohibited.

🙏 Acknowledgments

Built with the MERN stack

Payment integration by Razorpay

UI components styled with Tailwind CSS

Icons and graphics from various sources

<div align="center">

Built with ❤️ for Koushiks Supplements

Empowering fitness journeys with premium nutrition

⬆ Back to Top

</div>