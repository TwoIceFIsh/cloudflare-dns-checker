import React from "react";

interface InputProps {
  header: string; // 여기서도 String 대신 string 사용 권장
  placeholder: string;
  value?: string;
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "search"
    | "tel"
    | "url"
    | "date";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  header,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-5 mt-5">
      <div className="font-bold text-sm ">{header}</div>
      <div className="">
        <input
          className="p-2 border-2 rounded-md text-center w-full placeholder:text-sm "
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
