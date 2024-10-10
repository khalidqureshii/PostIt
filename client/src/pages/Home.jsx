import React, { useState } from "react";
import { FaPen, FaUsers, FaBookOpen, FaArrowRight, FaGithub } from "react-icons/fa";
import  Button  from "@/components/ui/button.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const displayName = user ? `, ${user.username}` : "";
  const navigate = useNavigate();

  const handleStartWriting = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Start writing clicked");
      navigate("/posthome");  // Make sure navigate is called here
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-orange-100 text-slate-800 font-sans">
      {/* Navbar - Improved with solid background */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-rgb(255 251 235) shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-slate-800 text-2xl font-bold tracking-tight hover:text-orange-600 transition-colors duration-300">
              Post-it
            </h1>
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <>
                  <Button variant="ghost" className="text-slate-800 hover:text-orange-600 transition-colors duration-300">
                    Profile
                  </Button>
                  <Button variant="ghost" className="text-slate-800 hover:text-orange-600 transition-colors duration-300">
                    Dashboard
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the component remains the same until the CTA section */}
      <div className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="space-y-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-slate-900 text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-orange-600"
            >
              Welcome{displayName}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed"
            >
              Start your creative journey with a simple click. Write, share, and inspire.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center gap-6"
            >
              <Button   
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-7 rounded-full text-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
                onClick={handleStartWriting}
              >
                Start Writing
              </Button>
              <Button
                variant="outline"
                className="px-10 py-7 rounded-full text-xl font-semibold border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto mt-40">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-slate-900">Why Choose Post-it?</h2>
          <div className="grid md:grid-cols-3 gap-8 px-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/30 backdrop-blur-md rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/50"
              >
                <feature.icon className="w-12 h-12 mb-6 text-orange-600" />
                <h3 className="text-xl font-semibold mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-700 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section - Fixed button text alignment */}
        <div className="max-w-4xl mx-auto mt-40 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Start Writing?</h2>
            <p className="text-xl mb-8 text-slate-300">Join thousands of writers who trust Post-it for their creative journey.</p>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-6 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <span>Get Started</span>
              <FaArrowRight />
            </Button>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-40 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {["Product", "Company", "Resources", "Legal"].map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-6 text-slate-900">{section}</h3>
                  <ul className="space-y-3">
                    {["Features", "About", "Community"].map((item, i) => (
                      <li key={i}>
                        <a href="#" className="text-slate-600 hover:text-orange-600 transition-colors duration-300">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-600">© 2024 Post-it. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-600 hover:text-orange-600 transition-colors duration-300">
                  <FaGithub className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-20 animate-pulse">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-orange-300">
            <path d="M44.9,-76.8C59.7,-69.8,74,-59.9,83.4,-46.3C92.8,-32.7,97.4,-16.3,97.8,0.2C98.2,16.7,94.4,33.4,85.6,47.3C76.8,61.2,63,72.3,47.6,79.9C32.2,87.5,15.2,91.7,-1.2,93.6C-17.6,95.5,-35.2,95.1,-50.7,88.1C-66.2,81.1,-79.5,67.5,-87.6,51.5C-95.7,35.5,-98.6,17.8,-97.7,0.5C-96.8,-16.8,-92.1,-33.5,-83.1,-47.8C-74.1,-62.1,-60.8,-73.9,-45.8,-80.6C-30.8,-87.3,-15.4,-88.9,0.3,-89.4C16,-89.9,30.1,-83.8,44.9,-76.8Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] translate-x-1/2 translate-y-1/2 opacity-20 animate-pulse">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-orange-300">
            <path d="M39.9,-65.7C54.1,-60.5,69.5,-53.8,77.9,-42.1C86.3,-30.4,87.6,-13.7,85.5,2C83.4,17.7,77.8,32.3,69.4,45.6C61,58.9,49.8,70.8,36.3,76.3C22.8,81.8,7,80.9,-8.1,77.8C-23.2,74.7,-37.7,69.4,-49.8,61C-61.9,52.6,-71.7,41.1,-77.7,27.6C-83.7,14.1,-85.9,-1.4,-83.2,-15.8C-80.5,-30.2,-72.9,-43.5,-61.8,-50.1C-50.7,-56.7,-36.1,-56.6,-23.5,-62.8C-10.9,-69,-5.5,-81.5,3.7,-87.9C12.8,-94.3,25.7,-94.6,39.9,-65.7Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Home;