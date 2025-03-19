"use client"
import { useSession } from '@/app/context/sessioncontext'
import React, { useEffect } from 'react'
import { LuFingerprint, LuLogOut } from 'react-icons/lu'

const Header = () => {
  const { user,logout } = useSession()
  useEffect(()=>{
    console.log("useEffect()");
  },[user])
  
  return (
    <div className='h-[12vh] w-full bg-slate-200 flex items-center'>
      <div className='flex items-center w-full justify-between px-6 md:px-12'>

        <div className='flex items-center gap-4'>
          <div className='flex items-center justify-center bg-primary w-16 h-16 rounded-full'>
            <LuFingerprint className='h-12 w-12 text-white' />
          </div>
          <div>
            <div className='text-base md:text-2xl'>ระบบจัดการลายเซ็นดิจิทัล</div>
            <div className='text-sm md:text-base'>Digital Signature</div>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='hidden flex-col items-end md:flex'>
            <div>{user?.name}</div>
            <div className='text-sm'>{user?.faculty}</div>
          </div>
          <div className='w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center text-2xl text-white'>TS</div>
          <LuLogOut className='w-6 h-6 hover:text-yellow-500 cursor-pointer' onClick={() => logout()} />
        </div>
      </div>
    </div>
  )
}

export default Header