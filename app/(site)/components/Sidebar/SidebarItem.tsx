import React from "react";
import { RiPagesLine } from "react-icons/ri";

interface SidebarItemPorpos {
  text: string;
  did?:string;
}

const SidebarItem: React.FC<SidebarItemPorpos> = ({ text }) => {
  return (
    <button
      className=" text-blue-900   w-full flex  p-2 hover:border hover:bg-cyan-50 rounded-l-full focus:bg-blue-100
            hover:border-blue-50 focus:border focus:border-blue-500
      "
      type="submit"
    >
      <div className="mr-2">
        <RiPagesLine size={24} />
      </div>
      <div>{text}</div>
    </button>
  );
};

export default SidebarItem;
