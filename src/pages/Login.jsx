import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Alert from '../components/Alert';

const Login = ({ navigate }) => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [alert, setAlert] = useState(null);

  const validationSchema = {
    email: {
      required: true,
      requiredMessage: 'Email Address is required',
      email: true,
      emailMessage: 'Email must be in a valid format'
    },
    password: {
      required: true,
      requiredMessage: 'Password is required'
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm
  } = useForm(
    {
      email: '',
      password: ''
    },
    validationSchema
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login(values);
    
    if (result.success) {
      setAlert({
        type: 'success',
        message: result.message
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setAlert({
        type: 'error',
        message: result.message
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={goToSignup}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </button>
          </p>
        </div>
        
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            dismissible
            onClose={() => setAlert(null)}
          />
        )}
        
        {alert && alert.message.includes('New to this application') && (
          <div className="mt-4 text-center">
            <button
              onClick={goToSignup}
              className="text-blue-600 hover:text-blue-500 font-medium text-sm underline"
            >
              Create an account →
            </button>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : ''}
            placeholder="Enter your email address"
            required
            disabled={loading}
          />
          
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password ? errors.password : ''}
            placeholder="Enter your password"
            required
            showPasswordToggle
            onTogglePassword={togglePasswordVisibility}
            showPassword={showPassword}
            disabled={loading}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                disabled={loading}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Demo Account</span>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Use these credentials for testing:</p>
            <p className="font-mono mt-1">test@example.com</p>
            <p className="font-mono">password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
