import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import CountDownTimer from "../../components/CountDownTimer";
import contractAddress from "../../contracts/contract";
import {
    useAddress,
    useContract,
    useContractWrite,
    useContractRead,
    useNetwork,
    useNetworkMismatch,
} from "@thirdweb-dev/react";
import Image from 'next/image';
import { Line } from "rc-progress";
import { Triangle } from 'react-loader-spinner';

// Need to use Countdown timer by calling getTimeLeft function and storing that value in state
// Need to display funds in LIFO style
const discover = () => {
    const [allFunds, setAllFunds] = useState<any>([]);
    const { contract } = useContract(contractAddress);
    const { data: getTime, isLoading: loadingBlockTime } = useContractRead(
        contract,
        "getTime"
    );
    const { data: getCampaigns, isLoading } = useContractRead(
        contract,
        "getCampaigns"
    );

    const consoleLog = () => {
        console.log(allFunds);
    };

    useEffect(() => {
        setAllFunds(getCampaigns);
    }, [getCampaigns]);

    return (
        <Layout>
            <Head>
                <title>Coin Camp: Discover</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col bg-gradient-to-r from-black/10 to-black border border-gray-900 mt-5 max-w-6xl mx-auto p-10 text-center items-center justify-center tracking-wide">
                <p className="text-lg font-bold uppercase tracking-[0.2rem]">
                    Discover
                </p>
                <p className="tracking-wide text-sm text-gray-500 py-10">
                    Welcome to the future of crowdfunding! Our platform allows
                    you to easily discover and support other users. With low
                    transaction fees and fast processing times, supporting your
                    peers has never been easier.
                </p>
                <div className="border border-gray-900 w-full px-3 bg-gradient-to-br from-white/5 to-transparent pb-4">
                    <p className="tracking-widest text-sm py-2">
                        ACTIVE FUNDS
                    </p>
                    {allFunds ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-2">
                        {allFunds?.map((fund: any, i: number) => (
                            <div className="flex flex-col gap-1 border border-gray-900 bg-black/50 px-4 py-2 hover:border-white duration-300" key={i}>
                                <p className="text-sm tracking-widest font-bold pb-2">{fund.title}</p>
                                <p className="text-xs text-left pb-2 text-gray-400">{fund.description}</p>
                                <Line percent={Number(fund.amountCollected)/Number(fund.target)} strokeWidth={1} strokeColor={"#34dd3a"}/>
                                <div className="flex text-xs text-left gap-5">
                                    <div className="flex flex-row items-center">
                                        <p className="text-gray-600 pr-2">RAISED: </p>
                                        <p className="mr-1">{Number(fund.amountCollected)}</p>
                                        <Image
                                            src={"/polygonLogo.png"}
                                            width={100}
                                            height={100}
                                            alt="Avatar"
                                            className="h-4 w-4 rounded-full border border-gray-900 object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <p className="text-gray-600 pr-2">GOAL: </p>
                                        <p className="mr-1">{Number(fund.target)}</p>
                                        <Image
                                            src={"/polygonLogo.png"}
                                            width={100}
                                            height={100}
                                            alt="Avatar"
                                            className="h-4 w-4 rounded-full border border-gray-900 object-cover"
                                        />
                                    </div>
                                    {fund.active ? (
                                        <p className="text-emerald-500">ACTIVE</p>
                                    ):(
                                        <p className="text-red-500">CLOSED</p>
                                    )}
                                </div>
                                <div className="flex items-center justify-left border border-gray-900 divide-x-[1px] divide-gray-900">
                                    <p className="tracking-widest font-bold uppercase text-sm px-2">Time Left</p>
                                    <div className="px-2 bg-gradient-to-r from-white/5 to-transparent">LALALA</div>
                                </div>
                                <CountDownTimer index={i}/>
                            </div>
                        ))}
                    </div>
                    ):(
                        <div className="flex justify-center items-center pt-5 pb-10">
                            <Triangle/>
                        </div>
                    )}
                </div>
                <button onClick={consoleLog}>Test</button>
            </div>
        </Layout>
    );
};

export default discover;
