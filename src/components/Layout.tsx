import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col bg-gradient-to-tr from-gray-900 to-black min-h-screen text-gray-300">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
