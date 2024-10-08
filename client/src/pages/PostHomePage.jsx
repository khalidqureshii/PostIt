import React from "react";
import PostHome from "../components/PostHome";
import '../App.css';

function PostHomePage() {
  return (
    <div className="App min-h-screen flex flex-col bg-custom">
      <PostHome />
    </div>
  );
}

export default PostHomePage;