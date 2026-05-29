import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";
import SignupPage from "./pages/border-animation/signup.jsx";
import NavBar from "./pages/nav-bar/NavBar.jsx";
// import Register from "./components/Register.jsx";

function App() {

  // const { data: authData, isLoading, error } = useQuery({
  //   queryKey: ['authUser'],
  //   queryFn: async () => {
  //     const result = await axiosInstance.get('/auth/me');
  //     return result.data;
  //   },
  //   retry: false
  // });

  // const authUser = authData?.user;

  return (
      <div data-theme="dark" className="flex relative">

        <Routes>
          {/* <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to="/login" />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/navbar" element={<NavBar />} />
          {/* <Route path="/register" element={<Register />} /> */}


        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          draggable
          pauseOnHover
          rtl={false}
          theme="colored"
          style={{ fontSize: 20, fontWeight: 300 }}
          transition={Zoom}
        />

      </div>
  );
}

export default App;