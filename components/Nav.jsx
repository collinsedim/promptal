"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, useSession, getProviders, signOut } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 px-5">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="Promptpal"
          src="/./assets/images/ai.png"
          width={50}
          height={50}
          className="object-contain stay_up hover:animate-bounce"
        />
        <p className="logo_text stay_up">Promptpal</p>
      </Link>
      {/* Desktop Nav */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/add-prompt" className="black_btn">
              New Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              // className="outline_btn"
              className="text-slate-900 z-10 hover:text-red-600"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full relative stay_up"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Nav section */}
      <div className="sm:hidden flex relative z-30">
        {session?.user ? (
          <div>
            <Image
              src={session.user.image}
              width={37}
              height={37}
              className="rounded-full cursor-pointer relative stay_up"
              alt="Profile"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/add-prompt"
                  className="black_btn w-full"
                  onClick={() => settoggleDropdown(false)}
                >
                  New Post
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
