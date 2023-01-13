import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import network from "../utils/network";
import {
    useAddress,
    useContract,
    useContractWrite,
    useContractRead,
    useNetwork,
    useNetworkMismatch,
} from "@thirdweb-dev/react";
import { NATIVE_TOKENS, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import contractAddress from "../contracts/contract";
import { AiOutlinePlusCircle } from "react-icons/ai";

// Solidity Time is in seconds
// 1 Week = 604800
// 2 Week = 1209600
// 3 Week = 1814400
// 1 Month = 2630000
// 1 Year = 31536000
// ETH to WEI
// 1 ETH = 1000000000000000000 WEI

const create = () => {
    // Hooks
    const address = useAddress();
    const router = useRouter();
    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();

    // State Variables for Form
    const [fundAddress, setFundAddress] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [fundTarget, setFundTarget] = useState<number>(0);
    const [endTimeInSeconds, setEndTimeInSeconds] = useState<number>(0);
    const [currentBlockTime, setCurrentBlockTime] = useState<number>(0);

    // Contract Connection and Main Functions
    const { contract } = useContract(contractAddress);
    const { mutateAsync: createCampaign, isLoading } = useContractWrite(
        contract,
        "createCampaign"
    );
    const { data: blockTime, isLoading: loadingBlockTime } = useContractRead(
        contract,
        "getTime"
    );

    const createFund = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let endTimeCalulation = Number(blockTime) + Number(endTimeInSeconds);
        console.log(endTimeCalulation);
        // Need Validation Rules for all the inputs here
        try {
            const data = await createCampaign([
                fundAddress,
                title,
                description,
                fundTarget,
                endTimeCalulation,
            ]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFundAddress(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(e.target.value);
    };

    const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setFundTarget(value);
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTimeInSeconds(Number(e.target.value));
    };

    // Use Effect to prove form updates in console
    useEffect(() => {
        console.log(endTimeInSeconds);
        console.log(fundTarget);
        console.log(description);
        console.log(title);
        console.log(fundAddress);
    }, [endTimeInSeconds, fundTarget, description, title, fundAddress]);

    return (
        <Layout>
            <Head>
                <title>Coin Camp: Create Fund</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col bg-gradient-to-r from-black/10 to-black border border-gray-900 mt-5 max-w-6xl mx-auto p-10 text-center items-center justify-center tracking-widest select-none">
                <p className="text-lg font-bold uppercase tracking-[0.2rem]">
                    Create a Fund
                </p>
                <p className="tracking-wide text-sm text-gray-500 py-10">
                    To create a new fund, please make sure your wallet is
                    connected and then fill out the form below.
                </p>
                <form
                    onSubmit={createFund}
                    className="flex flex-col text-left text-sm text-gray-400 gap-4 w-full md:px-52"
                >
                    <div className="flex flex-col">
                        <label className="pl-2 text-xs">
                            Beneficiary Address
                        </label>
                        <input
                            onChange={handleAddressChange}
                            className="inputSmallerDevices"
                            type="text"
                            maxLength={42}
                            minLength={42}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="pl-2 text-xs">Title of Fund</label>
                        <input
                            onChange={handleTitleChange}
                            className="inputSmallerDevices"
                            type="text"
                            maxLength={65}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="pl-2 text-xs">Description</label>
                        <textarea
                            onChange={handleDescriptionChange}
                            className="inputSmallerDevices h-20 resize-none"
                            maxLength={255}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="pl-2 text-xs">Goal</label>
                        <input
                            className="inputSmallerDevices"
                            type="text"
                            placeholder="0.1 MATIC"
                            onChange={handleGoalChange}
                            maxLength={15}
                        />
                    </div>
                    <div className="flex flex-col gap-2 border border-gray-900 p-4 bg-gradient-to-br from-white/5 to-transparent">
                        <label className="text-xs font-bold">Duration</label>
                        <div className="gap-2">
                            <div className="flex items-center justify-left">
                                <input
                                    className="radioButtons"
                                    type="radio"
                                    name="durationChoice"
                                    value="604800"
                                    onChange={handleRadioChange}
                                />
                                <label>1 Week</label>
                            </div>

                            <div className="flex items-center justify-left">
                                <input
                                    className="radioButtons"
                                    type="radio"
                                    name="durationChoice"
                                    value="2630000"
                                    onChange={handleRadioChange}
                                />
                                <label>1 Month</label>
                            </div>
                            <div className="flex items-center justify-left">
                                <input
                                    className="radioButtons"
                                    type="radio"
                                    name="durationChoice"
                                    value="31536000"
                                    onChange={handleRadioChange}
                                />
                                <label>1 Year</label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mx-auto flex flex-row border items-center justify-center gap-2 border-gray-900 px-2 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/50 hover:text-white duration-300 ease-in-out w-[50%]"
                    >
                        <p>
                            <AiOutlinePlusCircle />
                        </p>
                        <p>Create Fund</p>
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default create;
