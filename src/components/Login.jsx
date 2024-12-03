import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./Firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const onLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = getErrorMessage(errorCode);
        setError(errorMessage); // Set the error message to display
        console.log(errorCode, errorMessage);
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = getErrorMessage(errorCode);
      setError(errorMessage);
      console.log(errorCode, errorMessage);
    }
  };

  // Function to map Firebase error codes to user-friendly messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email address. Please check and try again.";
      case "auth/user-disabled":
        return "This account has been disabled. Contact support.";
      case "auth/user-not-found":
        return "No account found with this email. Please sign up.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      default:
        return "An error occurred. Please try again later.";
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>

        {/* Show error message if exists */}
        {error && (
          <p className="mb-4 text-sm text-center text-red-500 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={onLogin}>
          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-600"
            >
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
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
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 mt-4 text-white bg-gray-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center"
          >
            <FcGoogle className="mr-2 text-2xl" /> {/* Google Icon */}
            Login with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          No account yet?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </NavLink>
        </p>
      </section>
    </main>
  );
};

export default Login;