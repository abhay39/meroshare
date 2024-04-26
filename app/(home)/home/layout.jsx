"use client"
import { links } from '@/navliks';
import { setUserDetailsActions } from '@/store/detailsSlice';
import { CircleUser, LogOut, Menu, MoveHorizontalIcon } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const layout = ({children}) => {
  const [isClicked, setIsClicked]=useState(false);
  const userDetails=useSelector(item=>item.UserDetailsSlice);
  const router=useRouter();



  const haldeClick=()=>{
    setIsClicked(!isClicked);
  }

  const getTOken=sessionStorage.getItem('token');

  if(!getTOken){
    toast.error("You are not authenticated!!! Redirecting to login page")
    router.push('/login');
  }

    const dispatch=useDispatch();

    const getAllDPS=async()=>{
        const signal=new AbortController().signal;
        let result = await fetch("https://webbackend.cdsc.com.np/api/meroShare/ownDetail/", {
            method:"GET",
           
            timeout: 10000,
            headers:{
              "Authorization":sessionStorage.getItem('token'),
            }
          });
          result = await result.json();
          dispatch(setUserDetailsActions.setUserDetails(result))
    }
    useEffect(()=>{
        getAllDPS();
    },[]);

  const pathname=usePathname();
  return (
    <section className=' min-h-screen flex'>
      <aside className={`bg-[#333A56] h-[100vh] sticky  top-0 ${isClicked?"md:w-2/6 lg:w-1/6":""}`}>
        <div className=' flex items-center justify-center mt-2'>
        <Image src="/small.png" alt="logo" height={50} width={50}/>
        </div>

        {/* all navs */}
        <nav>
          <ul>
            {
              links.map((item)=>{
                return(
                  <Link  href={item.link} className={` ${pathname===item.link?"bg-[#0A0A0A]":""} flex gap-2 items-center text-white lg:text-sm text-xs p-2 mb-4 mt-2  font-bold` }>
                    {item.icon}
                    <span className={`${isClicked?" hidden md:flex":"hidden "} `}>{item.name}</span>
                  </Link>
                )
              })
            }
          </ul>
        </nav>
      </aside>
        <div className=' flex   flex-col w-full'>
          <nav className='flex justify-between sticky top-0 left-0  bg-[#EFEFEF] p-3 items-center'>
            <div onClick={haldeClick} className=' cursor-pointer '> 
              <Menu />
            </div>
            <div className=' flex items-center gap-3'>
              <div onClick={()=>{
                sessionStorage.removeItem('token');
                toast.success("Logout successfully! Redirecting to login page");
                setTimeout(()=>{
                  router.push("/login")
                },2000)
              }} className=' cursor-pointer '>
                <LogOut />
              </div>
              <div className='flex gap-3 items-center '>
                <div className=' bg-slate-200 rounded-full p-2 cursor-pointer'>
                  <CircleUser className='gray'/>
                </div>
                <div className='hidden lg:flex flex-col'>
                  <h1 className=' font-bold'>{userDetails?.userOwnDetails?.name}</h1>
                  <span className=' text-sm text-slate-400'>{userDetails?.userOwnDetails?.meroShareEmail?.toLowerCase()}</span>
                </div>
              </div>
            </div>
          </nav>
          <div className=' px-3 py-3'>
              {children}
          </div>
        </div>
    </section>
  )
}

export default layout