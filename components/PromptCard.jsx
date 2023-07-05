import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link
          href={
            session?.user?.id
              ? session?.user.id !== post.creator._id
                ? `/profile/${post.creator._id}`
                : `/profile`
              : "/"
          }
        >
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post.creator.image}
              alt={`${post.creator.username}'s profile photo`}
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            {session?.user?.id ? (
              <div className="flex flex-col">
                <h3 className="text-slate-800 font-semibold font-satoshi">
                  {post.creator.username}
                </h3>
                <p className="text-slate-600 text-sm font-inter">
                  {post.creator.email}
                </p>
              </div>
            ) : (
              <div className="text-center p-1 rounded-sm bg-red-500 ">
                <p className="text-slate-100">signin to see poster details</p>
              </div>
            )}
          </div>
        </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            width={12}
            height={12}
            alt=""
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-slate-800">{post.prompt}</p>
      <p
        className="cursor-pointer font-inter text-sm blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag.includes("#") ? post.tag : `#${post.tag}`}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="flex gap-1 justify-end">
          <p
            onClick={handleEdit}
            className="py-1 px-2 rounded-md font-inter cursor-pointer text-sm text-slate-100 bg-blue-400"
          >
            Edit
          </p>
          <p
            onClick={handleDelete}
            className="py-1 px-2 rounded-md text-white bg-red-500 font-inter cursor-pointer text-sm"
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
