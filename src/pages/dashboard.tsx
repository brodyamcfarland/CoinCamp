import Layout from "../components/Layout";
import Head from "next/head";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import contractAddress from "../contracts/contract";
import { Triangle } from "react-loader-spinner";
import FundCard from "../components/FundCard";

const dashboard = () => {
    const [allFunds, setAllFunds] = useState<any>([]);
    const { contract } = useContract(contractAddress);
    const { data: getCampaigns } = useContractRead(contract, "getCampaigns");
    const address = useAddress();

    useEffect(() => {
        setAllFunds(getCampaigns);
    }, [getCampaigns]);

    return (
        <Layout>
            <Head>
                <title>Coin Camp: My Funds</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mainContainer to-[#270024]">
                <p className="text-lg font-bold uppercase tracking-[0.2rem]">
                    DASHBOARD
                </p>
                <p className="tracking-wide text-xs text-gray-500 py-4 px-10">
                    Below you will find all of the funds where your wallet
                    address is the beneficiary to the crowdfund.
                </p>

                {address ? (
                    <>
                        {allFunds ? (
                            <>
                                {allFunds.filter(
                                    (fund: any) => fund.owner === address
                                ).length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto scrollbar-thin h-full md:max-h-[35rem]">
                                        {allFunds
                                            .filter(
                                                (fund: any) =>
                                                    fund.owner === address
                                            )
                                            .map((fund: any) => (
                                                <FundCard
                                                    fund={fund}
                                                    key={fund.id}
                                                />
                                            ))
                                            .reverse()}
                                    </div>
                                ) : (
                                    <p>No funds found for this address.</p>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col justify-center items-center pt-5 pb-10">
                                <Triangle />
                                <span className="py-8 text-emerald-500 animate-pulse tracking-widest">
                                    Loading your Funds...
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <span className="py-20 text-red-500">
                        Please connect your wallet.
                    </span>
                )}
            </div>
        </Layout>
    );
};

export default dashboard;
