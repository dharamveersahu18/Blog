import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./component";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        console.log("Appwrite User:", userData);

        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
   <div className="min-h-screen flex flex-col bg-gray-100">

        <Header />
       <main className="bg-slate-900">
    <Outlet />
</main>
        <Footer />
      </div>
 
  ) : null;
}

export default App;
