import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const error = () => {
    return (
        <Layout>
            <Head>
                <title>Error</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-w-7xl mx-auto flex flex-col justify-center items-center text-center py-36 tracking-widest">
                <div className="font-bold text-3xl pb-10">404 Error!</div>
                <p className="pb-2">
                    Either this page does not exist or an error occured.
                </p>
                <p className="pb-10">Please check your url and try again.</p>
                <p className="text-xs text-gray-500">
                    Please email brodymcdev@gmail.com to report any critical
                    bugs.
                </p>
            </div>
        </Layout>
    );
};

export default error;
