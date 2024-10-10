import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Home, PenTool, Menu, Crown, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
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

        {/* Main content */}
        <div className="flex-1 p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex items-center"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full mr-4 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">U</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Welcome back, User!</h2>
                <p className="text-slate-600">Here's what's happening with your blog</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Your Posts</h3>
              <p className="text-slate-600 mb-4">Manage and view your blog posts</p>
              
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2 text-slate-800">Getting Started with React</h4>
                <p className="text-slate-600 text-sm mb-1">2023-06-15</p>
                <p className="text-slate-700">Learn the basics of React and start building your first component.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;