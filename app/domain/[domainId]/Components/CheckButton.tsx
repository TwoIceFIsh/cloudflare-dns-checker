import React from "react";
import { VscDebugStart } from "react-icons/vsc";

interface CheckButtonProps {
  domainId: string;
  domainType: string;
  OnClick?: () => void;
}

const CheckButton: React.FC<CheckButtonProps> = ({
  domainId,
  domainType,
  OnClick,
}) => {
  return (
    <div>
      <button
        type="submit"
        className={
          "bg-green-200 px-2 ring-1 rounded-l-full flex text-green-900px-2"
        }
        onClick={OnClick}
      >
        <VscDebugStart size="1.5rem" />
        <p>Check</p>
      </button>
    </div>
  );
};

export default CheckButton;
