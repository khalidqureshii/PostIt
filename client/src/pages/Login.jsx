import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
import LINK from "../store/Link";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import  Button  from "@/components/ui/button.jsx";

function Login() {
    const navigate = useNavigate();
    const currToken = localStorage.getItem("token");
    const [user, setUser] = useState({ email: "", password: "" });
    const { storeTokenInLS } = useAuth();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (currToken) {
            navigate("/");
        }
    }, [currToken, navigate]);

    function updateUser(event) {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    }

    async function storeData() {
        setLoading(true);
        try {
            const response = await fetch(LINK + "api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                toast.success("Successfully Logged in");
                await storeTokenInLS(data.token);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-orange-100 text-slate-800 font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="text-slate-800 text-2xl font-bold tracking-tight hover:text-orange-600 transition-colors duration-300 cursor-pointer"
                            onClick={() => navigate("/")}>
                            Post-it
                        </h1>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="max-w-md mx-auto relative z-10">
                    {!currToken && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50"
                        >
                            <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Welcome Back</h1>
                            
                            {/* Email Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={updateUser}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-white/50"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={updateUser}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-white/50"
                                />
                            </div>

                            {/* Login Button */}
                            <Button
                                onClick={storeData}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-6 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-6"
                            >
                                Login
                            </Button>

                            {/* Register Link */}
                            <div className="text-center">
                                <p className="text-slate-600 mb-4">Don't have an account?</p>
                                <Button
                                    variant="outline"
                                    onClick={() => navigate("/register")}
                                    className="w-full border-2 border-slate-800 text-slate-800 px-6 py-6 rounded-xl text-lg font-semibold hover:bg-slate-800 hover:text-white transition-all duration-300"
                                >
                                    Register
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Decorative Background Elements */}
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

export default Login;