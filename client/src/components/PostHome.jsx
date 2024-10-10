import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, X, Pen, Users, BookOpen, PenTool, Filter } from 'lucide-react';
import { User } from 'lucide-react';
import Button from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import LINK from "../store/Link"

// Extended posts data with content
// const allTags = ["Technology", "Health", "Lifestyle", "Education", "Productivity"];

// const initialPosts = [
//   {
//     id: 1,
//     title: "Getting Started with React",
//     author: "John Doe",
//     likes: 15,
//     tags: ["React", "JavaScript"],
//     content: `React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll walk through the fundamentals of React and help you get started with your first React application.

//     Key topics we'll cover:
//     • Understanding components and props
//     • State management basics
//     • Handling events in React
//     • Component lifecycle methods
//     • Best practices for React development

//     Whether you're new to web development or an experienced developer looking to add React to your toolkit, this guide will help you build a solid foundation in React development.`,
//   },
//   {
//     id: 2,
//     title: "The Art of Productive Procrastination",
//     author: "Jane Smith",
//     likes: 8,
//     tags: ["Productivity", "Lifestyle"],
//     content: `We often think of procrastination as the enemy of productivity, but what if we could turn it into an ally? This post explores the concept of productive procrastination and how to make it work for you.

//     Learn how to:
//     • Channel procrastination energy effectively
//     • Use structured procrastination to complete important tasks
//     • Build a productivity system that works with your natural tendencies
//     • Transform procrastination into a strategic tool

//     Discover how to make procrastination work for you instead of against you.`,
//   },
// ];

export default function PostHome() {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  // const [likedPosts, setLikedPosts] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  // const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
          const response = await fetch(LINK + "api/blog/getBlogs", {
            method:"GET",
            headers: {
              "Content-Type": "application/json"
            }
            
          })
            const data = await response.json();
            setPosts(data.allEntries);
            setPostLoaded(true);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    fetchPosts();
  }, []);


  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  const handleLike = (e, postId) => {
    e.stopPropagation();
    setPosts(currentPosts => currentPosts.map(post => 
      post.id === postId ? { ...post, likes: likedPosts[postId] ? post.likes - 1 : post.likes + 1 } : post
    ));
    setLikedPosts(current => ({ ...current, [postId]: !current[postId] }));
  };

  const handleTagClick = (tag) => {
    setSelectedTags(current => 
      current.includes(tag)
        ? current.filter(t => t !== tag)
        : [...current, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 text-slate-800 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            <h1 className="text-slate-800 text-4xl font-bold tracking-tight">
              Post-it
            </h1>
            <div className="flex items-center space-x-6">
              <Button
                variant="outline"
                className="bg-white/50 text-slate-800 hover:bg-white/70 hover:text-orange-600 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-3 px-6 text-lg"
                onClick={() => navigate('/dashboard')}
              >
                <User className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-3 px-6 text-lg"
                onClick={() => navigate('/createblog')}
              >
                <PenTool className="mr-3 h-5 w-5" />
                <span>New Post</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tag Filtering Section */}
      {/* <div className="container mx-auto px-6 pt-32">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Filter className="mr-2" /> Filter by Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedTags.includes(tag)
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-orange-500 hover:bg-orange-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12 text-slate-800"
        >
          Discover Inspiring Posts
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => handlePostClick(post)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="h-48 bg-gradient-to-r from-orange-400 to-amber-300 flex items-center justify-center">
                <span className="text-6xl text-white opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                  {post.title[0].toUpperCase()}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-800 group-hover:text-orange-600 transition-colors duration-300">{post.title}</h3>
                <p className="text-slate-600 mb-4 text-sm">By {post.username}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* <button 
                    onClick={(e) => handleLike(e, post.id)} 
                    className="flex items-center text-slate-500 hover:text-orange-600 transition-colors duration-300"
                  >
                    <Heart className={`h-5 w-5 mr-1 ${likedPosts[post.id] ? 'fill-orange-500 text-orange-500' : 'stroke-current'}`} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => handlePostClick(post)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            ></motion.div>
          ))}
        </div> */}
        
        {/* Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={closePost}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-40 bg-gradient-to-r from-orange-400 to-amber-300 flex items-center justify-center relative">
                  <span className="text-8xl text-white opacity-30">
                    {selectedPost.title[0].toUpperCase()}
                  </span>
                  <Button variant="ghost" onClick={closePost} className="absolute top-4 right-4 text-white hover:bg-white/20">
                    X
                  </Button>
                </div>
                <div className="p-8 overflow-y-auto max-h-[calc(80vh-10rem)]">
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">{selectedPost.title}</h2>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-slate-600">By <span className="font-medium">{selectedPost.username}</span></p>
                    {/* <button 
                      onClick={(e) => handleLike(e, selectedPost.id)} 
                      className="flex items-center text-slate-500 hover:text-orange-600 transition-colors duration-300"
                    >
                      <Heart className={`h-5 w-5 mr-1 ${likedPosts[selectedPost.id] ? 'fill-orange-500 text-orange-500' : 'stroke-current'}`} />
                      <span className="font-medium">{selectedPost.likes}</span>
                    </button> */}
                  </div>
                  <div className="prose prose-slate max-w-none mb-6">
                    {selectedPost.body.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-slate-700 leading-relaxed">{paragraph.trim()}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {selectedPost.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
