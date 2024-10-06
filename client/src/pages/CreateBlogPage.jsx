import React from "react";
import CreateBlog from "../components/CreateBlog";
import '../App.css';

function CreateBlogPage() {
  return (
    <div className="App min-h-screen flex flex-col bg-custom">
      <CreateBlog />
    </div>
  );
}

export default CreateBlogPage;
