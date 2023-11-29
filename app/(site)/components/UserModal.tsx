import React, {useState} from "react";
import Image from "next/image";
import Input from "@/app/login/components/Input";

interface ModalProps {
    OnClick?: () => void;
}

const UserModal: React.FC<ModalProps> = ({OnClick}) => {
    const [apiKey, setApiKey] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(event.target.value);
    };

    const SaveApi = async () => {
        if (apiKey === "") {
            return alert("API Token is empty")
        }

        await fetch("/api/save/" + apiKey)
            .then(async (result) => {
                location.href = "/";
            })
            .catch(async () => {
                alert('[fail] try again');
            });
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4  ">
            <div className="p-4 flex flex-col justify-center items-center border rounded-2xl bg-white shadow-xl">
                <div className="flex flex-col mb-5 justify-center items-center">
                    <Image src="/logo.svg" alt="logo" width={124} height={124}/>
                </div>

                <div className="p-4 border-2 rounded-2xl w-96">
                    <Input
                        header="CloudFlare API Token"
                        placeholder="Insert CloudFlare API Token"
                        type="text"
                        value={apiKey}
                        onChange={handleInputChange} // 여기에 onChange 핸들러 추가
                    />

                    <div className="justify-center flex gap-2 rounded-md mt-10 mb-5">
                        <button
                            className="bg-blue-600 hover:bg-blue-800 text-white rounded-md p-2 grow"
                            onClick={SaveApi} // "저장" 버튼에 onClick 핸들러 연결
                        >
                            Save
                        </button>
                        <button
                            className="bg-blue-600 hover:bg-blue-800 text-white rounded-md p-2 grow"
                            onClick={OnClick}
                        >
                            Close
                        </button>
                    </div>

                    <hr/>
                    <div className="text-center mt-4 text-gray-300">
                        Made By Aiden Lee
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
