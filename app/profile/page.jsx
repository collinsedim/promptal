"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPrompts = async () => {
      if (session?.user?.id) {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);

        const data = await response.json();

        setPosts(data);
      } else {
        console.log("Could not get user ID");
      }
    };
    fetchPrompts();
  }, [session]);

  const handleDelete = async (post) => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this prompt? This action is irreversible!"
    );

    if (isConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (post) => {
    if (post) {
      router.push(`/update-prompt?id=${post._id}`);
    }
  };

  return (
    <Profile
      name="My"
      desc="Your personal profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
