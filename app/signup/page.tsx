"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'


const Signup = () => {

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: ""
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const router = useRouter();

  const onSignup = async() => {
        try {

          setLoading(true);
          const response = await axios.post("/api/users/signup", user)
          console.log("Signup success", response.data);
          router.push("/login");

        } catch (error) {
          toast.error("Signup failed. Please try again.");
        }finally{
          setLoading(false);
        }
  }

  useEffect(() => {
    if( user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ) {
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='pb-4'>{loading ? "Processing..." : "Signup Page"}</h1>
      <hr />
      <label htmlFor="username">username: </label>
      <input 
        type="text"
        id='username'
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder='Enter your username'
        className='border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2'
      />
      <label htmlFor="email">email: </label>
      <input 
        type="email"
        id='email'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='Enter your email'
        className='border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2'
      />
      <label htmlFor="password">password: </label>
      <input 
        type="password"
        id='password'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='Enter your password'
        className='border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2'
      />
      <button 
        onClick={onSignup} 
        className='bg-blue-500 text-white rounded-lg p-2'>
          {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login" className='p-4 text-gray-500 hover:underline'>
        Login here
      </Link>
    </div>
  )
}

export default Signup