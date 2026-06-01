"use client";

import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { uploadPdf } from "@/services/pdf.service";

export default function PdfUpload() {
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
 const [uploading,setUploading]=useState(false)
 const [status,setStatus]=useState("")
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };
const handleUpload=async()=>{
  if(!file) return 
  try {
    setUploading(true)
    const result= await uploadPdf(file)
    setStatus(`Uploaded: ${result.filename}`);
  } catch (error) {
     setStatus("Upload failed");
    console.error(error);
  }finally{
    setUploading(false)
  }
}
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Card className="mt-6 max-w-xl">
      <CardContent className="flex flex-col items-center gap-4 p-10">
        <h2 className="text-xl font-semibold">
          Upload PDF
        </h2>

        <Button onClick={handleSelectFile}>
          Select PDF
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {file && (
          <p className="text-sm">
            Selected: {file.name}
          </p>
        )}

        <Button
  onClick={handleUpload}
  disabled={!file || uploading}
>
  {uploading ? "Uploading..." : "Upload"}
</Button>

{status && (
  <p className="text-sm">
    {status}
  </p>
)}
      </CardContent>
    </Card>
  );
}