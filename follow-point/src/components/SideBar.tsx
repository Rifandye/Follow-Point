import { handleLogout, isLoggedIn } from "@/actions/user";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      <div className="relative z-30">
        <button onClick={toggleSidebar} className="text-3xl text-yellow-400">
          &#9776;
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 transform bg-gradient-to-r from-[#1b1d22] to-[#23282d] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <Image src="/Logo-Navbar.png" alt="logo" width={100} height={100} />
        <div className="flex flex-col items-start p-4">
          <Link href="/">
            <div
              className="text-yellow-400 text-lg mb-4 hover:text-white"
              onClick={toggleSidebar}
            >
              Events
            </div>
          </Link>
          <Link href="/user/transactions">
            <div
              className="text-yellow-400 text-lg mb-4 hover:text-white"
              onClick={toggleSidebar}
            >
              Transactions
            </div>
          </Link>
          <Link href="/user/edit">
            <div
              className="text-yellow-400 text-lg mb-4 hover:text-white"
              onClick={toggleSidebar}
            >
              Edit Profile
            </div>
          </Link>
          {isLoggedIn() ? (
            <div
              className="text-yellow-400 text-lg mb-4 hover:text-white cursor-pointer"
              onClick={() => {
                toggleSidebar();
                handleLogout();
              }}
            >
              Logout
            </div>
          ) : (
            <Link href="/login">
              <div
                className="text-yellow-400 text-lg mb-4 hover:text-white"
                onClick={toggleSidebar}
              >
                Login
              </div>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
