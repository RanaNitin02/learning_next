"use client";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import React from "react";
import { NextResponse } from "next/server";
import { get } from "http";

const page = () => {

  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  
  const getUserData = async() => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      
    } catch (error: any) {
      return NextResponse.json({ message: "Error in fetching user data: " + error.message }, { status: 500 });
    }
  }

  const onLogout = async() => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfull");
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout failed. Please try again.");
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='pb-4'>Profile Page</h1> 
        <h2 className="p-1 rounded bg-green-600">
          { data === 'nothing' ? "No data" : 
            <Link href={`/profile/${data}`}>
              {data}
            </Link> 
          }
        </h2>
        <hr />
        <button 
          onClick={onLogout}
          className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition'>
          Logout
        </button>
        <button 
          onClick={getUserData}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600 transition'>
          Get User Details
        </button>
    </div>
  )
}

export default page