"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TopbarItem from "@/app/(site)/components/Topbar/TopbarItem";
import UserModal from "@/app/(site)/components/UserModal";

const Header = () => {
  const [ShowUserModal, setShowUserModal] = useState<boolean>(false);

  const HandleButton = () => {
    setShowUserModal((beforeValue) => !beforeValue);
  };

  return (
    <div className="select-none h-full flex justify-between mx-3 items-center">
      <Link href={"/"} className={"h-full"}>
        <Image
          src="/logo-text.svg"
          className={"cursor-pointer"}
          alt="Logo"
          width={100}
          height={100}
        />
      </Link>

      <div className="flex items-center text-center justify-around cursor-pointer">
        <TopbarItem text={"Manage Api Key"} OnClick={HandleButton} />
      </div>

      {ShowUserModal && <UserModal OnClick={() => setShowUserModal(false)} />}
    </div>
  );
};

export default Header;
