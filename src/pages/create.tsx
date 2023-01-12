import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import network from "../utils/network";
import {
    useAddress,
    useContract,
    useNetwork,
    useNetworkMismatch,
} from "@thirdweb-dev/react";
import { NATIVE_TOKENS, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import contractAddress from "../contracts/contract";

// Solidity Time is in seconds
// 1 Week = 604800
// 2 Week = 1209600
// 3 Week = 1814400
// 1 Month = 2630000
// 1 Year = 31536000
// ETH to WEI
// 1 ETH = 1000000000000000000 WEI

const create = () => {
    const address = useAddress();
    const router = useRouter();
    const { contract } = useContract(contractAddress);
    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();
    return (
        <Layout>
            <Head>
                <title>Coin Camp: Create Fund</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col bg-gradient-to-r from-black/10 to-black border border-gray-900 mt-5 max-w-6xl mx-auto p-10 text-center items-center justify-center tracking-wide">
                Create
            </div>
        </Layout>
    );
};

export default create;
