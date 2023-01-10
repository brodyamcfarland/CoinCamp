import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";

const create = () => {
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
