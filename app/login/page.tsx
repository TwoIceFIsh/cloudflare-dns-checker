"use client";
import "../globals.css";
import React from "react";
import Image from "next/image";
import Input from "@/app/login/components/Input";

const Page = () => {
  return (
    <div className="p-4 flex flex-col justify-center items-center border h-screen">
      <div className="flex flex-col mb-5 justify-center items-center">
        <div>
          <Image src="/logo.svg" alt="logo" width={124} height={124} />
        </div>
        <div className="text-center font-bold text-black text-2xl">
          CloudFlare DNS Checker
        </div>
      </div>
      <div className="p-4 border-2 rounded-2xl w-96">
        <Input header="아이디" placeholder="아이디를 입력하세요" type="email" />
        <Input
          header="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          type="password"
        />

        <div className="justify-center flex flex-col gap-2 rounded-md mt-10 mb-5 ">
          <button
            className="
          bg-blue-600
          hover:bg-blue-800
          text-white
          rounded-md
          p-2
          "
            type={"submit"}
          >
            로그인
          </button>

          <div className="mt-4 flex gap-4 text-sm text-center items-center justify-center">
            <div className=" text-gray-800">회원가입</div>
            <div className=" text-gray-800">암호찾기</div>
          </div>
        </div>

        <hr />
        <div className="text-center mt-4 text-gray-300">Made By Aiden Lee</div>
      </div>
    </div>
  );
};

export default Page;
