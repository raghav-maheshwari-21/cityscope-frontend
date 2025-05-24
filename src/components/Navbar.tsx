"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserId(decoded.id); // adjust if your token has a different structure
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Invalid token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <p className="text-2xl font-bold text-cursive">Cityscope</p>
        <div className="space-x-4">
          <Link href="/create-post" className="text-gray-700 hover:text-brand">Create Post</Link>
          <Link href="/feed" className="text-gray-700 hover:text-brand">Feed</Link>
          {isLoggedIn && (
            <>
              <Link href={`/profile/${userId}`} className="text-gray-700 hover:text-brand">Profile</Link>
              <button onClick={handleLogout} className="text-red-500 hover:underline ml-2">Logout</button>
            </>
          )}
          {!isLoggedIn && (
            <Link href="/login" className="text-gray-700 hover:text-brand">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
