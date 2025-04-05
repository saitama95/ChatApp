import React, { useState } from 'react';
import { EyeOff, Eye ,Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';

export const LoginPage = () => {
  
  const [showpassword,setShowPassword] = useState(false);
  const [formdata,setformdata] = useState({
    email:"",
    password:""
  })

  const { login , isLoggingIng } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formdata);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">
                <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formdata.email}
              onChange={(e) => setformdata({...formdata,email:e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 relative">
            <label className="label">
                <span className="label-text font-medium">Password</span>
            </label>
            <input
              type={showpassword ? "text" : "password"}
              id="password"
              name="password"
              value={formdata.password}
              onChange={(e) => setformdata({...formdata,password:e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                <button type="button" 
                  className="absolute top-5 inset-y-0 right-0 pr-3 flex items-center"
                  onClick={()=>setShowPassword(!showpassword)}
                  >
                  {
                      !showpassword ? (
                          <EyeOff className="size-5 text-base-content/40"/>
                      ):(
                          <Eye className="size-5 text-base-content/40"/>
                      )
                  }
                </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            disabled={isLoggingIng}
          >
            {
              isLoggingIng ? (
                <div className='flex items-center justify-center'>
                  <Loader2 className="size-5 animate-spin"/>
                </div>
              ):(
                "Login"
              )
            }
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};