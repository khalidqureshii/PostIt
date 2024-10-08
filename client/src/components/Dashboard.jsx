import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Search, FileText, BarChart2, Settings, Home } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="flex h-screen bg-rose-50">
      {/* Sidebar */}
      <div className="w-64 bg-white p-5 shadow-lg">
        <h1 className="text-2xl font-bold text-rose-400 mb-8">Post-it</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center text-gray-700 hover:text-rose-500">
                <FileText className="mr-2" size={20} />
                Posts
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-700 hover:text-rose-500">
                <BarChart2 className="mr-2" size={20} />
                Stats
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-700 hover:text-rose-500">
                <Settings className="mr-2" size={20} />
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-8">
          {/* Navigate to Home on click */}
          <button
            onClick={() => navigate('/posthome')} // Navigate to Home page
            className="flex items-center text-gray-700 hover:text-rose-500"
          >
            <Home className="mr-2" size={20} />
            Back to Home
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <h2 className="text-xl font-semibold">Welcome back, User!</h2>
              <p className="text-gray-600">Here's what's happening with your blog</p>
            </div>
          </div>
          <button className="bg-rose-400 text-white px-4 py-2 rounded-lg hover:bg-rose-500" onClick={() => navigate('/createblog')}>
            + New Post
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
          <p className="text-gray-600 mb-4">Manage and view your blog posts</p>
          
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Getting Started with React</h4>
            <p className="text-gray-600 text-sm mb-1">2023-06-15</p>
            <p className="text-gray-700">Learn the basics of React and start building your first component.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
