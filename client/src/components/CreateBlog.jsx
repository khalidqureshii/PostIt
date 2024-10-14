import React, { useState } from "react";
import InputArea from "./InputArea";
import { useNavigate } from "react-router-dom";
import { User, PenTool, LogOut, ChevronDown, Home, FileText } from 'lucide-react';
import { useAuth } from "../store/Auth";
import Button from './ui/Button';

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
    navigate('/logout');
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 text-slate-800 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            <h1 
              className="text-slate-800 text-4xl font-bold tracking-tight cursor-pointer"
              onClick={() => navigate('/posthome')}
            >
              Post-it
            </h1>
            <div className="flex items-center space-x-6">
              {/* Profile Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white/50 text-slate-800 hover:bg-white/70 hover:text-orange-600 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-3 px-6 text-lg"
                >
                  <User className="h-5 w-5 mr-2" />
                  <span className="mr-1">Profile</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-slate-100 animate-fadeIn">
                    <button
                      onClick={() => navigate('/posthome')}
                      className="flex items-center w-full px-4 py-2 text-slate-700 hover:bg-orange-50 transition-colors duration-200"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </button>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center w-full px-4 py-2 text-slate-700 hover:bg-orange-50 transition-colors duration-200"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Your Posts
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-slate-700 hover:bg-orange-50 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-orange-400 to-amber-300 flex items-center justify-center">
            <PenTool className="h-16 w-16 text-white opacity-30" />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Create a New Post
            </h1>

            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-slate-700 text-lg font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={changeFunction}
                placeholder="Enter your post title"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
              />
            </div>

            {/* Content Input */}
            <div className="mb-6">
              <label className="block text-slate-700 text-lg font-medium mb-2">
                Content
              </label>
              <textarea
                name="body"
                value={formData.body}
                onChange={changeFunction}
                placeholder="Write your post content"
                rows="8"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
              />
            </div>

            {/* Tags Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-slate-700 mb-3">Select Tags</h2>
              <div className="flex flex-wrap gap-3">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      formData.tags.includes(tag)
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-orange-500 hover:bg-orange-100 border border-orange-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-3 px-8 text-lg"
              >
                <PenTool className="mr-2 h-5 w-5" />
                Post It
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;