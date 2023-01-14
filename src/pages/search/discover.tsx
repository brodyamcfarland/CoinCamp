import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import contractAddress from "../../contracts/contract";
import {
    useAddress,
    useContract,
    useContractWrite,
    useContractRead,
    useNetwork,
    useNetworkMismatch,
} from "@thirdweb-dev/react";

const discover = () => {
    const [allFunds, setAllFunds] = useState<any>([]);
    const { contract } = useContract(contractAddress);
    const { data: blockTime, isLoading: loadingBlockTime } = useContractRead(
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
                <div className="border border-gray-900 w-full px-3 bg-white/5">
                    <p className="tracking-widest text-sm py-2 border-b-[1px] border-black mb-2">
                        NEWLY ACTIVE FUNDS
                    </p>
                </div>
                <button onClick={consoleLog}>Test</button>
            </div>
        </Layout>
    );
};

export default discover;
