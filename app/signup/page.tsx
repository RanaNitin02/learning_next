"use client"
import React from 'react'
import Link from 'next/link'
import { axios } from 'axios'
import { useRouter } from 'next/navigation'


const Signup = () => {

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: ""
  });

  const onSignup = async() => {

  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='pb-4'>Signup Page</h1>
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
          Signup
      </button>
      <Link href="/login" className='p-4 text-gray-500 hover:underline'>
        Login here
      </Link>
    </div>
  )
}

export default Signup