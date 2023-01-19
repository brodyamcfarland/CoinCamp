import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";

const about = () => {
    return (
        <Layout>
            <Head>
                <title>Coin Camp: About</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col bg-gradient-to-r from-black/10 to-black border border-gray-900 mt-2 max-w-7xl mx-auto p-2 py-4 text-center items-center justify-center tracking-wide select-none">
                <p className="text-lg font-bold uppercase tracking-[0.2rem]">
                    About
                </p>
                <p className="tracking-wide text-xs text-gray-500 py-4 px-10">
                    Coin Camp was designed to allow users to help others in a
                    decentralized fashion. Users will need to have the MetaMask
                    extension installed in their browser in order to interact
                    with the smart contract. All Funds route directly to the
                    beneficiary, so no withdraw transaction is needed. Please
                    make sure you are connected to the Polygon Mumbai Testnet as
                    this website is for demonstration and proof-of-concept
                    purposes. Below you will find all information to contact the
                    team, logic behind the smart contract, and the tools used to
                    make the website.
                </p>
            </div>
        </Layout>
    );
};

export default about;
