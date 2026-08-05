import React from "react";
import { useDispatch } from "react-redux";

import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice"
import { useNavigate } from "react-router-dom";
function LogoutBtn() {
  // dispatch sends action to Redux
  const dispatch = useDispatch();
const navigate = useNavigate();
const logoutHandler = async () => {
    await authService.logout();
    dispatch(logout());
    navigate("/login");
}
  return (
    <button
      className="px-5 py-2
      rounded-xl
      bg-red-500
      text-white
      font-semibold
      shadow-md
      hover:bg-red-600
      transition-all
      duration-300"
      onClick={logoutHandler}
    >
      
      <span> Logout</span>
    </button>
  );
}

export default LogoutBtn;
