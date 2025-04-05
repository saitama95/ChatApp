import { useState,useEffect } from 'react'
import {Routes,Route ,Navigate} from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { Loader } from 'lucide-react';
import { Toaster } from "react-hot-toast";
import './App.css'

//component
import Navbar from '../components/Navbar'
//pages
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { LoginPage } from '../pages/LoginPage';
import { SettingPage } from '../pages/Settingpage';
import { ProfilePage } from '../pages/ProfilePage';

function App() {
  const {authUser ,checkAuth, isCheckingAuth ,onlineUsers} = useAuthStore();
  const  { theme } =useThemeStore();
  useEffect(() => {
   checkAuth();
  }, []);

  console.log({onlineUsers});
  console.log({authUser});
//
  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  );
  return (
    <div data-theme={theme}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={ authUser ? <HomePage/> : <Navigate to="/login" />  }/>
        <Route path="/signup" element={  !authUser ?  <SignUpPage/> : <Navigate to="/" /> }/>
        <Route path="/login" element={ !authUser ? <LoginPage/> : <Navigate to="/" /> }/>
        <Route path="/setting" element={ <SettingPage/>  }/>
        <Route path="/profile" element={ authUser ? <ProfilePage/> : <Navigate to="/" /> }/>
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
