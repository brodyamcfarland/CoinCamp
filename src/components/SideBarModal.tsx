import Link from "next/link";

const SideBarModal = () => {
    return (
        <div className="absolute flex flex-col top-12 min-w-fit border border-gray-900 bg-black/40 backdrop-blur-lg tracking-widest">
            <Link href="/">
                <p className="hover:bg-white/5 py-4 duration-500 ease-in-out px-5 border-b border-gray-900 uppercase text-sm">
                    Home
                </p>
            </Link>
            <Link href="/create">
                <p className="hover:bg-white/5 py-4 duration-500 ease-in-out px-5 border-b border-gray-900 uppercase text-sm">
                    Create Fund
                </p>
            </Link>
            <Link href="/search/trending">
                <p className="hover:bg-white/5 py-4 duration-500 ease-in-out px-5 border-b border-gray-900 uppercase text-sm">
                    Trending
                </p>
            </Link>
            <Link href="/about">
                <p className="hover:bg-white/5 py-4 duration-500 ease-in-out px-5 border-b border-gray-900 uppercase text-sm">
                    About
                </p>
            </Link>
        </div>
    );
};

export default SideBarModal;
