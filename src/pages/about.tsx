import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";
import { BiQrScan } from "react-icons/bi";

const about = () => {
    return (
        <Layout>
            <Head>
                <title>Coin Camp: About</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mainContainer">
                <p className="text-lg font-bold uppercase tracking-[0.2rem]">
                    About
                </p>
                <p className="tracking-wide text-xs text-gray-400 py-4 px-10 text-left">
                    Coin Camp was designed to allow users to help others in a
                    decentralized fashion. Users will need to have the MetaMask
                    extension installed in their browser in order to interact
                    with the smart contract. All Funds route directly to the
                    beneficiary, so no withdraw transaction is needed. Please
                    make sure you are connected to the Polygon Mumbai Testnet as
                    this website is for demonstration and proof-of-concept
                    purposes. Below you will find all information to contact the
                    team, logic behind the smart contract, and the source code.
                </p>
                <div className="flex flex-row max-w-xl px-10">
                    <Image
                        src={"/FlowChart.png"}
                        width={250}
                        height={400}
                        alt="Avatar"
                        className="object-fit"
                    />
                    <div className="hidden md:flex flex-col justify-between py-16 text-left text-gray-300 px-4">
                        <p className="tracking-wide text-xs py-4">
                            Users can interact with the smart contract by either
                            CREATING A FUND or DONATING to another fund.
                        </p>
                        <p className="tracking-wide text-xs py-4">
                            The smart contract contains all of the code for the
                            crowdfund. It computes all of the crowd-funding
                            logic and stores all of the data on the blockchain.
                        </p>
                        <p className="tracking-wide text-xs py-4">
                            Funds will be automatically deposited to the
                            beneficiary's address.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center mt-6 gap-4">
                    <div className="flex flex-col gap-1 px-4 border items-center py-2 border-gray-900 bg-white/5">
                        <span className="text-left text-sm">
                            Contract Address
                        </span>
                        <span className="text-xs text-orange-600 select-text">
                            0xbE5698Ac395d2655aEEb53e11B7bfaDF5BF58A7D
                        </span>
                    </div>
                    <div className="flex gap-10 md:gap-4 justify-center items-center">
                        <Link
                            href="https://mumbai.polygonscan.com/address/0xbE5698Ac395d2655aEEb53e11B7bfaDF5BF58A7D"
                            className="hover:text-purple-600 duration-300 flex flex-col items-center"
                            target="_blank"
                        >
                            <BiQrScan
                                size={26}
                                className="hover:fill-purple-600"
                            />
                            <span className="text-[9px]">EXPLORER</span>
                        </Link>
                        <Link
                            href="https://github.com/brodyamcfarland"
                            className="hover:text-purple-600 duration-300 flex flex-col"
                            target="_blank"
                        >
                            <AiOutlineGithub
                                size={26}
                                className="hover:fill-purple-600"
                            />
                            <span className="text-[9px]">DEV</span>
                        </Link>
                        <Link
                            href="https://github.com/brodyamcfarland/CoinCamp"
                            className="hover:text-purple-600 duration-300 flex flex-col items-center"
                            target="_blank"
                        >
                            <AiOutlineGithub
                                size={26}
                                className="hover:fill-purple-600"
                            />
                            <span className="text-[9px]">SOURCE</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default about;
