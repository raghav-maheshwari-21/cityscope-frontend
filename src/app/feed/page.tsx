"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ location: "", type: "" });
  const [replyText, setReplyText] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleReact = async (postId, type) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/react`, { type }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.error("Error reacting to post", err);
    }
  };

  const handleReply = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/reply`, {
        text: replyText[postId],
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReplyText({ ...replyText, [postId]: "" });
      fetchPosts();
    } catch (err) {
      console.error("Error replying to post", err);
    }
  };

  const filteredPosts = posts.filter((post) => {
    return (
      (filter.location === "" || post.location?.includes(filter.location)) &&
      (filter.type === "" || post.type === filter.type)
    );
  });

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Community Feed</h1>

        <div className="flex gap-4 mb-4">
          <input
            placeholder="Filter by location"
            className="p-2 border rounded w-1/3"
            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          />
          <select
            className="p-2 border rounded"
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="recommend">Recommend</option>
            <option value="help">Help</option>
            <option value="update">Update</option>
            <option value="event">Event</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post._id} className="p-4 border rounded shadow">
              <div className="text-gray-500 text-sm mb-1">@{post.user?.name}</div>
              <div className="text-lg font-medium">{post.content}</div>
              <div className="text-sm text-blue-600 capitalize">{post.type}</div>
              {post.image && <img src={post.image} className="mt-2 rounded max-h-60" />}
              <div className="mt-2 text-sm text-gray-400">📍 {post.location}</div>

              <div className="flex gap-4 mt-2 text-sm">
                <button onClick={() => handleReact(post._id, "like")} className="text-green-600">
                  👍 {post.likes?.length || 0}
                </button>
                <button onClick={() => handleReact(post._id, "dislike")} className="text-red-600">
                  👎 {post.dislikes?.length || 0}
                </button>
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={replyText[post._id] || ""}
                  onChange={(e) => setReplyText({ ...replyText, [post._id]: e.target.value })}
                  placeholder="Write a reply..."
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={() => handleReply(post._id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Reply
                </button>
              </div>

              {post.replies?.length > 0 && (
                <div className="mt-2 border-t pt-2 space-y-2">
                  {post.replies.map((reply, idx) => (
                    <div key={idx} className="text-sm text-gray-700">
                      <strong>@{reply.user?.name || "anon"}:</strong> {reply.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

