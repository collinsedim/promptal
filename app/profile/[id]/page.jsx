"use client";

import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params?.id}/posts`);
      const data = await res.json();

      setUserPosts(data);
      setUserName(data[0].creator?.username);
    };
    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Viewing ${userName}'s profile`}
      data={userPosts}
    />
  );
};

export default UserProfile;
