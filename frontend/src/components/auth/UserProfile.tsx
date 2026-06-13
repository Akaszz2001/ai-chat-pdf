"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Not Logged In</p>;
  }

  return (
    <div className="border p-4 rounded">
      <img
        src={session.user?.image || ""}
        alt="Profile"
        width={60}
        height={60}
      />

      <h3>{session.user?.name}</h3>

      <p>{session.user?.email}</p>

      <button
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}