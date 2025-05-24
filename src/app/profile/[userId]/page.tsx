"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function UserProfile() {
  const { userId } = useParams();
  console.log("User ID:", userId);
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
        setUser(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-2">{user?.name}</h1>
        <p className="text-gray-600 mb-4">{user?.bio}</p>

        <h2 className="text-xl font-semibold mb-2">Posts</h2>
        <div className="space-y-4">
          {posts.length ? posts.map((post: any) => (
            <div key={post._id} className="border p-3 rounded shadow">
              <p>{post.content}</p>
              <small className="text-gray-500">{post.type}</small>
            </div>
          )) : <div className="text-sm font-semibold mb-2" >No Posts Found, Add some posts!!!</div>}
        </div>
      </div>
    </>
  );
}