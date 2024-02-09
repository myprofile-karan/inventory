import React from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.setItem("login", JSON.stringify(false));
    navigate("/login");
  };

  return (
    <div className="flex justify-center relative py-4 bg-white shadow-sm">
      <h1 className="text-3xl font-bold">Inventory Management App</h1>
      <button
        onClick={logoutHandle}
        className="bg-blue-700 absolute right-24 px-4 py-1 ms-10 rounded-md text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
