import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const Home: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Template</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-w-7xl mx-auto p-10">Home Page</div>
        </Layout>
    );
};

export default Home;
