

import UserProfile from "@/components/auth/UserProfile";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import PdfUpload from "@/components/pdf/PdfUpload";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold">
            Welcome to AI PDF Chat
          </h2>

           <p className="mt-2 text-muted-foreground">
    Upload a PDF to start chatting.
  </p>

  <PdfUpload />
  <UserProfile/>
        </main>
      </div>
    </div>
  );
}