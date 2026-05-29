import  { useReducer } from 'react';
import './animate-signup.css';

const signupReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting
      };
    case 'RESET_FORM':
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        errors: {},
        isSubmitting: false
      };
    default:
      return state;
  }
};

const AnimatedSignupPage = () => {
  const [formData, dispatch] = useReducer(signupReducer, {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: {},
    isSubmitting: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FIELD',
      field: name,
      value: value
    });
    
    // Clear error when user starts typing
    if (formData.errors[name]) {
      dispatch({
        type: 'SET_ERRORS',
        errors: {
          ...formData.errors,
          [name]: ''
        }
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      dispatch({
        type: 'SET_SUBMITTING',
        isSubmitting: true
      });
      
      // Simulate API call
      setTimeout(() => {
        console.log('Signup data:', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        });
        
        dispatch({
          type: 'SET_SUBMITTING',
          isSubmitting: false
        });
        
        alert('Account created successfully!');
      }, 1500);
    } else {
      dispatch({
        type: 'SET_ERRORS',
        errors: newErrors
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="animated-border"></div>
        <h1>Create Account</h1>
        <p>Join our community today</p>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={formData.errors.firstName ? 'error' : ''}
                placeholder="Enter your first name"
              />
              {formData.errors.firstName && <span className="error-message">{formData.errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={formData.errors.lastName ? 'error' : ''}
                placeholder="Enter your last name"
              />
              {formData.errors.lastName && <span className="error-message">{formData.errors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formData.errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {formData.errors.email && <span className="error-message">{formData.errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formData.errors.password ? 'error' : ''}
              placeholder="Create a password"
            />
            {formData.errors.password && <span className="error-message">{formData.errors.password}</span>}
          </div>
          
          <button 
            type="submit" 
            className="signup-button"
            disabled={formData.isSubmitting}
          >
            {formData.isSubmitting ? (
              <>
                <span className="dots-spinner">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
                <span className="button-text">Creating Account...</span>
              </>
            ) : (
              <span className="button-text">Sign Up</span>
            )}
          </button>
        </form>
        
        <p className="login-link">
          Already have an account? <a href="#login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default AnimatedSignupPage;
