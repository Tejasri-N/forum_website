import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/BackgroundImage.jpg";

function UserSignin({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
  });
  const [otpData, setOtpData] = useState({
    otp: "",
    email: "",
    newpassword: "",
  });
  const [showMessage, setShowMessage] = useState({
    message: "",
    success: false,
  });
  const [currentView, setCurrentView] = useState("signin");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData({
      ...forgotPasswordData,
      [name]: value,
    });
  };

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpData({
      ...otpData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const result = await response.json();

      if (result.status === "ok") {
        setShowMessage({
          message: "Logged in successfully!",
          success: true,
        });
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(result.user));
        // onLogin(result.user);
        navigate("/");
        alert("Logged in successfully");
        window.location.reload();
      } else {
        setShowMessage({
          message: result.error || "Invalid login",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setShowMessage({
        message: "An error occurred. Please try again.",
        success: false,
      });
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotPasswordData.email }),
      });

      const result = await response.json();

      if (result.status === "ok") {
        setShowMessage({
          message: "Password reset email sent!",
          success: true,
        });
        setCurrentView("otp");
      } else {
        setShowMessage({
          message: result.error || "Failed to send password reset email",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setShowMessage({
        message: "An error occurred. Please try again.",
        success: false,
      });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/newPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otpData: otpData }),
      });

      const result = await response.json();

      if (response.ok) {
        setShowMessage({
          message: "Password reset successfully",
          success: true,
        });
        setCurrentView("signin");
        alert(
          "Password reset successfully. Please log in with your new password."
        );
      } else {
        setShowMessage({
          message: result.error || "Failed to reset password",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setShowMessage({
        message: "An error occurred. Please try again.",
        success: false,
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-custom-body-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-md w-full space-y-50 bg-white bg-opacity-75 p-8 rounded-md shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        </div>

        {currentView === "signin" && (
          <>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-100">
                <div className="m-2">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="m-2">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="m-2">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
            {showMessage.message && (
              <p
                className={`mt-4 text-center ${
                  showMessage.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {showMessage.message}
              </p>
            )}
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500"
                onClick={() => setCurrentView("forgotPassword")}
              >
                Forgot Password?
              </button>
            </div>
          </>
        )}

        {currentView === "forgotPassword" && (
          <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <form
              className="mt-8 space-y-6"
              onSubmit={handleForgotPasswordSubmit}
            >
              <div className="rounded-md shadow-sm -space-y-100">
                <div className="m-2">
                  <label htmlFor="forgot-password-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="forgot-password-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={forgotPasswordData.email}
                    onChange={handleForgotPasswordChange}
                  />
                </div>
              </div>

              <div className="m-2">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send OTP
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500"
                onClick={() => setCurrentView("signin")}
              >
                Back to Sign In
              </button>
            </div>
          </>
        )}

        {currentView === "otp" && (
          <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Enter OTP
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
              <div className="rounded-md shadow-sm -space-y-100">
                <div className="m-2">
                  <label htmlFor="otp" className="sr-only">
                    OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="OTP"
                    value={otpData.otp}
                    onChange={handleOtpChange}
                  />
                </div>
                <div className="m-2">
                  <label htmlFor="otp-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="otp-email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={otpData.email}
                    onChange={handleOtpChange}
                  />
                </div>
                <div className="m-2">
                  <label htmlFor="new-password" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    name="newpassword"
                    type="password"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="New Password"
                    value={otpData.newpassword}
                    onChange={handleOtpChange}
                  />
                </div>
              </div>

              <div className="m-2">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit OTP
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500"
                onClick={() => setCurrentView("signin")}
              >
                Back to Sign In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserSignin;
