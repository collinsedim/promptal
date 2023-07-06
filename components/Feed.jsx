"use client";

import { debounce } from "lodash";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ sortedData, handleTagClick }) => {
  return (
    <div className="mt-10 prompt_layout">
      {sortedData.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tags, setTags] = useState("");
  const [isTagFilterActive, setIsTagFilterActive] = useState(false);

  // debounce the search function to avoid calling it on every keystroke
  const debouncedSearch = debounce((text) => {
    if (text !== "") {
      const filtered = posts.filter(
        (p) =>
          p.prompt.toLowerCase().includes(text.toLowerCase()) ||
          p.tag.toLowerCase().includes(text.toLowerCase()) ||
          p.creator.username.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, 300);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const showPromptsByTag = () => {
    if (tags !== "") {
      const filteredTags = posts.filter((p) => p.tag.includes(tags));

      setFilteredPosts(filteredTags);
    } else {
      setFilteredPosts(posts);
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setIsTagFilterActive(false);

      setPosts(sortedData);
      setFilteredPosts(sortedData);
    };

    fetchPrompts();
  }, []);

  useEffect(() => {
    showPromptsByTag();
  }, [tags]);

  if (!session) {
    return (
      <p className="mt-20 font-bold font-satoshi text-red-400 group">
        Please{" "}
        <span className="group-hover:animate-pulse group-hover:text-red-800">
          sign-in
        </span>{" "}
        to access tons of user-shared prompts!
      </p>
    );
  }

  return (
    <div className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search prompts, tags, or name"
          value={searchText}
          required
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      {isTagFilterActive && (
        <div
          className="cursor-pointer mt-5 font-bold font-inter bg-slate-600 py-1 px-2 rounded-full text-white shadow-sm hover:bg-slate-800"
          onClick={() => {
            setTags("");
            setIsTagFilterActive(false);
          }}
        >
          Show All Prompts
        </div>
      )}
      <PromptCardList
        sortedData={filteredPosts}
        handleTagClick={(tag) => {
          setTags(tag);
          setIsTagFilterActive(true);
        }}
      />
    </div>
  );
};

export default Feed;
