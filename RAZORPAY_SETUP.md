# Razorpay Payment Integration Setup Guide

This guide will help you set up Razorpay payment integration for the Koushiks Supplements e-commerce site.

## Prerequisites

1. A Razorpay account (Sign up at https://razorpay.com/)
2. Access to Razorpay Dashboard
3. Backend `.env` file configured

---

## Step 1: Create a Razorpay Account

1. Go to https://razorpay.com/
2. Click "Sign Up" and create an account
3. Complete the account verification process

---

## Step 2: Get Your API Keys

### For Test Mode (Development)

1. Log in to your Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. You'll see two keys:
   - **Key ID** (starts with `rzp_test_...`)
   - **Key Secret** (starts with `rzp_test_...`)

### For Live Mode (Production)

1. Complete your business verification in Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. Switch to **Live Mode**
4. Generate new keys:
   - **Key ID** (starts with `rzp_live_...`)
   - **Key Secret** (starts with `rzp_live_...`)

---

## Step 3: Configure Backend Environment

1. Open `backend/.env` file
2. Add your Razorpay credentials:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret_here
```

**Important Notes:**
- For development, use **Test Mode** keys (starts with `rzp_test_`)
- For production, use **Live Mode** keys (starts with `rzp_live_`)
- Never commit `.env` file to version control
- Keep your Key Secret secure and never expose it in frontend code

---

## Step 4: Test Payment Flow

### Using Razorpay Test Cards

Razorpay provides test cards for testing payments without real money:

#### Successful Payment
- **Card Number**: `4111 1111 1111 1111`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name

#### Failed Payment
- **Card Number**: `4000 0000 0000 0002`
- **Expiry**: Any future date
- **CVV**: Any 3 digits

#### 3D Secure Authentication
- **Card Number**: `4012 0010 3714 1112`
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **OTP**: `1234` (when prompted)

---

## Step 5: Verify Integration

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start your frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Test the payment flow:
   - Add products to cart
   - Proceed to checkout
   - Fill shipping details
   - Click "Pay with Razorpay"
   - Use test card details above
   - Complete payment

4. Check Razorpay Dashboard:
   - Go to **Payments** section
   - You should see test payments listed
   - Verify payment status and details

---

## Payment Flow Architecture

### Backend Endpoints

1. **POST `/api/payment/orders`**
   - Creates a Razorpay order
   - Returns order ID and amount
   - Requires authentication

2. **POST `/api/payment/verify`**
   - Verifies payment signature
   - Creates order in database
   - Updates product stock
   - Requires authentication

### Frontend Flow

1. User clicks "Pay with Razorpay"
2. Frontend calls `/api/payment/orders` to create Razorpay order
3. Razorpay checkout modal opens
4. User enters payment details
5. On success, frontend calls `/api/payment/verify` with payment details
6. Backend verifies signature and creates order
7. User redirected to order success page

---

## Security Best Practices

1. **Never expose Key Secret in frontend**
   - Key Secret should only be in backend `.env`
   - Frontend only needs Key ID (for Razorpay modal)

2. **Always verify payment signature**
   - Backend verifies signature before creating order
   - Prevents payment tampering

3. **Validate amounts server-side**
   - Backend recalculates totals
   - Prevents price manipulation

4. **Use HTTPS in production**
   - Required for secure payment processing
   - Razorpay requires HTTPS for live mode

---

## Troubleshooting

### Issue: "Razorpay credentials are not configured"
- **Solution**: Check that `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set in `backend/.env`
- **Solution**: Restart backend server after updating `.env`

### Issue: Payment modal doesn't open
- **Solution**: Check browser console for errors
- **Solution**: Verify Razorpay script is loaded (check Network tab)
- **Solution**: Ensure Key ID is correct in frontend

### Issue: Payment verification fails
- **Solution**: Check that signature verification logic is correct
- **Solution**: Verify Key Secret matches the Key ID
- **Solution**: Check backend logs for detailed error messages

### Issue: Test payments not showing in dashboard
- **Solution**: Ensure you're using Test Mode keys
- **Solution**: Check Razorpay Dashboard → Payments section
- **Solution**: Wait a few seconds for payment to sync

---

## Production Deployment Checklist

- [ ] Complete Razorpay business verification
- [ ] Switch to Live Mode API keys
- [ ] Update `.env` with production keys
- [ ] Enable HTTPS on your domain
- [ ] Test payment flow with real card (small amount)
- [ ] Set up webhook for payment notifications (optional)
- [ ] Configure payment success/failure redirect URLs
- [ ] Set up email notifications for orders

---

## Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/test-cards/)
- [Razorpay Webhooks](https://razorpay.com/docs/webhooks/)

---

## Support

For Razorpay-specific issues:
- Email: support@razorpay.com
- Documentation: https://razorpay.com/docs/

For application-specific issues:
- Check `TESTING_REPORT.md` for known issues
- Review backend logs for error details

