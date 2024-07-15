import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";
import WithSplashScreen from "./components/WithSplashScreen";
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import UserSignup from "./pages/UserSignup";
import UserSignin from "./pages/UserSignin";
import UserProfile from "./pages/UserProfile";
import UserLogin from "./pages/UserLogin";
import Footer from "./components/Footer";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  // const user = useState(JSON.parse(localStorage.getItem("user")))
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavBar toggleSidebar={toggleSidebar} />
      <Routes>
        <Route
          path="/"
          element={
            <Home toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/signin" element={<UserSignin />} />
        {/* <Route path="/login" element={<UserLogin />} /> */}
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default WithSplashScreen(App);
