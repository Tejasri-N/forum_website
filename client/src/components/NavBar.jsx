import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import HamburgerButton from "./HamburgerButton";
import UserProfile from "../pages/UserProfile";
import UserLogin from "../pages/UserLogin";

function NavBar({ toggleSidebar }) {
  const [pageState, setPageState] = useState(localStorage.getItem("pageState"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    // setUser(user);
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    // localStorage.removeItem("user");
    setIsLoggedIn(false);
    // setUser(null);
    setDropdownOpen(false);
    navigate("/signin");
    window.location.reload();
  };

  return (
    <div>
      <nav className="sticky top-0 w-full h-[100px] flex justify-between items-center px-8 z-50 bg-custom-nav-bg-2">
        <div className="flex items-center gap-8 text-lg font-rosario font-light">
          {location.pathname === "/" && (
            <HamburgerButton onClick={toggleSidebar} />
          )}
          <a
            onClick={() => togglePage("/")}
            className={pageState === "/" ? "text-hover-color" : "text-white"}
            href="/"
          >
            Home
          </a>
          <a
            onClick={() => togglePage("/about")}
            className={
              pageState === "/about" ? "text-hover-color" : "text-white"
            }
            href="/about"
          >
            About
          </a>
        </div>

        <div
          className={
            pageState === "/"
              ? "absolute left-1/2 transform -translate-x-1/2"
              : "hidden"
          }
        >
          <SearchBar
            placeholder="Type here to Search...."
            onSearch={handleSearch}
          />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-white hover:text-hover-color"
          >
            {!isLoggedIn ? "Login" : "Profile"}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              {!isLoggedIn ? (
                <UserLogin onLogin={handleLogin} />
              ) : (
                // <UserProfile user={user} onLogout={handleLogout} />
                <div className="flex flex-col m-2">
                  <button className="p-2">
                    <a href="/profile">My Profile</a>
                  </button>
                  <button className="p-2 block" onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;