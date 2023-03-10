import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import network from "../utils/network";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
    return (
        <ThirdwebProvider desiredChainId={network}>
            <Component {...pageProps} />
            <Toaster />
        </ThirdwebProvider>
    );
}

export default MyApp;
