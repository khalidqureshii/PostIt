import React, { useState } from "react";
import { Check, Star, X } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

// Custom Card components
const Card = ({ className, children }) => (
    <div className={`bg-white/30 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl border border-white/50 overflow-hidden ${className}`}>
      {children}
    </div>
  );
  
  const CardHeader = ({ children }) => <div className="p-6">{children}</div>;
  const CardContent = ({ className, children }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
  const CardTitle = ({ className, children }) => <h3 className={`text-xl font-semibold mb-2 ${className}`}>{children}</h3>;
  const CardDescription = ({ className, children }) => <p className={`text-sm text-slate-600 ${className}`}>{children}</p>;
  
  // Custom Button component
  const Button = ({ className, children, ...props }) => (
    <button 
      className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
  
  export default function Component() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const displayName = user ? `, ${user.username}` : "";
    const navigate = useNavigate();
    
    return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-orange-100 text-slate-800 font-sans">
      <nav className="bg-rgb(255 251 235) shadow-md">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center  h-16">
          <Button variant="ghost" className="text-slate-800 hover:text-orange-600 transition-colors duration-300"
          onClick={() => navigate('/dashboard')}>
                    <h1>Back</h1>
                  </Button>
            <h1 className="text-slate-800 text-2xl font-bold tracking-tight hover:text-orange-600 transition-colors duration-300">
              Post-it
            </h1>
          </div>
        </div>
      </nav>
      <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-16 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-orange-600">Post-it Premium</h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto">
            Elevate your blogging experience with exclusive features and priority support.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {[
            ["Advanced Analytics", "Gain deep insights into your audience and content performance."],
            ["Custom Themes", "Create a unique look for your blog with premium themes and customization options."],
            ["Ad-Free Experience", "Provide your readers with a clean, distraction-free reading environment."],
            ["Priority Support", "Get faster responses and dedicated assistance from our support team."],
            ["Collaboration Tools", "Invite co-authors and manage your team with advanced permissions."],
            ["Monetization Options", "Unlock tools to help you earn from your content through subscriptions and tips."]
          ].map(([title, description], index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <FeatureCard title={title} description={description} />
            </motion.div>
        ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-900">Free vs Premium Comparison</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ComparisonCard title="Free" price="$0" buttonText="Current Plan" buttonVariant="outline">
              <ComparisonItem feature="Basic Analytics" included />
              <ComparisonItem feature="Standard Themes" included />
              <ComparisonItem feature="Ad-Supported" included />
              <ComparisonItem feature="Community Support" included />
              <ComparisonItem feature="Single Author" included />
              <ComparisonItem feature="Limited Storage" included />
              <ComparisonItem feature="Advanced Analytics" />
              <ComparisonItem feature="Custom Themes" />
              <ComparisonItem feature="Ad-Free Experience" />
              <ComparisonItem feature="Priority Support" />
              <ComparisonItem feature="Collaboration Tools" />
              <ComparisonItem feature="Monetization Options" />
            </ComparisonCard>
            <ComparisonCard title="Premium" price="Rs. 30/month" buttonText="Upgrade Now" buttonVariant="default">
              <ComparisonItem feature="Basic Analytics" included />
              <ComparisonItem feature="Standard Themes" included />
              <ComparisonItem feature="Ad-Supported" included />
              <ComparisonItem feature="Community Support" included />
              <ComparisonItem feature="Single Author" included />
              <ComparisonItem feature="Limited Storage" included />
              <ComparisonItem feature="Advanced Analytics" included />
              <ComparisonItem feature="Custom Themes" included />
              <ComparisonItem feature="Ad-Free Experience" included />
              <ComparisonItem feature="Priority Support" included />
              <ComparisonItem feature="Collaboration Tools" included />
              <ComparisonItem feature="Monetization Options" included />
            </ComparisonCard>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-md mx-auto mb-12"
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Premium Subscription</CardTitle>
              <CardDescription className="text-slate-300">Unlock all premium features</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold mb-4">Rs. 30<span className="text-xl font-normal">/month</span></div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">What Our Premium Users Say</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="Post-it Premium has transformed my blogging workflow. The analytics alone are worth the subscription!"
              author="Sarah J."
            />
            <TestimonialCard
              quote="The ad-free experience and custom themes have helped me create a professional-looking blog that my readers love."
              author="Michael T."
            />
            <TestimonialCard
              quote="As a team of writers, the collaboration tools have been a game-changer for our publication."
              author="Emily R."
            />
          </div>
        </motion.div>

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
  )
}

function FeatureCard({ title, description }) {
  return (
    <Card className="hover:transform hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Check className="text-orange-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-700">{description}</p>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ quote, author }) {
  return (
    <Card className="hover:transform hover:-translate-y-1 transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <blockquote className="text-center mb-4 text-slate-700">"{quote}"</blockquote>
        <p className="text-center font-semibold text-slate-900">- {author}</p>
      </CardContent>
    </Card>
  )
}

function ComparisonCard({ title, price, buttonText, buttonVariant, children }) {
  return (
    <Card className="hover:transform hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-slate-900">{title}</CardTitle>
        <CardDescription className="text-center text-xl font-bold text-orange-600">{price}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {children}
        </ul>
        <Button 
          className={`w-full ${buttonVariant === 'default' ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white' : 'border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}

function ComparisonItem({ feature, included = false }) {
  return (
    <li className="flex items-center gap-2">
      {included ? (
        <Check className="text-orange-600" />
      ) : (
        <X className="text-slate-400" />
      )}
      <span className={included ? "font-medium text-slate-900" : "text-slate-600"}>{feature}</span>
    </li>
  )
}