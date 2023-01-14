import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import network from "../utils/network";
import Image from "next/image";
import {
    useAddress,
    useContract,
    useContractWrite,
    useContractRead,
    useNetwork,
    useNetworkMismatch,
} from "@thirdweb-dev/react";
import { NATIVE_TOKENS, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk"; // Might need this
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import contractAddress from "../contracts/contract";
import { AiOutlinePlusCircle } from "react-icons/ai";

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

        if (fundAddress.length !== 42) {
            toast.error(
                "Please Enter a Valid Address (42 Characters starting with '0x...')"
            );
            return;
        }
        if (title.length < 1) {
            toast.error("Please enter a title.");
            return;
        }
        if (description.length < 1) {
            toast.error("Please enter a description.");
            return;
        }
        if (!fundTarget) {
            toast.error("Please enter a goal in MATIC.");
            return;
        }
        if (!endTimeInSeconds) {
            toast.error("Please pick a duration for the fund.");
            return;
        }
        let endTimeCalulation = Number(blockTime) + Number(endTimeInSeconds);
        try {
            const data = await createCampaign([
                fundAddress,
                title,
                description,
                fundTarget,
                endTimeCalulation,
            ]);
            console.info("Fund has successfully been created.", data);
            toast.success("Your Fund has successfully been created!");
        } catch (err) {
            console.error(
                "Something went wrong! Please check parameters and try again. Error: ",
                err
            );
            toast.error(
                "Something went wrong! Please check inputs and try again."
            );
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

    const handleAddAddress = (e: any) => {
        e.preventDefault();
        if (address) {
            setFundAddress(String(address));
        } else {
            toast.error("Please Connect Your Wallet");
        }
    };

    // Use Effect to prove form updates in console
    useEffect(() => {
        console.log("End Time Set to:" + " " + endTimeInSeconds);
        console.log("Fund Target Set to:" + " " + fundTarget);
        console.log("Description Set to:" + " " + description);
        console.log("Title Set to:" + " " + title);
        console.log("Address Set to:" + " " + fundAddress);
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
                        <div className="flex">
                            <input
                                onChange={handleAddressChange}
                                className="inputSmallerDevices flex-1"
                                type="text"
                                placeholder="0x0000000000000000000000000000000000000000"
                                value={fundAddress}
                                maxLength={42}
                                minLength={42}
                                id="addressValue"
                            />
                            <button
                                onClick={handleAddAddress}
                                className="px-2 gap-2 flex items-center justify-center text-xs text-gray-500 border-gray-900 border hover:bg-white/5 bg-transparent duration-300 hover:text-white hover:border-white"
                            >
                                <AiOutlinePlusCircle size={18} />
                                <p>Add Wallet</p>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="pl-2 text-xs">Title of Fund</label>
                        <input
                            onChange={handleTitleChange}
                            className="inputSmallerDevices"
                            type="text"
                            maxLength={65}
                            placeholder="..."
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="pl-2 text-xs">Description</label>
                        <textarea
                            onChange={handleDescriptionChange}
                            className="inputSmallerDevices h-20 resize-none"
                            maxLength={255}
                            placeholder="..."
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="pl-2 text-xs">Goal</label>
                        <div className="flex relative items-center">
                            <input
                                className="inputSmallerDevices flex-1"
                                type="text"
                                placeholder="0.1 MATIC"
                                onChange={handleGoalChange}
                                maxLength={15}
                            />
                            <div className="flex gap-1 items-center absolute right-4">
                                <Image
                                    src={"/polygonLogo.png"}
                                    width={100}
                                    height={100}
                                    alt="Avatar"
                                    className="h-5 w-5 rounded-full border border-gray-900 object-cover"
                                />
                                <p className="text-xs text-gray-500">MATIC</p>
                            </div>
                        </div>
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
