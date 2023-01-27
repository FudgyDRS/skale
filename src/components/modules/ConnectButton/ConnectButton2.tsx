import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import {
  Button,
  Text,
  HStack,
  Avatar,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const Profile = () => {
  //console.log(process.env.NEXT_ALCHEMY_KEY)
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return isConnected ? (
    <div>
      <img src={ensAvatar ? ensAvatar : undefined} alt="ENS Avatar" />
      <div>{ensName ? `${ensName} (${address})` : address}</div>
      <div>Connected to {connector?.name}</div>
      <button onClick={() => disconnect}>Disconnect</button>
    </div>
  ) : (
    <>
      <Button onClick={onOpen} size="sm" colorScheme="blue">
        Connect Wallet
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a wallet type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {connectors.map((connector) => (
              <Button
                colorScheme="blue"
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
              </Button>
            ))}

            {error && <div>{error.message}</div>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
