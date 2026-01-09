import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Alert from '../components/Alert';

const Signup = ({ navigate }) => {
  const { signup, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const validationSchema = {
    fullName: {
      required: true,
      requiredMessage: 'Full Name is required'
    },
    email: {
      required: true,
      requiredMessage: 'Email Address is required',
      email: true,
      emailMessage: 'Email must be in a valid format'
    },
    password: {
      required: true,
      requiredMessage: 'Password is required',
      minLength: 6,
      minLengthMessage: 'Password must be at least 6 characters'
    },
    confirmPassword: {
      required: true,
      requiredMessage: 'Confirm Password is required',
      validate: (value, values) => {
        if (value !== values.password) {
          return 'Password and Confirm Password must match';
        }
        return '';
      }
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  } = useForm(
    {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...signupData } = values;
    
    const result = await signup(signupData);
    
    if (result.success) {
      setAlert({
        type: 'success',
        message: result.message
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setAlert({
        type: 'error',
        message: result.message
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={goToLogin}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
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
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            label="Full Name"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName && errors.fullName ? errors.fullName : ''}
            placeholder="Enter your full name"
            required
            disabled={loading}
          />
          
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
            onTogglePassword={() => togglePasswordVisibility('password')}
            showPassword={showPassword}
            disabled={loading}
          />
          
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
            placeholder="Confirm your password"
            required
            showPasswordToggle
            onTogglePassword={() => togglePasswordVisibility('confirmPassword')}
            showPassword={showConfirmPassword}
            disabled={loading}
          />
          
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
