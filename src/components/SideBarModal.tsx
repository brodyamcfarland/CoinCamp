import React from "react";

const SideBarModal = () => {
    return (
        <div className="absolute flex flex-col top-12 border border-gray-900 px-10 py-3 bg-black/40 gap-3 backdrop-blur-lg">
            <p className="hover:bg-white/5 py-2 px-2">Home</p>
            <p className="hover:bg-white/5 py-2 px-2">Create A Fund</p>
            <p className="hover:bg-white/5 py-2 px-2">Trending</p>
            <p className="hover:bg-white/5 py-2 px-2">About</p>
        </div>
    );
};

export default SideBarModal;
