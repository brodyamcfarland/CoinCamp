import React, { useState } from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { FaBars, FaCircle } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import SideBarModal from "./SideBarModal";
import Link from "next/link";

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
        <header className="flex flex-row bg-black/40 h-12 py-1 px-2 md:px-10 lg:px-48 xl:px-80 items-center border-b border-gray-900 justify-between select-none">
            <div className="flex items-center gap-6">
                <FaBars
                    onClick={() => setModalEnabled(!modalEnabled)}
                    className="headerButton"
                />
                <Link href="/">
                    <p className="text-sm tracking-widest hover:text-gray-500 duration-500 select-none">
                        COIN CAMP
                    </p>
                </Link>
            </div>
            <form
                onSubmit={(e) => search(e)}
                className="hidden sm:flex items-center lg:w-96 rounded-xl h-9 border border-gray-900 divide-x-[1px] divide-gray-900 hover:border-gray-600 hover:divide-gray-600 duration-300"
            >
                <button type="submit" className="cursor-pointer">
                    <BiSearch className="h-full w-4 mr-2 ml-[8px] cursor-pointer" />
                </button>
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent rounded-r-xl w-full focus:outline-none focus:bg-gradient-to-r from-white/10 to-transparent duration-500 ease-in-out h-[35px] px-2"
                    type="text"
                />
            </form>
            <div>
                {address ? (
                    <div className="flex items-center gap-2 w-[180px] justify-end">
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
