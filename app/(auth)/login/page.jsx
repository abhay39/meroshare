"use client"
import Cookies from "js-cookie";
import { Lock, School, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
    const [details, setDetails] = useState({
        clientId:Number,
        password:"",
        username:""
    });
    const router=useRouter();

    const [allDPS, setAllDPS] = useState([]);

    const getAllDPS=async()=>{
        const signal=new AbortController().signal;
        let res= await fetch(`https://meroshares.vercel.app/`,signal);
        res= await res.json();
        setAllDPS(res)
        // console.log(res)
    }

    useEffect(()=>{
        getAllDPS();
    },[])

    const handleSubmit=async()=>{
        const signal=new AbortController().signal;
        let res= await fetch(`https://meroshares.vercel.app/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(details)
        });
        res= await res.json();
        // console.log(res)
        if(res.data.statusCode===200){
            toast.success(res.data.message)
            sessionStorage.setItem("token",res.token)
            Cookies.set('Cookie',res.cookie)
            router.replace("/home")
        }
    }

  return (
    <section className=" bg-[#444d70] min-h-screen flex flex-col items-center justify-center"> 
        <div className=" bg-[#333A56] w-[90%]  md:w-2/5 ld:w-1/5 p-6 rounded-lg backdrop-blur-md">
            <Image src="/logo.png" alt="logo" height={80} width={200} className=" w-full h-[60px]"/>
            
            <div>
                <div className="mb-4">
                    <div className="flex gap-3 text-white items-center">
                        <School size={16}/>
                        <p>Depository Participants</p>
                    </div>
                    <div >
                      <select onChange={(e)=>{
                        setDetails({
                            ...details,
                            clientId:e.target.value,
                        })
                      }} name="" id="" className=" p-2 rounded-lg overflow-hidden  w-full outline-none">
                        {
                            allDPS.map((item,index)=>{
                                return(
                                    <option className=" p-2 rounded-md bg-slate-300 " value={item.id}>{item.name}</option>
                                )
                            })
                        }
                      </select>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex gap-3 text-white items-center">
                        <User size={16}/>
                        <p>Username</p>
                    </div>
                    <div>
                        <input onChange={(e)=>{
                        setDetails({
                            ...details,
                            username:e.target.value,
                        })
                      }} type="text" className="w-full p-2 rounded-md border-none mt-2" name="" id="" />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex gap-3 text-white items-center">
                        <Lock size={16}/>
                        <p>Password</p>
                    </div>
                    <div>
                        <input onChange={(e)=>{
                        setDetails({
                            ...details,
                            password:e.target.value,
                        })
                      }} type="password" className="w-full p-2 rounded-md border-none mt-2" name="" id="" />
                    </div>
                </div>
                <button onClick={handleSubmit} className=" bg-[#6E7DB0] text-white p-2 rounded-md w-full mt-4">Login</button>
            </div>
        </div>

    </section>
  )
}

export default page