import React from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
const Header = () => {
  return (
    <header className="p-5 shadow ">
      <div className="max-w-[1440px] max-auto flex justfy-between gap-4 md:gap-8">
        <Link to="/">
          <img src="/fiverr.png" alt="fiverr" className="w-[100px]"></img>
        </Link>
        <form  className="w-full flex-1 flex border rounded max-w-[600px]" action="">
          <input className="w-full h-full px-3 outline-none" type="search" placeholder="Hizmetleri ara..."></input>
          <button className="bg-black p-2 text-white text-xl max-md:hidden">
            <IoSearch></IoSearch>
          </button>
        </form>
        <div className="flex items-center gap-2 relative">
          <Link className="transition hover:text-green-500  p-1 hover:text-white hover:bg-green-500" to="/login"> Giriş Yap</Link>
          <Link className="transition hover:text-green-500 border rounded p-1 hover:text-white hover:bg-green-500" to="/register"> Kaydol </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
