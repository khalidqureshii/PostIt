import React from "react";
import PostHome from "../components/PostHome";
import '../App.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PostHomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, changeLogin] = useState(hasLoggedIn());
    function hasLoggedIn() {
        const currToken = localStorage.getItem("token");
        if (currToken == null) return false;
        else return true;
    }

    useEffect(() => {
        if (isLoggedIn) {
            
        }
        else {
          navigate("/login");
        }
    }, [isLoggedIn]);
  return (
    <div className="App min-h-screen flex flex-col bg-custom">
      <PostHome />
    </div>
  );
}

export default PostHomePage;