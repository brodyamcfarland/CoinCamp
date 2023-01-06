import React, { useState } from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { FaBars, FaCircle } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import SideBarModal from "./SideBarModal";

const Header = () => {
    const [modalEnabled, setModalEnabled] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const router = useRouter();
    const connect = useMetamask();
    const disconnect = useDisconnect();
    const address = useAddress();

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery !== "") {
            router.push(`/search/${searchQuery}`);
        } else {
            return;
        }
    };

    return (
        <header className="flex flex-row bg-black/40 h-12 py-1 px-2 md:px-10 lg:px-36 items-center border-b border-gray-900 justify-between">
            <div className="flex items-center gap-6">
                <FaBars
                    onClick={() => setModalEnabled(!modalEnabled)}
                    className="headerButton"
                />
                <p className="text-sm tracking-widest">COIN CAMP</p>
            </div>
            <form
                onSubmit={(e) => search(e)}
                className="hidden sm:flex items-center rounded-xl border border-gray-900 divide-x-[1px] divide-gray-900 hover:border-gray-600 hover:divide-gray-600 duration-300"
            >
                <button type="submit" className="cursor-pointer">
                    <BiSearch className="h-full w-4 mr-2 ml-[8px] cursor-pointer" />
                </button>
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black rounded-r-xl focus:outline-none focus:bg-white/10 duration-500 px-2"
                    type="text"
                />
            </form>
            <div>
                {address ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={disconnect}
                            className="hover:text-white duration-300 text-sm tracking-widest flex flex-row gap-2 items-center justify-center"
                        >
                            <FaCircle fill="green" />{" "}
                            {address.slice(0, 5) + "..." + address.slice(-4)}
                        </button>
                        <Image
                            src={"/polygonLogo.png"}
                            width={100}
                            height={100}
                            alt="Avatar"
                            className="h-7 w-7 rounded-full border border-gray-900 object-cover"
                        />
                        <p>{}</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={connect}
                            className="hover:text-white duration-300 text-sm tracking-widest"
                        >
                            CONNECT WALLET
                        </button>
                        <AiOutlineUser className="h-7 w-7 p-1 rounded-full border border-gray-900 bg-slate-900" />
                    </div>
                )}
            </div>
            {modalEnabled && <SideBarModal />}
        </header>
    );
};

export default Header;
