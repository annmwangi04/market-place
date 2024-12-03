import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/Firebase";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Products from "./components/Products";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return (
    <Router>
      <div>
        {user && <Navbar user={user} />}  {/* Pass the user object to Navbar */}
        
        <section>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
};


export default App;