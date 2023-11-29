"use client";
import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineLoading3Quarters,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import axios from "axios";
import { FiServer } from "react-icons/fi";
import { FaCloudflare, FaRegCircle } from "react-icons/fa";

interface DomainBarProps {
  name: string;
  type: string;
  content: string;
}

interface ResultProps {
  status: number;
  type: string;
  domain: string;
  addresses: string[];
  cfIp: boolean[];
  error: string;
}

const DomainBar: React.FC<DomainBarProps> = ({ name, type, content }) => {
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [Init, setInit] = useState<boolean>(true);
  const [Fail, setFail] = useState<number>(200);
  const [Error, setError] = useState<string>("");
  const [Status, setStatus] = useState<boolean>();

  useEffect(() => {
    handleButtonClick();
  }, []);

  async function handleButtonClick() {
    try {
      const result = await Ping(name, type);
      if (result.status === 200) {
        setStatus(result.cfIp[0]);
        setInit(false);
      } else if (result.status === 400) {
        setFail(400);
        setInit(false);
        setError(result.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function Ping(domain: string, type: string): Promise<ResultProps> {
    try {
      const result = await axios.get(`/api/nslookup/${type}/${domain}`);
      return result.data;
    } catch (error) {
      return { status: 0, type: "", domain: "", addresses: [], cfIp: [], error: "" };
    }
  }

  const handleButtonClick2 = () => {
    setShowModal((prevState) => !prevState);
  };

  const statusIcon = () => {
    if (Init) {
      return <AiOutlineLoading3Quarters />;
    } else if (Fail === 400) {
      return <AiOutlineClose />;
    } else if (Status) {
      return <FaCloudflare />;
    } else {
      return <FiServer />;
    }
  };

  return (
    <div className={"flex flex-col  border-t-2 p-1 select-none "}>
      <div className={"flex gap-4"}>
        <div></div>
        <div
          className={
            " w-full flex gap-4 justify-between items-center  cursor-pointer "
          }
          onClick={handleButtonClick2}
        >
          {Fail == 400 ? (
            <div className={"select-none bg-red-500 border rounded-full"}>
              <FaRegCircle size={26} />
            </div>
          ) : (
            <div className={"select-none bg-green-500 border rounded-full"}>
              <FaRegCircle size={26} />
            </div>
          )}

          <div className={"flex-auto text-center"}>{name}</div>

          <div>
            {Init ? (
              <AiOutlineLoading3Quarters />
            ) : Fail == 400 ? (
              <AiOutlineClose />
            ) : Status ? (
              <FaCloudflare />
            ) : (
              <FiServer />
            )}
          </div>
          <div>
            {ShowModal ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
          </div>
        </div>
      </div>

      {ShowModal && (
        <div
          className={
            " bg-gray-200 w-full flex gap-4 justify-between items-center text-center border p-2"
          }
        >
          <div className={"flex-1"}>{name}</div>
          <div className={"flex-auto"}>{type}</div>
          <div className={"flex-1"}>{content}</div>
          <div className={"flex-1"}>{Fail}</div>
          {Error != "" ? (
            <div className={"flex-1"}>{Error}</div>
          ) : Status ? (
            <div className={"flex-1"}>CloudFlared</div>
          ) : (
            <div className={"flex-1"}>Direct Access</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DomainBar;
