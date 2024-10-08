import '../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LINK from '../store/Link';
import useAuth from '../store/Auth';

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


function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  const currUserID = user._id;
  console.log(currUserID);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postLoaded, setPostLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {

        console.log(JSON.stringify({userID: currUserID}));
        try {
          const response = await fetch(LINK + "api/blog/getUserBlogs", {
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({userID: currUserID})
          })
            const data = await response.json();
            setPosts(data.allEntries);
            setPostLoaded(true);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    fetchPosts();
  }, [user]);
  

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };
  
  const closePost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundSVG />

      <main className="container mx-auto px-6 pt-28 pb-20 max-w-4xl">
        <div className="grid gap-8">
          {(!postLoaded) ? (<h1>Please Wait...</h1>) : (posts.map((post) => (
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
                </div>
                <p className="text-[#8B4513] mb-4">
                  By <span className="font-medium">{post.username}</span>
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
          )))}
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
                X
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[#8B4513]">By <span className="font-medium">{selectedPost.username}</span></p>
              </div>
              <div className="prose prose-brown max-w-none">
                {selectedPost.body.split('\n').map((paragraph, index) => (
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

export default DashboardPage;