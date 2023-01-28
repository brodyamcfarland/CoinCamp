import React, { useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Countdown from "react-countdown";
import contractAddress from "../contracts/contract";
import { ThreeDots } from "react-loader-spinner";

interface Props {
    fundId: number;
}

interface RenderProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountDownTimer = ({ fundId }: Props) => {
    const { contract } = useContract(contractAddress);
    const {
        data,
        isLoading: isLoadingExpiration,
        error: timeEnded,
    } = useContractRead(contract, "getTimeLeft", fundId);
    const renderer = ({ days, hours, minutes, seconds }: RenderProps) => {
        return (
            <div className="flex flex-row gap-2 divide-x-[1px] divide-gray-900">
                <div className="flex">
                    <div className="px-1">{days}</div>
                    <div className="text-[10px] text-gray-500">Days</div>
                </div>
                <div className="flex">
                    <div className="px-1">{hours}</div>
                    <div className="text-[10px] text-gray-500">Hr</div>
                </div>
                <div className="flex">
                    <div className="px-1">{minutes}</div>
                    <div className="text-[10px] text-gray-500">Min</div>
                </div>
                <div className="flex">
                    <div className="px-1">{seconds}</div>
                    <div className="text-[10px] text-gray-500">Sec</div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {isLoadingExpiration ? (
                <ThreeDots height={25} width={30} />
            ) : (
                <>
                    {timeEnded ? (
                        <p className="text-red-500 text-sm py-[3px]">EXPIRED</p>
                    ) : (
                        <Countdown
                            date={Date.now() + Number(data) * 1000}
                            renderer={renderer}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default CountDownTimer;
