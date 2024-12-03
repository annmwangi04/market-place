/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === null) {
    return null; // Render nothing until the user state is determined
  }

  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;