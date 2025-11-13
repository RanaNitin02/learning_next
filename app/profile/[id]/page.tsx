import React from 'react'

const UserProfile = async ({ params }: any) => {
  const { id } = await params

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='pb-4'>Profile Page</h1>
      <hr />
      <p className='text-4xl'>
        Profile of id <span className='text-blue-500'>{id}</span>
      </p>
    </div>
  )
}

export default UserProfile