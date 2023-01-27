import * as React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount } from 'wagmi';
import { Button } from '@chakra-ui/react';
import nftABI from 'constants/ABI/MainNFT.json';
import { ethers } from 'ethers';
import { useState } from 'react';

export function MintNFT() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const { address, connector, isConnected } = useAccount();
  const { config } = usePrepareContractWrite({
    address: '0x77eFB7ed59Ca1e35dacA17bAaC473A70fb6E8e54',
    abi: [
      {
        name: 'transferFrom',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [input1, input2, input3],
        outputs: [],
      },
    ],
    functionName: 'transferFrom',
    overrides: {
      from: address,
      gasLimit: ethers.utils.parseEther('0.0000000000001'),
    },
  });
  console.log('config', config);

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <Button colorScheme="blue" disabled={!write} onClick={() => write?.()}>
        Transfer From
      </Button>
      <input type="text" placeholder="From" onChange={(e) => setInput1(e.target.value)} />
      <input type="text" placeholder="To" onChange={(e) => setInput1(e.target.value)} />
      <input type="text" placeholder="Token ID" onChange={(e) => setInput1(e.target.value)} />
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}

export default MintNFT;
