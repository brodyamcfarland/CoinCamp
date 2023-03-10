import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Head from "next/head";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import contractAddress from "../../contracts/contract";
import FundCard from "../../components/FundCard";
import { Triangle } from "react-loader-spinner";

const Search = () => {
    const router = useRouter();
    const { search } = router.query;
    const searchQuery: string = String(search).toLowerCase();
    const [allFunds, setAllFunds] = useState<any>([]);
    const { contract } = useContract(contractAddress);
    const { data: getCampaigns } = useContractRead(contract, "getCampaigns");

    useEffect(() => {
        setAllFunds(getCampaigns);
    }, [getCampaigns]);

    return (
        <Layout>
            <Head>
                <title>Coin Camp: Search</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mainContainer">
                <p className="text-lg font-bold uppercase tracking-[0.2rem]">
                    Search
                </p>
                <p className="tracking-wide text-sm text-gray-500 py-4 px-10">
                    <span className="text-white">
                        {
                            allFunds?.filter((fund: any) =>
                                fund.title
                                    .toLowerCase()
                                    .includes(`${searchQuery}`)
                            ).length
                        }
                    </span>{" "}
                    Search Results for:{" "}
                    <span className="text-white">{searchQuery}</span>
                </p>
                {allFunds ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto scrollbar-thin h-full md:h-[35rem]">
                        {allFunds
                            ?.filter((fund: any) =>
                                fund.title
                                    .toLowerCase()
                                    .includes(`${searchQuery}`)
                            )
                            .map((filteredFund: any) => (
                                <FundCard
                                    fund={filteredFund}
                                    key={filteredFund.id}
                                />
                            ))}
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

export default Search;
