import React, { useState } from "react";
import InputArea from "./InputArea";
import BlogEntry from "../../../server/models/blog-model";
import { useNavigate } from "react-router-dom";
import '../App.css';
import { useAuth } from "../store/Auth";
import { User, Home, FileText, LogOut, ChevronDown } from 'lucide-react';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currUserID = user._id;
  const currUsername = user.username;
  const allTags = ["Technology", "Health", "Lifestyle", "Education", "Travel", "Sports", "Food", "Fitness", "Business", "Others"];
  const [formData, setFormData] = useState({
    userID: currUserID,
    username: currUsername,
    title: "",
    body: "",
    tags: []
  });

  const changeFunction = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleTag = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter(t => t !== tag),
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  async function handleSubmit() {
    const { title, body, tags } = formData;
    if (!title || !body || tags.length === 0) {
      alert("Please fill in all fields: Title, Content, and select at least one Tag.");
      return;
    }

    const postData = {
      ...formData,
      userID: currUserID,
      username: currUsername,
    };

    try {
      const response = await fetch("http://localhost:5000/api/blog/newBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        alert("Post submitted successfully!");
        navigate("/dashboard");
      } else {
        console.error("Error:", result);
        alert("Failed to submit the post");
      }
    } catch (error) {
      console.error("Error submitting the post:", error);
      alert("Failed to submit the post due to a network error");
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Header with Profile Icon */}
      <header className="fixed top-0 w-full bg-[#D8B395]/90 backdrop-blur-sm shadow-lg z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#8B4513] tracking-tight">
              <span className="relative group cursor-pointer" onClick={() => navigate('/posthome')}>
                PostIt
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>
            </h1>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-[#8B4513] hover:bg-[#E8D0B8]
                        transition-all duration-300 hover:scale-105"
              >
                <User className="h-5 w-5" />
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50
                              border border-[#D8B395]/20 animate-fadeIn">
                  <button
                    onClick={() => navigate('/posthome')}
                    className="flex items-center w-full px-4 py-2 text-[#8B4513] hover:bg-[#E8D0B8]/20
                              transition-colors duration-200"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center w-full px-4 py-2 text-[#8B4513] hover:bg-[#E8D0B8]/20
                              transition-colors duration-200"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Your Posts
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-[#8B4513] hover:bg-[#E8D0B8]/20
                              transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex justify-center items-center min-h-screen m-10 pt-20">
        <div className="w-full max-w-[73%] bg-white outer-shadow p-8 rounded-xl shadow-lg bodyColor">
          <h1 className="text-3xl mb-4 text-center text-black font-cambria font-bold">
            Create a New Blog
          </h1>
          <InputArea
            text="Title"
            name="title"
            value={formData.title}
            changeFunction={changeFunction}
            placeholder="Enter Blog Title"
            rows={2}
            cols={180}
            className="text-pink-800" // Added dark pink color for the title
          />
          <InputArea
            text="Content"
            name="body"
            value={formData.body}
            changeFunction={changeFunction}
            placeholder="Enter Blog Content"
            rows={9}
            cols={180}
            className="text-pink-800" // Added dark pink color for the content
          />
          {/* Tag selection */}
          <div className="mb-4 ml-7">
            <h2 className="text-xl text-black mb-2">Select Tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`px-4 py-2 border text-md border-gray-400 rounded-lg transition-colors duration-200 ${formData.tags.includes(tag) ? 'inputArea text-black button-shadow' : 'bg-white text-black'}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center text-xl font-bold">
            <button
              type="submit"
              className="customButton w-30"
              onClick={handleSubmit}
            >
              Post-It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
