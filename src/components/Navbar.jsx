import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Logout failed:", error);
    });
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <NavLink to="/" className="text-lg font-bold">
          MyApp
        </NavLink>
        <div className="space-x-4">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="hover:underline"
                activeClassName="font-bold"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="hover:underline"
                activeClassName="font-bold"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <>
              <span>Welcome, {user.email}</span>
              <button
                onClick={handleLogout}
                className="hover:underline text-red-200 ml-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
