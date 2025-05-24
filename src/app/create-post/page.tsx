"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const POST_TYPES = ["recommend", "help", "update", "event"];

export default function CreatePost() {
  const [formData, setFormData] = useState({
    content: "",
    type: "update",
    location: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      data.append("content", formData.content);
      data.append("type", formData.type);
      data.append("location", formData.location);
      if (image) data.append("image", image);

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      router.push("/feed");
    } catch (err: any) {
      console.error(err.response?.data || "Failed to create post");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="content"
            placeholder="What's happening in your locality?"
            value={formData.content}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            maxLength={280}
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            {POST_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Post
          </button>
        </form>
      </div>
    </>
  );
}
