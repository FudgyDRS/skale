import * as React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount } from 'wagmi';
import { Button } from '@chakra-ui/react';
import nftABI from 'constants/ABI/MainNFT.json';
import { ethers } from 'ethers';
import { useState } from 'react';

function useInput({ type }: any) {
  const [value, setValue] = useState('');
  const input = <input value={value} onChange={(e) => setValue(e.target.value)} type={type} />;
  return [value, input];
}

export function MintNFT() {
  const { address, connector, isConnected } = useAccount();
  const { config } = usePrepareContractWrite({
    address: '0x77eFB7ed59Ca1e35dacA17bAaC473A70fb6E8e54',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
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
        Mint
      </Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}

export default MintNFT;
