// Mock API service for authentication

// Simulated user database
const mockUsers = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'password123',
    fullName: 'Test User'
  }
];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate JWT-like token
const generateToken = () => {
  return 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);
};

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const authService = {
  // Signup API call
  async signup(userData) {
    await delay(1500); // Simulate network delay
    
    const { fullName, email, password } = userData;
    
    // Validation
    if (!fullName || !email || !password) {
      throw new Error('All fields are mandatory');
    }
    
    if (!isValidEmail(email)) {
      throw new Error('Email must be in a valid format');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      fullName,
      email,
      password
    };
    
    mockUsers.push(newUser);
    
    return {
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    };
  },

  // Login API call
  async login(credentials) {
    await delay(1000); // Simulate network delay
    
    const { email, password } = credentials;
    
    // Validation
    if (!email || !password) {
      throw new Error('All fields are mandatory');
    }
    
    if (!isValidEmail(email)) {
      throw new Error('Email must be in a valid format');
    }
    
    // Find user
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      // Check if email exists but password is wrong
      const emailExists = mockUsers.find(u => u.email === email);
      if (emailExists) {
        throw new Error('Incorrect password. Please try again.');
      } else {
        throw new Error('New to this application? Sign up to create an account.');
      }
    }
    
    // Generate token
    const token = generateToken();
    
    return {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    };
  },

  // Validate token (mock implementation)
  async validateToken(token) {
    await delay(500);
    
    if (!token || !token.startsWith('mock-jwt-token-')) {
      throw new Error('Invalid token');
    }
    
    return {
      success: true,
      user: {
        id: 1,
        fullName: 'Test User',
        email: 'test@example.com'
      }
    };
  }
};

// Export for testing purposes
export { mockUsers };
