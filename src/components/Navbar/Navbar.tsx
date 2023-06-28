import Link from "next/link";
import React from "react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link href="/" className="flex items-center justify-between h-20">
        <img src="/logo.png" alt="arcode" className="h-full" />
      </Link>
      <div className="flex items-center">
        <button
          className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md uppercase text-sm font-medium 
                        hover:text-sky-500 hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
                        transition duration-300 ease-in-out"
        >
          sign in
        </button>
      </div>
    </div>
  );
};
export default Navbar;
