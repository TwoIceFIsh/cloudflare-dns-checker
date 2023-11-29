"use client";

import React, {useEffect, useState} from "react";
import SidebarItem from "@/app/(site)/components/Sidebar/SidebarItem";
import Loading from "@/app/loading";
import Link from "next/link";

interface DomainItemProps {
    id: string;
    name: string;
}

const Sidebar = () => {
    const [DomainList, setDomainList] = useState<DomainItemProps[]>([
        {id: "a", name: "a"},
    ]);
    const [loading, setLoading] = useState(true);
    const [needApi, setNeedApi] = useState<boolean>(false);

    const GetDomainList = async () => {
        await fetch("/api/zones")
            .then(async (result) => {
                setDomainList(await result.json());
                setLoading(false); // API 호출이 완료되면 로딩 상태를 false로 변경
            })
            .catch((error) => {
                setDomainList([{id: "a", name: "a"},]);
                setNeedApi(true);
                setLoading(true); // API 호출 중 오류가 발생해도 로딩 상태를 false로 변경
            });
    };

    useEffect(() => {
        GetDomainList().then(r => null);
    }, []);
    return (
        <div>
            <div>
                <div className="select-none flex flex-col gap-2 border-r-[1px] h-full">
                    <div className="px-4 mt-4 mb-2 font-bold">CloudFlare DNS Checker</div>
                    {loading ? (
                        <Loading/>
                    ) : needApi ? (
                        <div
                            className={"flex justify-center items-center text-center h-full"}
                        >
                            <div>Please Check Api Key</div>
                        </div>
                    ) : Array.isArray(DomainList) ? (
                        DomainList.map((data) => (
                            <Link key={data.id} href={`/domain/${data.id}/`}>
                                <SidebarItem key={data.id} text={data.name} did={data.id}/>
                            </Link>
                        ))
                    ) : (
                        <div
                            className={"flex justify-center items-center text-center h-full"}
                        >
                            <div>Please Check Api Key</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
