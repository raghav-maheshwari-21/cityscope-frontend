// src/components/CreatePostForm.tsx
"use client";

import { useForm } from "react-hook-form";

export default function CreatePostForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-xl shadow mb-4">
      <textarea
        maxLength={280}
        placeholder="What's happening in your neighborhood?"
        className="w-full p-2 border rounded mb-2"
        {...register("content")}
      />
      <select className="w-full p-2 border rounded mb-2" {...register("type")}>
        <option value="update">Share a local update</option>
        <option value="event">Event announcement</option>
        <option value="recommend">Recommend a place</option>
        <option value="help">Ask for help</option>
      </select>
      <input type="file" className="mb-2" {...register("image")} />
      <button className="bg-brand text-white px-4 py-2 rounded">Post</button>
    </form>
  );
}
