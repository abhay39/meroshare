"use client"

import { setUserDetailsActions } from "@/store/detailsSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const page = () => {
    const [userDetails,setUserDetails]=useState('');
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

  return (
    <div>
        
        <h1>jfdjfhd</h1>
    </div>
  )
}

export default page