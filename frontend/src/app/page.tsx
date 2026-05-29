"use client";

import { backendStatus } from "@/services/api";
import { useEffect, useState } from "react";


export default function Home() {
  const[message,setMessage]=useState("Loading....")

  useEffect(()=>{
    backendStatus()
    .then((data)=>setMessage(data.message))
    .catch(()=>setMessage("Backend connection failed"))
  },[])
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        AI PDF Chat Application
      </h1>
      <p>Backend Status: {message}</p>
    </main>
  );
}