import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle errors

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login"); // Redirect to login after successful signup
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = getErrorMessage(errorCode); // Map error codes to messages
        setError(errorMessage); // Set error message
        console.log(errorCode, errorMessage);
      });
  };

  // Function to map Firebase error codes to user-friendly messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already in use. Please use a different one.";
      case "auth/invalid-email":
        return "Invalid email format. Please check and try again.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h1>

        {/* Display error message if present */}
        {error && (
          <p className="mb-4 text-sm text-center text-red-500 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-600"
            >
              Email address
            </label>
            <input
              type="email"
              id="email-address"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Sign in
          </NavLink>
        </p>
      </section>
    </main>
  );
};

export default Signup;