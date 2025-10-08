import {create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set,get)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth:true,
    getMe:async ()=>{
        try {
            const res=await axiosInstance.get("/auth/me");
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({isCheckingAuth:false});
        }
    },
    signup:async (data)=>{
        try {
            set({isSigningUp:true});
            const res = await axiosInstance.post("/auth/signup",data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSigningUp:false});
        }
    },
    login:async(data)=>{
        try {
            set({isLoggingIn:true});
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Login successfull");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isLoggingIn:false});
        }
    },
    logout:async()=>{
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logout successfull");
        }catch (error) {
            toast.error(error.response.data.message);
        } 
    }
}));