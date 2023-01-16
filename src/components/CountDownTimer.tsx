import React, { useEffect } from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import Countdown from 'react-countdown';
import contractAddress from '../contracts/contract';
import {ThreeDots } from 'react-loader-spinner';

interface Props {
    index: number;
}

const CountDownTimer = ({ index }: Props) => {
    const { contract } = useContract(contractAddress);
    const { data, isLoading: isLoadingExpiration } = useContractRead(contract, "getTimeLeft", index);
    console.log(new Date(Number(data) * 10000))
    

  return (
    <div>
        {isLoadingExpiration ? (
            <ThreeDots/>
        ):(
            <div className='flex flex-col'>
                <span>TimeLeft: {Number(data)}</span>
                <Countdown date={Date.now() + (Number(data) * 1000)}/>
            </div>
        )}
    </div>
  )
}

export default CountDownTimer