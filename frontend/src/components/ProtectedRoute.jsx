import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();  

  useEffect(() => {
    async function fun() {
      const isLoggedIn = JSON.parse(
        localStorage.getItem("login") || "false"
      );

      if (!isLoggedIn) {
        await navigate("/login");
      }
    }
    fun();
  });

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
