"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const AddPrompt = () => {
  const [adding, setAdding] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    createdAt: "",
  });

  const router = useRouter();
  const { data: session } = useSession();

  const NewPrompt = async (e) => {
    e.preventDefault();
    setAdding(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          createdAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Form
      type="Add"
      post={post}
      setPost={setPost}
      adding={adding}
      handleSubmit={NewPrompt}
    />
  );
};

export default AddPrompt;
