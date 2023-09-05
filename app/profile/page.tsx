"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className="flex h-full flex-col justify-center py-12 px-6  bg-gray-100 w-full ">
      <div className="mx-auto w-full max-w-lg">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          ログインが完了しました
        </h2>
      </div>
      <div className='flex justify-center mt-6'>
        <button className='bg-gray-500 text-white rounded-md p-4' onClick={() => signOut()}>ログアウト</button>
      </div>
    </div>
  )
}

export default ProfilePage
