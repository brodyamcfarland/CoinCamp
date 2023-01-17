import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import CountDownTimer from "../../components/CountDownTimer";
import contractAddress from "../../contracts/contract";
import {
    useAddress,
    useContract,
    useContractWrite,
    useContractRead,
} from "@thirdweb-dev/react";
import Image from "next/image";
import { Line } from "rc-progress";
import { Triangle } from "react-loader-spinner";
import { AiOutlineCopy, AiOutlinePlusCircle } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";

const discover = () => {
    const address = useAddress();
    const [allFunds, setAllFunds] = useState<any>([]);
    const [donation, setDonation] = useState<number>(0);
    const { contract } = useContract(contractAddress);
    const { data: getCampaigns } = useContractRead(contract, "getCampaigns");
    const { mutateAsync: donateToCampaign, isLoading: donateLoading } =
        useContractWrite(contract, "donateToCampaign");

    const consoleLog = () => {
        console.log(allFunds);
    };

    const textRef = useRef<HTMLParagraphElement>(null);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(textRef.current?.textContent || "");
        toast.success("Copied Address to Clipboard");
    };

    const handleDonate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDonation(Number(e.target.value));
    };

    const sendDonation = async (i: string) => {
        if (!donation || donation === 0) {
            toast.error("Please enter an amount greater than 0.");
            return;
        }
        if (donation < 0.0000001) {
            toast.error("Value is too small. Please increase donation.");
            return;
        }
        toast.loading("Submitting Donation.");
        try {
            await contract?.call("donateToCampaign", i, {
                gasLimit: 1000000,
                value: ethers.utils.parseEther(donation.toString()),
            });
            toast.success("Thank you! Your donation has been processed!");
        } catch (err) {
            toast.error(
                "An error occured. Please check your inputs and try again."
            );
        }
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
            <div className="flex flex-col bg-gradient-to-r from-black/10 to-black border border-gray-900 mt-2 max-w-7xl mx-auto p-2 md:p-10 text-center items-center justify-center tracking-wide select-none">
                <p className="text-lg font-bold uppercase tracking-[0.2rem]">
                    Discover
                </p>
                <button onClick={consoleLog}>Pressss</button>
                <p className="tracking-wide text-sm text-gray-500 py-8 px-10">
                    Welcome to the future of crowdfunding! Our platform allows
                    you to easily discover and support other users. With low
                    transaction fees and fast processing times, supporting your
                    peers has never been easier.
                </p>
                <div className="border border-gray-900 w-full px-3 bg-gradient-to-br from-white/5 to-transparent pb-4 h-max">
                    <p className="tracking-widest text-sm py-2">ACTIVE FUNDS</p>
                    {allFunds ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-scroll scrollbar-thin h-max">
                            {allFunds
                                ?.map((fund: any, i: number) => (
                                    <div
                                        className="flex flex-col gap-1 border border-gray-900 bg-black/50 px-4 py-2 hover:border-white duration-300"
                                        key={i}
                                    >
                                        <p className="text-sm tracking-widest font-bold pb-2">
                                            {fund.title}
                                        </p>
                                        <p className="text-xs text-left pb-2 text-gray-400">
                                            {fund.description}
                                        </p>
                                        <Line
                                            percent={
                                                (Number(fund.amountCollected) /
                                                    Number(fund.target)) *
                                                100
                                            }
                                            strokeWidth={1}
                                            strokeColor={"#34dd3a"}
                                        />
                                        <div className="flex items-center text-xs text-left gap-5 py-1">
                                            <div className="flex flex-row items-center">
                                                <p className="text-gray-600 pr-2">
                                                    RAISED:{" "}
                                                </p>
                                                <p className="mr-1">
                                                    {ethers.utils.formatEther(
                                                        fund.amountCollected
                                                    )}
                                                </p>
                                                <Image
                                                    src={"/polygonLogo.png"}
                                                    width={100}
                                                    height={100}
                                                    alt="Avatar"
                                                    className="h-4 w-4 rounded-full border border-gray-900 object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-row flex-1 items-center">
                                                <p className="text-gray-600 pr-2">
                                                    GOAL:{" "}
                                                </p>
                                                <p className="mr-1">
                                                    {ethers.utils.formatEther(
                                                        fund.target
                                                    )}
                                                </p>
                                                <Image
                                                    src={"/polygonLogo.png"}
                                                    width={100}
                                                    height={100}
                                                    alt="Avatar"
                                                    className="h-4 w-4 rounded-full border border-gray-900 object-cover"
                                                />
                                            </div>
                                            {fund.active ? (
                                                <FaCircle fill="green" />
                                            ) : (
                                                <FaCircle fill="red" />
                                            )}
                                        </div>
                                        {fund.active ? (
                                            <div className="flex items-center justify-left border border-gray-900 divide-x-[1px] divide-gray-900">
                                                <p className="tracking-widest font-bold uppercase text-xs px-2">
                                                    Time Left
                                                </p>
                                                <div className="px-2 bg-gradient-to-r from-white/5 to-transparent">
                                                    <CountDownTimer index={i} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                {fund.amountCollected >
                                                fund.target ? (
                                                    <p className="text-xs text-emerald-500">
                                                        Goal Reached!
                                                    </p>
                                                ) : (
                                                    <p className="text-xs text-red-500">
                                                        Funding is closed.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        <div className="flex flex-col pt-3">
                                            <p className="text-[10px] text-gray-500">
                                                Donators
                                            </p>
                                            <div className="flex flex-col h-24 border border-gray-900 overflow-y-auto scrollbar-thin">
                                                {fund.donators.map(
                                                    (donator: string) => (
                                                        <span className="text-[10px] text-gray-500 border border-gray-900">
                                                            {donator}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col text-center py-1 mt-auto">
                                            <span className="text-[10px] text-gray-500">
                                                Beneficiary
                                            </span>
                                            <div className="flex border border-gray-900 divide-x-[1px] divide-gray-900">
                                                <p
                                                    className="text-[10px] select-text flex-1"
                                                    ref={textRef}
                                                >
                                                    {fund.owner}
                                                </p>
                                                <button
                                                    onClick={handleCopyClick}
                                                    className="px-2 hover:bg-white/10"
                                                >
                                                    <AiOutlineCopy size={10} />
                                                </button>
                                            </div>
                                        </div>
                                        {fund.active ? (
                                            <div className="flex py-1">
                                                <div className="flex relative items-center flex-1">
                                                    <input
                                                        className="inputSmallerDevices flex-1"
                                                        type="text"
                                                        placeholder="0.1 MATIC"
                                                        maxLength={15}
                                                        onChange={handleDonate}
                                                    />
                                                    <div className="flex gap-1 items-center absolute right-4">
                                                        <Image
                                                            src={
                                                                "/polygonLogo.png"
                                                            }
                                                            width={100}
                                                            height={100}
                                                            alt="Avatar"
                                                            className="h-5 w-5 rounded-full border border-gray-900 object-cover"
                                                        />
                                                        <p className="text-xs text-gray-500">
                                                            MATIC
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        sendDonation(
                                                            i.toString()
                                                        )
                                                    }
                                                    className="px-2 gap-2 flex items-center justify-center text-xs text-gray-500 border-gray-900 border hover:to-emerald-500/50 hover:from-emerald-500/30 bg-gradient-to-tl from-transparent to-emerald-500/20  duration-300 hover:text-white hover:border-white"
                                                >
                                                    <AiOutlinePlusCircle
                                                        size={18}
                                                    />
                                                    <p>DONATE</p>
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                ))
                                .reverse()}
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center pt-5 pb-10">
                            <Triangle />
                            <span className="py-8 text-emerald-500 animate-pulse tracking-widest">
                                Loading all Funds...
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default discover;
