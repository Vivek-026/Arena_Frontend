import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../api/loginApi";
import { authLogin } from "../auth/auth-slice";
import { useDispatch } from "react-redux";

function Login(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onSubmit=async ()=>{
        const data={
            email:email,
            password:password
        }
        const response = await login(data);
        const token = response.data.data.token;
        dispatch(authLogin(response.data.data));
        

        if(token){
            alert('successfully login')
            navigate('/')

        }
        


        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            
            <div className="relative bg-white/80 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl border border-white/20 p-8 transform transition-all duration-300 hover:shadow-3xl">
                <div className="text-center mb-8">
                    <div className="mb-6">
                        <div className="relative inline-block">
                            <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 relative">
                                ARENA
                            </h1>
                            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-full transform scale-x-75"></div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 text-sm">Sign in to your account</p>
                </div>

                <div className="space-y-6">
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition-all duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm font-medium">Email Address</label>
                    </div>

                    <div className="relative mt-6">
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition-all duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm font-medium">Password</label>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="relative mt-8">
                        <button 
                            onClick={onSubmit}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-lg"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;