"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import DomainBar from "@/app/domain/[domainId]/Components/DomainBar";
import Image from "next/image";

interface RecordListProps {
  name: string;
  type: string;
  content: string;
}

export default function Home({ params }: { params: { domainId: string } }) {
  const [RecordList, setRecordList] = useState<RecordListProps[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const GetRecordList = async () => {
      try {
        const result = await axios.get(
          "/api/zones/" + params.domainId + "/dns_records",
        );
        setRecordList(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // API 호출이 완료되거나 오류가 발생해도 로딩 상태를 false로 변경
      }
    };
    GetRecordList();
  }, [params.domainId]);

  return (
    <div className={"h-full"}>
      {Loading ? (
        <div className={"h-full flex flex-col items-center justify-center"}>
          <div>
            <Image
              alt={"Loading "}
              src={"/logo.svg"}
              height={128}
              width={128}
            />
            <div className={"text-center"}>Loading...</div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={"flex justify-between bg-green-200 p-4 mb-2 font-bold"}
          >
            <div className={"flex-1"}>Status</div>
            <div className={"flex-auto text-center"}>Domain</div>
            <div className={"flex-1 text-end"}>Result/Detail</div>
          </div>

          <div className={"flex flex-col"}>
            {RecordList.length >= 1 &&
              RecordList.map((result) => (
                <DomainBar
                  key={result.name + result.content}
                  name={result.name}
                  content={result.content}
                  type={result.type}
                />
              ))}
            <div className={"bg-pink-400 border-t-[1px] mb-20 text-center"}>
              End of Data
            </div>
          </div>
        </>
      )}
    </div>
  );
}
