import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/Auth";
import LINK from "../store/Link";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion for animations
import Button from "@/components/ui/button.jsx";
import { FaPen, FaUsers, FaBookOpen, FaArrowRight, FaGithub } from "react-icons/fa";


const mockUser = {
    username: "Demo User"
  };

const features = [
    {
      title: "Write Anywhere",
      description: "Create and edit your posts from any device, anytime. Our responsive design ensures a seamless experience.",
      icon: FaPen
    },
    {
      title: "Collaborate",
      description: "Share your drafts with peers and get feedback in real-time. Writing is better together.",
      icon: FaUsers
    },
    {
      title: "Rich Content",
      description: "Support for markdown, images, and formatting tools to make your posts stand out.",
      icon: FaBookOpen
    }
  ];

  function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const displayName = user ? `, ${user.username}` : ""
    const [isLoading, setLoading] = useState(false)
  
    const handleStartWriting = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        console.log("Start writing clicked")
      }, 1000)
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 text-slate-800 font-sans">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <h1 className="text-slate-800 text-3xl font-bold tracking-tight">
                Post-it
              </h1>
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" className="text-slate-800 hover:text-slate-600">
                      Profile
                    </Button>
                    <Button variant="ghost" className="text-slate-800 hover:text-slate-600">
                      Dashboard
                    </Button>
                  </>
                ) : (
                  <>
                    {/* <Button variant="ghost" className="text-slate-800 hover:text-slate-600">
                      Login
                    </Button> */}
                    <Button className="bg-orange-600 text-white hover:bg-orange-700" 
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
  
        {/* Hero Section */}
        <div className="pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="max-w-4xl w-full mx-auto text-center relative z-10">
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-black text-5xl md:text-7xl font-bold tracking-tight leading-tight"
              >
                Welcome{displayName}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto"
              >
                Start your creative journey with a simple click. Write, share, and inspire.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center gap-4"
              >
                <Button
                  onClick={handleStartWriting}
                  className="bg-orange-600 text-white px-10 py-7 rounded-full text-xl font-semibold hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Start Writing"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="px-10 py-7 rounded-full text-xl font-semibold border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
  
          {/* Features Section */}
          <div className="max-w-7xl mx-auto mt-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Post-it?</h2>
            <div className="grid md:grid-cols-3 gap-8 px-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <feature.icon className="w-12 h-12 mb-6 text-orange-600" />
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-slate-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
  
          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-slate-800 text-white rounded-3xl p-12 shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Writing?</h2>
              <p className="text-xl mb-8 text-slate-300">Join thousands of writers who trust Post-it for their creative journey.</p>
              <Button className="bg-orange-600 text-white px-8 py-6 rounded-full text-lg font-semibold hover:bg-orange-700 transition-all duration-300">
                Get Started Now <FaArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
  
          {/* Footer */}
          <footer className="mt-32 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Product</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-orange-600">Features</a></li>
                    <li><a href="#" className="hover:text-orange-600">Pricing</a></li>
                    <li><a href="#" className="hover:text-orange-600">Documentation</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-orange-600">About</a></li>
                    <li><a href="#" className="hover:text-orange-600">Blog</a></li>
                    <li><a href="#" className="hover:text-orange-600">Careers</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-orange-600">Community</a></li>
                    <li><a href="#" className="hover:text-orange-600">Contact</a></li>
                    <li><a href="#" className="hover:text-orange-600">Support</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Legal</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-orange-600">Privacy</a></li>
                    <li><a href="#" className="hover:text-orange-600">Terms</a></li>
                    <li><a href="#" className="hover:text-orange-600">Cookie Policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
                <p className="text-sm text-slate-600">© 2024 Post-it. All rights reserved.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-600 hover:text-orange-600">
                    <FaGithub className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
  
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-30">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-orange-200">
              <path
                d="M44.9,-76.8C59.7,-69.8,74,-59.9,83.4,-46.3C92.8,-32.7,97.4,-16.3,97.8,0.2C98.2,16.7,94.4,33.4,85.6,47.3C76.8,61.2,63,72.3,47.6,79.9C32.2,87.5,15.2,91.7,-1.2,93.6C-17.6,95.5,-35.2,95.1,-50.7,88.1C-66.2,81.1,-79.5,67.5,-87.6,51.5C-95.7,35.5,-98.6,17.8,-97.7,0.5C-96.8,-16.8,-92.1,-33.5,-83.1,-47.8C-74.1,-62.1,-60.8,-73.9,-45.8,-80.6C-30.8,-87.3,-15.4,-88.9,0.3,-89.4C16,-89.9,30.1,-83.8,44.9,-76.8Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
  
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] translate-x-1/2 translate-y-1/2 opacity-30">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-orange-200">
              <path
                d="M39.9,-65.7C54.1,-60.5,69.5,-53.8,77.9,-42.1C86.3,-30.4,87.6,-13.7,85.5,2C83.4,17.7,77.8,32.3,69.4,45.6C61,58.9,49.8,70.8,36.3,76.3C22.8,81.8,7,80.9,-8.1,77.8C-23.2,74.7,-37.7,69.4,-49.8,61C-61.9,52.6,-71.7,41.1,-77.7,27.6C-83.7,14.1,-85.9,-1.4,-83.2,-15.8C-80.5,-30.2,-72.9,-43.5,-61.8,-50.1C-50.7,-56.7,-36.1,-56.6,-23.5,-62.8C-10.9,-69,-5.5,-81.5,3.7,-87.9C12.8,-94.3,25.7,-94.6,39.9,-65.7Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

export default Home;