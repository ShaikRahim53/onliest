# React Authentication System

A complete React.js authentication application with signup, login, and protected routes.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd onliest

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠️ Tech Stack Used

- **React.js** - Functional components with hooks
- **React Router** - Client-side routing and navigation
- **TailwindCSS** - Utility-first CSS framework
- **Custom Hooks** - Authentication and form management
- **Mock API** - Simulated backend with localStorage

## 📋 Features

### Core Features
- ✅ **User Signup** with form validation
- ✅ **User Login** with authentication
- ✅ **Protected Dashboard** - Only accessible when logged in
- ✅ **Route Protection** - Authentication guards
- ✅ **Form Validation** - Real-time error feedback
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Handling** - User-friendly error messages

### Bonus Features
- ✅ **Show/Hide Password** - Toggle password visibility
- ✅ **Remember Me** - Persistent login option
- ✅ **Reusable Components** - Modular UI components
- ✅ **Custom Hooks** - Authentication and form logic
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Smart Error Messages** - Contextual feedback for new users

##  Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FormInput.jsx   # Input field with validation
│   ├── Button.jsx       # Custom button component
│   └── Alert.jsx        # Success/error messages
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication logic
│   └── useForm.js      # Form management
├── pages/              # Page components
│   ├── Login.jsx        # Login page
│   ├── Signup.jsx       # Signup page
│   └── Dashboard.jsx    # Protected dashboard
├── routes/              # Route protection
│   ├── ProtectedRoute.jsx # Authenticated routes
│   └── PublicRoute.jsx   # Public routes
├── services/            # API and utilities
│   └── api.js          # Mock authentication API
└── App.jsx              # Main application component
```

## 🔄 Authentication Flow

### 1. User Registration
1. User fills signup form (name, email, password, confirm password)
2. Client-side validation checks all fields
3. Mock API validates data and creates user
4. Success message shows → User redirected to login

### 2. User Login
1. User enters credentials (email, password)
2. Form validation ensures proper format
3. Mock API authenticates against user database
4. Token generated and stored in localStorage
5. User redirected to protected dashboard

### 3. Route Protection
- `/login` and `/signup` - Only accessible when NOT authenticated
- `/dashboard` - Only accessible when authenticated
- Automatic redirects based on authentication status

## 🎨 UI Components

### FormInput Component
```jsx
<FormInput
  label="Email Address"
  name="email"
  type="email"
  value={values.email}
  onChange={handleChange}
  error={errors.email}
  showPasswordToggle
  onTogglePassword={togglePassword}
  required
/>
```

### Button Component
```jsx
<Button
  type="submit"
  loading={loading}
  disabled={loading}
  variant="primary"
  size="md"
>
  Sign In
</Button>
```

### Alert Component
```jsx
<Alert
  type="success"
  message="Login successful!"
  dismissible
  onClose={handleClose}
/>
```

## 🪝 Custom Hooks

### useAuth Hook
```javascript
const {
  isAuthenticated,  // boolean
  user,           // user object
  loading,         // boolean
  error,           // string
  login,           // function
  signup,          // function
  logout,          // function
  clearError        // function
} = useAuth();
```

### useForm Hook
```javascript
const {
  values,          // form values
  errors,          // validation errors
  touched,         // field focus state
  handleChange,     // input change handler
  handleBlur,      // input blur handler
  validateForm,    // form validation
  resetForm        // reset form state
} = useForm(initialValues, validationSchema);
```

## 🌐 Mock API

The application uses a mock API that simulates real server behavior:

### Features
- **Network Delays** - Simulates real API response times
- **Data Validation** - Server-side validation of inputs
- **Error Handling** - Proper error responses
- **Token Generation** - JWT-like authentication tokens
- **User Database** - In-memory user storage

### API Endpoints
```javascript
// Signup
authService.signup({ fullName, email, password })

// Login
authService.login({ email, password })

// Token Validation
authService.validateToken(token)
```

## 🧪 Testing

### Manual Testing
1. **Valid Login** - Use demo credentials
2. **Invalid Login** - Wrong email/password
3. **Form Validation** - Empty fields, invalid email
4. **Signup Flow** - Create new account
5. **Route Protection** - Direct URL access
6. **Logout** - Session termination

### Test Scenarios
- ✅ Successful authentication
- ✅ Failed authentication
- ✅ Form validation errors
- ✅ Password visibility toggle
- ✅ Remember me functionality
- ✅ Route protection
- ✅ Responsive design

## 📱 Responsive Design

- **Mobile-First** - Designed for mobile devices
- **TailwindCSS** - Responsive utilities
- **Touch-Friendly** - Proper button sizes and spacing
- **Accessible** - Semantic HTML and ARIA labels

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Environment Variables
No environment variables required - uses mock API.

## 🚨 Assumptions & Limitations

### Current Limitations
- **Mock API Only** - No real backend integration
- **No Unit Tests** - Manual testing only
- **Single User** - Mock database has one test user
- **Local Storage** - Tokens stored in browser localStorage

### Assumptions
- **Modern Browsers** - ES6+ features used
- **JavaScript Enabled** - Application requires JavaScript
- **Cookies Enabled** - localStorage dependency
- **No Server Required** - Complete frontend solution

## 🔄 Future Enhancements

### Potential Improvements
- **Real Backend Integration** - Replace mock API
- **Unit Testing** - Add Jest/React Testing Library
- **Multiple Users** - Expand mock database
- **Password Reset** - Forgot password functionality
- **Social Login** - OAuth integration
- **Role-Based Access** - Admin/user permissions
- **Session Management** - Token refresh mechanism
- **Progressive Web App** - PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support:
- Create an issue in the repository
- Check existing documentation
- Review demo credentials section

---

**Built with ❤️ using React.js and modern web technologies**
