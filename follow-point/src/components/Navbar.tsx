"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[rgba(27,29,34,1)] text-white p-4">
      <div className="container mx-auto flex items-center">
        <Link href={"/"}>
          <Image src={"/Logo-Navbar.png"} alt="logo" width={100} height={100} />
        </Link>
        <div className="flex-grow"></div>
        <div>{/* <DropdownSidebar /> */}</div>
      </div>
    </nav>
  );
}
