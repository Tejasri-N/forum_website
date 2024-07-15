import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function UserLogin({ onLogin }) {
  const [pageState, setPageState] = useState(localStorage.getItem("pageState"));
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("pageState") !== window.location.pathname) {
      localStorage.setItem("pageState", window.location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("pageState", pageState);
  }, [pageState]);

  const togglePage = (page) => {
    setPageState(page);
  };

  return (
    <div className="p-2">
      <a
        onClick={() => togglePage("/signin")}
        href="/signin"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        onLogin={onLogin}
      >
        Sign In
      </a>
      <a
        onClick={() => togglePage("/signup")}
        href="/signup"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        Sign Up
      </a>
    </div>
  );
}

export default UserLogin;