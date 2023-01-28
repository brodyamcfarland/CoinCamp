import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import FundCard from "../../components/FundCard";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import contractAddress from "../../contracts/contract";
import { Triangle } from "react-loader-spinner";

const discover = () => {
    const [allFunds, setAllFunds] = useState<any>([]);
    const { contract } = useContract(contractAddress);
    const { data: getCampaigns } = useContractRead(contract, "getCampaigns");

    useEffect(() => {
        setAllFunds(getCampaigns);
    }, [getCampaigns]);

    return (
        <Layout>
            <Head>
                <title>Coin Camp: Discover</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mainContainer">
                <p className="text-lg font-bold uppercase tracking-[0.2rem]">
                    Discover
                </p>
                <p className="tracking-wide text-xs text-gray-400 py-4 px-10">
                    Welcome to the future of crowdfunding! Our platform allows
                    you to easily discover and support other users. With low
                    transaction fees and fast processing times, supporting your
                    peers has never been easier.
                </p>
                {allFunds ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto scrollbar-thin max-h-full md:max-h-[35rem]">
                        {allFunds
                            ?.map((fund: any, i: number) => (
                                <FundCard fund={fund} i={i} key={i} />
                            ))
                            .reverse()}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center pt-5 pb-10">
                        <Triangle />
                        <span className="py-8 text-emerald-500 animate-pulse tracking-widest">
                            Loading your Funds...
                        </span>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default discover;
