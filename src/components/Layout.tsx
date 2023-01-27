import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col bg-gray-800 min-h-screen text-gray-300">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
