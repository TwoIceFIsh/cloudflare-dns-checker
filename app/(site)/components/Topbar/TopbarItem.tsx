import React from "react";

interface TopbarItemProps {
  text: string;
  OnClick?: () => void;
}

const TopbarItem: React.FC<TopbarItemProps> = ({ text, OnClick }) => {
  return (
    <div
      className={"border-x h-full px-2 py-1 hover:bg-cyan-50 font-bold"}
      onClick={OnClick}
    >
      {text}
    </div>
  );
};

export default TopbarItem;
