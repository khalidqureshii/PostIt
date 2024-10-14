
import {useNavigate} from "react-router-dom";
import '../App.css';
import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import Button from "../components/ui/Button";
import LINK from "../store/Link"
import { Search, FileText, Home, PenTool, Menu, Crown, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../store/Auth';
import { MdDeleteForever } from "react-icons/md";

function DashboardPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchPosts = async () => {
    //console.log(user);
    const currUserID = user._id;
    // console.log(JSON.stringify({userID: currUserID}));
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

  useEffect(() => {    
    fetchPosts();
  }, [user]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  async function deletePost(props) {
    try {
      console.log(props._id);
      const response = await fetch(LINK + "api/blog/deleteBlog", {
        method:"DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({blogID: selectedPost._id})
      })
        const data = await response.json();
        console.log(data);
        setSelectedPost(null);
        fetchPosts();
    } catch (error) {
        console.error('Error Deleting post:', error);
    }
  }

  return (
    <div className="App min-h-screen flex flex-col bg-custom">
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 text-slate-800 font-sans">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-10 px-5 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <Menu size={24} className="text-slate-700" />
          </button>
          <h1 className="text-3xl font-bold text-slate-800 ml-3 tracking-tight">Post-it</h1>
        </div>
        
        <Button
          onClick={() => navigate('/createblog')}
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-3 px-6 text-sm"
        >
          <PenTool className="mr-2" size={16} />
          New Post
        </Button>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                onClick={toggleSidebar}
                className="fixed inset-0 bg-black z-20 lg:hidden"
              />
              
              {/* Sidebar */}
              <motion.div 
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed left-0 top-16 w-64 bg-white/80 backdrop-blur-md p-5 shadow-lg h-[calc(100vh-4rem)] z-30"
              >
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="flex items-center text-slate-700 hover:text-orange-600 transition-colors duration-300">
                        <FileText className="mr-2" size={20} />
                        Posts
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="flex items-center text-slate-700 hover:text-orange-600 transition-colors duration-300 bg-amber-50/50 p-2 rounded-lg"
                      >
                        <Crown className="mr-2 text-amber-500" size={20} />
                        <Button onClick={() => navigate('/premium')}>Post-it Premium</Button>
                        
                      </a>
                    </li>
                    
                  </ul>
                </nav>
                <div className="mt-8">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/posthome')}
                    className="bg-white/50 text-slate-800 hover:bg-white/70 hover:text-orange-600 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-2 px-4 text-sm w-full justify-center"
                  >
                    <Home className="mr-2" size={16} />
                    Back to Home
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/logout')}
                    className="bg-white/50 text-slate-800 hover:bg-white/70 hover:text-orange-600 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-2 px-4 text-sm w-full justify-center"
                  >
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="container mx-auto px-6 pb-20 mt-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12 text-slate-800"
        >
          Your Blogs
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
                  <button 
                    onClick={deletePost}
                    className="text-[#8B4513] hover:text-[#654321] transition-colors absolute top-4 right-8"
                  >
                    <MdDeleteForever size='1.65em' color="white"/>
                  </button>
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
    </div>
  );
    </div>
  );
}

export default DashboardPage;
// import {useNavigate} from "react-router-dom";
// import '../App.css';
// import React, { useState, useEffect } from 'react';
// import { User } from 'lucide-react';
// import Button from "../components/ui/Button";
// import LINK from "../store/Link"
// import { Search, FileText, Home, PenTool, Menu, Crown, LogOut } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// function DashboardPage() {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="App min-h-screen flex flex-col bg-custom">
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 text-slate-800 font-sans">
//       {/* Header */}
//       <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-10 px-5 py-4 flex items-center justify-between shadow-sm">
//         <div className="flex items-center">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
//           >
//             <Menu size={24} className="text-slate-700" />
//           </button>
//           <h1 className="text-3xl font-bold text-slate-800 ml-3 tracking-tight">Post-it</h1>
//         </div>
        
//         <Button
//           onClick={() => navigate('/createblog')}
//           className="bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-3 px-6 text-sm"
//         >
//           <PenTool className="mr-2" size={16} />
//           New Post
//         </Button>
//       </div>

//       <div className="flex pt-16">
//         {/* Sidebar */}
//         <AnimatePresence>
//           {isSidebarOpen && (
//             <>
//               {/* Overlay */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.3 }}
//                 exit={{ opacity: 0 }}
//                 onClick={toggleSidebar}
//                 className="fixed inset-0 bg-black z-20 lg:hidden"
//               />
              
//               {/* Sidebar */}
//               <motion.div 
//                 initial={{ x: -300 }}
//                 animate={{ x: 0 }}
//                 exit={{ x: -300 }}
//                 transition={{ duration: 0.3, ease: "easeInOut" }}
//                 className="fixed left-0 top-16 w-64 bg-white/80 backdrop-blur-md p-5 shadow-lg h-[calc(100vh-4rem)] z-30"
//               >
//                 <nav>
//                   <ul className="space-y-4">
//                     <li>
//                       <a href="#" className="flex items-center text-slate-700 hover:text-orange-600 transition-colors duration-300">
//                         <FileText className="mr-2" size={20} />
//                         Posts
//                       </a>
//                     </li>
//                     <li>
//                       <a 
//                         href="#" 
//                         className="flex items-center text-slate-700 hover:text-orange-600 transition-colors duration-300 bg-amber-50/50 p-2 rounded-lg"
//                       >
//                         <Crown className="mr-2 text-amber-500" size={20} />
//                         <Button onClick={() => navigate('/premium')}>Post-it Premium</Button>
                        
//                       </a>
//                     </li>
                    
//                   </ul>
//                 </nav>
//                 <div className="mt-8">
//                   <Button
//                     variant="outline"
//                     onClick={() => navigate('/posthome')}
//                     className="bg-white/50 text-slate-800 hover:bg-white/70 hover:text-orange-600 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-2 px-4 text-sm w-full justify-center"
//                   >
//                     <Home className="mr-2" size={16} />
//                     Back to Home
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => navigate('/logout')}
//                     className="bg-white/50 text-slate-800 hover:bg-white/70 hover:text-orange-600 transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center py-2 px-4 text-sm w-full justify-center"
//                   >
//                     <LogOut className="mr-2" size={16} />
//                     Logout
//                   </Button>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>

//         {/* Main content */}
//         <div className="flex-1 p-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="mb-8 flex items-center"
//           >
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full mr-4 flex items-center justify-center">
//                 <span className="text-2xl text-white font-bold">U</span>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-800">Welcome back, User!</h2>
//                 <p className="text-slate-600">Here's what's happening with your blog</p>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//           >
//             <div className="p-6">
//               <h3 className="text-xl font-semibold mb-4 text-slate-800">Your Posts</h3>
//               <p className="text-slate-600 mb-4">Manage and view your blog posts</p>
              
//               <div className="mb-4">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search posts..."
//                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
//                   />
//                   <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
//                 </div>
//               </div>

//               <div className="border-t pt-4">
//                 <h4 className="font-semibold mb-2 text-slate-800">Getting Started with React</h4>
//                 <p className="text-slate-600 text-sm mb-1">2023-06-15</p>
//                 <p className="text-slate-700">Learn the basics of React and start building your first component.</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
//     </div>
//   );
// }

// export default DashboardPage;
