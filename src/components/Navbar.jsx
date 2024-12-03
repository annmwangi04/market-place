/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";

const Navbar = ({ user }) => {
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Logout failed:", error);
    });
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <div className="space-x-4">
          {user ? (
            <>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
              <NavLink to="/products" className="hover:underline">
                Products
              </NavLink>
              <span>Welcome, {user.email}</span>
              <button
                onClick={handleLogout}
                className="hover:underline text-red-200 ml-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
              <NavLink to="/signup" className="hover:underline">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;