import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useUserData from "../hook/useUserData ";

const Header = () => {
  const { user, loading, error } = useUserData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  // console.log("user bolo",user.data);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Error during logout");
    }
  };

  const isLoggedIn = !!localStorage.getItem("token");

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <header className="w-full h-16 bg-gray-800 flex items-center justify-between px-4 md:px-9 shadow-md">
      <Link to={"/"} className="flex items-center space-x-2 text-white">
        <h1 className="text-2xl font-bold">EFS</h1>
        <div className="text-xs">
          <span>Employee</span>
          <span> Feedback</span>
          <span> System</span>
        </div>
      </Link>

      <button
        className="md:hidden text-white"
        onClick={toggleMenu}
      >
        {isMenuOpen ? "Close Menu" : "Open Menu"}
      </button>

      <nav className="hidden md:flex items-center space-x-6 text-lg font-semibold">
        <Link
          to={"/"}
          className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Home
        </Link>
        <Link
          to={"/user"}
          className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Employee
        </Link>
        <Link
          to={"/admin/adminPage"}
          className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Admin
        </Link>

        {/* Profile Section */}
        {user?.data && (
          <div className="flex items-center space-x-2">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={user.data.profilePic || "/path/to/default-profile-pic.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white tracking-widest text-sm font-medium ">
              {user.data.fullName}
            </span>
          </div>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to={"/login"}
            className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 right-0 w-64 bg-gray-800 shadow-lg z-50 p-4">
          <ul className="flex flex-col space-y-4">
            <Link
              to={"/"}
              className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Home
            </Link>
            <Link
              to={"/user"}
              className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Employee
            </Link>
            <Link
              to={"/admin"}
              className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Admin
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
