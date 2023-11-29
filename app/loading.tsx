import React from 'react';
import Image from "next/image";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (

        <div className="flex flex-col fixed top-0 left-0 w-full h-full bg-white  flex items-center justify-center z-50">
        <div><Image src={"/logo.svg"} width={146} height={146} alt={"s"}/>
        </div>
            <div className={"font-bold"}>Loading...</div>
        </div>
        );
}