import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import {
    AiFillFire,
    AiOutlinePlusCircle,
    AiFillInfoCircle,
} from "react-icons/ai";

const Home: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Coin Camp: Decentralized Crowdfunding</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className="flex flex-col bg-gradient-to-r from-black/10 to-black border border-gray-900 mt-5 max-w-6xl mx-auto p-10 text-center items-center justify-center tracking-wide">
                <Image
                    src={"/Logo.png"}
                    width={120}
                    height={120}
                    alt="Avatar"
                    className="object-fit"
                />
                <p className="text-lg tracking-widest hover:text-gray-500 duration-500 select-none">
                    COIN CAMP
                </p>
                <p className="text-gray-300 pt-10 font-bold">
                    Welcome to Coin Camp, the platform for crowd funding with
                    crypto currency.
                </p>
                <p className="text-gray-400 pt-10 text-sm lg:px-20 text-left">
                    Coin Camp is a crowdfunding platform where users can either
                    donate to or create a crowdfund using the native
                    cryptocurrency MATIC. Users will be required to have Meta
                    Mask installed and be connected to the Polygon - Mumbai Test
                    Network in order to interact.
                </p>
                <p className="text-gray-400 pt-10 text-sm lg:px-20 text-left">
                    To get started, click on "CONNECT WALLET" while connected to
                    the Polygon - Mumbai Test Network. Start searching by
                    clicking the sidebar and viewing the Trending Page or
                    entering a search in the search bar in the header.
                </p>
                <div className="flex flex-row pt-4 gap-5">
                    <Link
                        href="/create"
                        className="flex flex-row border items-center gap-2 border-gray-900 px-2 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/50 duration-300 ease-in-out"
                    >
                        <p>
                            <AiOutlinePlusCircle />
                        </p>
                        <p>Create Fund</p>
                    </Link>
                    <Link
                        href="/search/trending"
                        className="flex flex-row border items-center gap-2 border-gray-900 px-2 py-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/50 duration-300 ease-in-out"
                    >
                        <p>
                            <AiFillFire />
                        </p>
                        <p>Trending Funds</p>
                    </Link>
                    <Link
                        href="/about"
                        className="flex flex-row border items-center gap-2 border-gray-900 px-2 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/50 duration-300 ease-in-out"
                    >
                        <p>
                            <AiFillInfoCircle />
                        </p>
                        <p>More Info</p>
                    </Link>
                </div>
            </body>
        </Layout>
    );
};

export default Home;
