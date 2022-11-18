import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";

const Header = () => {
    const [modalEnabled, setModalEnabled] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { data: session } = useSession();
    const router = useRouter();

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(searchQuery);
    };

    return (
        <header className="flex flex-row bg-black/40 h-12 py-1 px-2 md:px-10 lg:px-36 items-center border-b border-gray-900 justify-between">
            <div className="flex items-center gap-6">
                <FaBars className="headerButton" />
                <p>Logo</p>
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
                {session ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => signOut()}
                            className="hover:text-white duration-300 text-sm tracking-widest"
                        >
                            SIGN OUT
                        </button>
                        <Image
                            src={session?.user?.image!}
                            alt="Avatar"
                            className="h-8 w-8 rounded-full border border-gray-900"
                        />
                        <p>{session?.user?.name!}</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => signIn()}
                            className="hover:text-white duration-300 text-sm tracking-widest"
                        >
                            SIGN IN
                        </button>
                        <AiOutlineUser className="h-8 w-8 p-1 rounded-full border border-gray-900 bg-slate-900" />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
