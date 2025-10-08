import React from "react"
import { Navigate, Route,Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { useAuthStore } from "./zustand/authStore"
import { useEffect } from "react";
import { Loader, LogIn } from "lucide-react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analyze from "./pages/Analyze";
function App() {
  const {getMe,isCheckingAuth,authUser}=useAuthStore();

  useEffect(()=>{
    getMe();
  },[getMe]);
  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/analyze' element={!authUser ? <Navigate to="/login"/>:<Analyze/>} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/register' element={!authUser ? <Register /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
