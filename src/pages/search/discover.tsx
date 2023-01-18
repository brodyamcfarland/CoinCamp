import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import FundCards from "../../components/FundCards";

const discover = () => {
    return (
        <Layout>
            <Head>
                <title>Coin Camp: Discover</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col bg-gradient-to-r from-black/10 to-black border border-gray-900 mt-2 max-w-7xl mx-auto p-2 py-4 text-center items-center justify-center tracking-wide select-none">
                <p className="text-lg font-bold uppercase tracking-[0.2rem]">
                    Discover
                </p>
                <p className="tracking-wide text-xs text-gray-500 py-4 px-10">
                    Welcome to the future of crowdfunding! Our platform allows
                    you to easily discover and support other users. With low
                    transaction fees and fast processing times, supporting your
                    peers has never been easier.
                </p>
                <FundCards />
            </div>
        </Layout>
    );
};

export default discover;
