import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, X } from 'lucide-react';
import { User } from 'lucide-react';

// Extended posts data with content
const initialPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "John Doe",
    likes: 15,
    tags: ["React", "JavaScript"],
    content: `React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll walk through the fundamentals of React and help you get started with your first React application.

    Key topics we'll cover:
    • Understanding components and props
    • State management basics
    • Handling events in React
    • Component lifecycle methods
    • Best practices for React development

    Whether you're new to web development or an experienced developer looking to add React to your toolkit, this guide will help you build a solid foundation in React development.`
  },
  {
    id: 2,
    title: "The Art of Productive Procrastination",
    author: "Jane Smith",
    likes: 8,
    tags: ["Productivity", "Lifestyle"],
    content: `We often think of procrastination as the enemy of productivity, but what if we could turn it into an ally? This post explores the concept of productive procrastination and how to make it work for you.

    Learn how to:
    • Channel procrastination energy effectively
    • Use structured procrastination to complete important tasks
    • Build a productivity system that works with your natural tendencies
    • Transform procrastination into a strategic tool

    Discover how to make procrastination work for you instead of against you.`
  }
];

const BackgroundSVG = () => (
  <svg className="fixed inset-0 w-full h-full -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#ffeee4"}} />
        <stop offset="100%" style={{stopColor:"#fff5ef"}} />
      </linearGradient>
      <path id="wave" d="M 0,50 C 150,0 350,100 500,50 C 650,0 850,100 1000,50" />
    </defs>
    
    <rect width="100%" height="100%" fill="url(#bgGradient)" />
    
    <g opacity="0.3">
      <use href="#wave" stroke="#d4b5a5" fill="none" transform="translate(0,0)" />
      <use href="#wave" stroke="#d4b5a5" fill="none" transform="translate(0,400)" />
    </g>
    
    <path d="M 900,50 C 920,40 930,60 920,70 C 910,80 890,70 900,50" 
          fill="none" stroke="#d4b5a5" opacity="0.4" />
    <path d="M 100,500 C 120,490 130,510 120,520 C 110,530 90,520 100,500" 
          fill="none" stroke="#d4b5a5" opacity="0.4" />
    
    <g opacity="0.5">
      <path d="M 150,150 l 5,-5 l -5,-5 l -5,5 z" fill="#d4b5a5" />
      <path d="M 850,450 l 5,-5 l -5,-5 l -5,5 z" fill="#d4b5a5" />
    </g>
  </svg>
);

export default function PostHome() {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [likedPosts, setLikedPosts] = useState({});

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  const handleLike = (e, postId) => {
    e.stopPropagation(); // Prevent post modal from opening when clicking like
    
    setPosts(currentPosts => {
      return currentPosts.map(post => {
        if (post.id === postId) {
          const isCurrentlyLiked = likedPosts[postId];
          const newLikes = isCurrentlyLiked ? post.likes - 1 : post.likes + 1;
          return { ...post, likes: newLikes };
        }
        return post;
      });
    });

    setLikedPosts(current => ({
      ...current,
      [postId]: !current[postId]
    }));
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundSVG />
      
      <header className="fixed top-0 w-full bg-[#D8B395]/90 backdrop-blur-sm shadow-lg z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#8B4513] tracking-tight">
              <span className="relative group">
                PostIt
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>
            </h1>
            <div className="flex gap-4">
              <button 
                className="px-4 py-2 rounded-full border border-[#8B4513] text-[#8B4513] 
                          hover:bg-[#E8D0B8] hover:border-transparent
                          transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/createblog')}
              >
                Add Blog
              </button>
              <button 
                className="p-2 rounded-full text-[#8B4513] hover:bg-[#E8D0B8]
                          transition-all duration-300 hover:scale-105
                          flex items-center justify-center"
                onClick={() => navigate('/dashboard')}
              >
                <User size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 pb-20 max-w-4xl">
        <div className="grid gap-8">
          {posts.map((post) => (
            <div key={post.id} 
              onClick={() => handlePostClick(post)}
              className="group relative overflow-hidden cursor-pointer
                         bg-white border-none rounded-lg shadow-md
                         hover:shadow-xl hover:shadow-[#8B4513]/30
                         transition-all duration-500 ease-out
                         hover:-translate-y-1 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E8D0B8]/0 via-[#E8D0B8]/10 to-[#E8D0B8]/0
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-semibold text-[#8B4513] mb-3 
                               transition-colors duration-300 group-hover:text-[#654321]">
                    {post.title}
                  </h2>
                  <button 
                    onClick={(e) => handleLike(e, post.id)}
                    className="flex items-center text-[#8B4513] space-x-2
                              transition-transform duration-300 group-hover:scale-110"
                  >
                    <Heart 
                      className={`h-5 w-5 mr-1 transition-colors duration-300
                                ${likedPosts[post.id] ? 'fill-current text-[#D8B395]' : 'group-hover:text-[#D8B395]'}`} 
                    />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                </div>
                <p className="text-[#8B4513] mb-4">
                  By <span className="font-medium">{post.author}</span>
                </p>
                <div className="flex gap-2 mt-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} 
                      className="px-3 py-1 rounded-full text-xs font-medium
                               bg-[#D8B395] text-[#8B4513]
                               transition-all duration-300
                               hover:bg-[#E8D0B8] hover:scale-105">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#D8B395] p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#8B4513]">{selectedPost.title}</h2>
              <button 
                onClick={closePost}
                className="text-[#8B4513] hover:text-[#654321] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[#8B4513]">By <span className="font-medium">{selectedPost.author}</span></p>
                <button 
                  onClick={(e) => handleLike(e, selectedPost.id)}
                  className="flex items-center text-[#8B4513]"
                >
                  <Heart 
                    className={`h-5 w-5 mr-1 transition-colors duration-300
                              ${likedPosts[selectedPost.id] ? 'fill-current text-[#D8B395]' : 'hover:text-[#D8B395]'}`}
                  />
                  <span className="text-sm font-medium">{selectedPost.likes}</span>
                </button>
              </div>
              <div className="prose prose-brown max-w-none">
                {selectedPost.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-[#8B4513] leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} 
                    className="px-3 py-1 rounded-full text-xs font-medium
                             bg-[#D8B395] text-[#8B4513]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}