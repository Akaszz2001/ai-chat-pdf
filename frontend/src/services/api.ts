import { API_BASE_URL } from "@/constants/config"

export const backendStatus=async()=>{
    const response=await fetch(API_BASE_URL)

    if(!response.ok){
        throw new Error("Failed to fetch backend status")
    }


    return response.json()
}