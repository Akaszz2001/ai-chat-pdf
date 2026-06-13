import {API_BASE_URL} from '@/constants/config'


export const askQuestion = async(question:string,pdfId:string)=>{
    const response = await fetch(`${API_BASE_URL}/chat`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            
        },
        body:JSON.stringify({
            question,
            pdf_id:pdfId
        })
    })

    if(!response.ok){
        throw new Error("Failed to get answer")
    }

    return response.json()
}