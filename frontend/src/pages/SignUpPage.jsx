import { useState, useEffect, useReducer } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import logo from "./video-call-animate-1.svg";
import { motion } from "framer-motion";
import useSignUp from "../hooks/useSignUp";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const signupReducer = (state, action) => {
  switch (action.type) {

    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: ''
        }
      };

    case 'TOGGLE_PASSWORD':
      return {
        ...state,
        showPassword: !state.showPassword
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
        confirmPassword: '',
        errors: {},
        isSubmitting: false,
        termsAccepted: false,
        showPassword: false
      };

    default:
      return state;
  }
}

const SignUpPage = () => {

  const [animationKey, setAnimationKey] = useState(0);

  const [signupData, dispatch] = useReducer(signupReducer, {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
    isSubmitting: false,
    termsAccepted: false,
    showPassword: false
  });

  useEffect(() => {

    let interval;

    const handleResize = () => {
      clearInterval(interval);

      interval = setTimeout(() => {
        setAnimationKey((prevKey) => prevKey + 1);
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, signupMutation } = useSignUp();

  const validate = () => {
    const newErrors = {};

    if (!signupData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!signupData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!signupData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (signupData.confirmPassword !== signupData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const submitFields = (data) => ({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  });

  const handleSignup = (e) => {

    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      dispatch({
        type: 'SET_SUBMITTING',
        isSubmitting: true
      });

      const data = submitFields(signupData);

      signupMutation(data);

      dispatch({
        type: 'SET_SUBMITTING',
        isSubmitting: false
      });

      dispatch({
        type: 'RESET_FORM'
      });

    } else {
      dispatch({
        type: 'SET_ERRORS',
        errors: newErrors
      });
    }
  };

  return (
    <div
      className="height-full w-full absolute flex items-center justify-center sm:p-6 md:p-8"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex rounded-lg flex-col">

          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">

            <form onSubmit={(e) => handleSignup(e)}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">First Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered w-full text-xs"
                        value={signupData.firstName}
                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'firstName', value: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Last Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered w-full text-xs"
                        value={signupData.lastName}
                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'lastName', value: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })}
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="form-control relative align-center w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type={signupData.showPassword ? 'text' : 'password'}
                      placeholder="at least 6 characters..."
                      className="input input-bordered w-full" 
                      style={{ 
                        border: !signupData.password  ? '' : ( signupData.password !== signupData.confirmPassword) ? '1px solid #FF0000' : '1px solid #1ADA1A', 
                        color: (signupData.password && signupData.password.length < 6) || (signupData.password !== signupData.confirmPassword) ?  '#FF0000' : (signupData.password && signupData.password.length > 5) ? '#1ADA1A' : ''
                       }}
                      value={signupData.password}
                      onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'password', value: e.target.value })}
                      required
                    />
                    <span className="wrap-span" onClick={() => dispatch({ 'type': 'TOGGLE_PASSWORD' })}>
                      {signupData.showPassword ? <FaEyeSlash style={{ width: "20px", height: "20px" }} /> : <FaEye style={{ width: "20px", height: "20px" }} />}
                    </span>

                    {signupData.errors.password && (
                      <p className="text-xs text-red-500 opacity-70 mt-2">
                        Password must be at least 6 characters long
                      </p>)
                    }
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div className="form-control relative align-center w-full">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type={signupData.showPassword ? 'text' : 'password'}
                      placeholder="confirm password..."
                      className="input input-bordered w-full"
                      style={{ border: !signupData.confirmPassword  ? '' : signupData.confirmPassword && signupData.confirmPassword !== signupData.password ? '1px solid #FF0000' : '1px solid #1ADA1A', color: `${signupData.password && signupData.password !== signupData.confirmPassword ? '#FF0000' : '#1ADA1A'}` }}
                      value={signupData.confirmPassword}
                      onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'confirmPassword', value: e.target.value })}
                      required
                    />
                    <span className="wrap-span" onClick={() => dispatch({ 'type': 'TOGGLE_PASSWORD' })}>
                      {signupData.showPassword ? <FaEyeSlash style={{ width: "20px", height: "20px" }} /> : <FaEye style={{ width: "20px", height: "20px" }} />}
                    </span>

                    {signupData.errors.confirmPassword && (
                      <p className="text-xs text-red-500 opacity-70 mt-2">
                        Passwords do not match
                      </p>)
                    }
                  </div>

                  {/** accept terms */}
                  <div className="form-control hover:cursor-pointer">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" checked={signupData.termsAccepted} className="checkbox checkbox-sm" 
                      style={{ 
                        width: "27px", 
                        height: "27px",
                        border: "1px solid #7EA1FA", 
                        opacity: signupData.termsAccepted ? 1 : 0.3 
                      }} 
                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'termsAccepted', value: e.target.checked })} required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <motion.img
                key={animationKey} // Key change triggers a fresh "initial" to "animate" transition
                src={logo}
                initial={{ x: 20, y: -40, opacity: 0.7 }} // Start 20px to the right
                whileHover={{ scale: 1.07, rotate: 3 }}
                animate={{ x: 0, y: 0, opacity: 1 }}    // Slide to original position
                transition={{ type: "keyframes", duration: 1, ease: "ease" }}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h3 className="text-xl font-semibold">Connect with language partners worldwide</h3>
              <h4 className="opacity-60 text-sm hover:text-[#03edde]">
                Practice conversations, make friends, and improve your language skills together
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;