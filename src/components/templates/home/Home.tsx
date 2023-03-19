import { CheckCircleIcon, SettingsIcon } from '@chakra-ui/icons';
import { Heading, VStack, List, ListIcon, ListItem } from '@chakra-ui/react';

const Home = () => {
  const Filestorage = require('@skalenetwork/filestorage.js');
  const Web3 = require('web3');

  const web3Provider = new Web3.providers.HttpProvider('https://staging-v3.skalenodes.com/fs/staging-old-mushy-saiph');
  let filestorage = new Filestorage(web3Provider);

  // Directly with http(s)/ws(s) endpoints
  //let filestorage = new Filestorage('----HTTP(s)/WS(s) SKALE ENDPOINT----');
  //Input field to add to your HTML


//JavaScript function for handling the file upload
async function upload(event: any, specificDirectory=''){
  event.preventDefault();
  //create web3 connection
  const web3Provider = new Web3.providers.HttpProvider(
    "https://staging-v3.skalenodes.com/fs/staging-fast-active-bellatrix"
  );
  let web3 = new Web3(web3Provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your account & private key
  //note this must include the 0x prefix
  let privateKey = '0x' + 'fd9073c0cbe98f2ad6a166c6649d1304f35a186b86d92937800382d3e8b38a17';
  let account = "0x1fDFc53Ac8e31c4DEe0940E73ddAA72652aFd9bf";

  //get file data from file upload input field
  let file = (document.getElementById('files') as HTMLInputElement)?.files![0];
  let reader = new FileReader();

  //file path in account tree (dirA/file.name)
  let filePath: any;
  if (specificDirectory === '') {
    filePath = file.name;
  } else {
    filePath = specificDirectory + '/' + file.name;
  }

  //file storage method to upload file
  reader.onload = async function(e) {
    const arrayBuffer = reader.result
    const bytes = new Uint8Array(arrayBuffer as ArrayBuffer);
    let link = filestorage.uploadFile(
      account,
      filePath,
      bytes,
      privateKey
    );
  };
  reader.readAsArrayBuffer(file);
}
  return (
    <VStack w={'full'}>
      <Heading size="md" marginBottom={6}>
        Uploading Files to Skale FileStorage
      </Heading>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Smart contract deployment to Sepolia Testnet
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Smart contract verified on Sepolia Testnet
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Upload Docs
          <input onChange={(e) => upload(e)} type="file" id="files" />
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Display ERC20 balances
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Display NFT balances
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Display NFT transfers
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Multichain Support
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Using Moralis from client-side
        </ListItem>
        <ListItem>
          <ListIcon as={SettingsIcon} color="green.500" />
          Adding explorer links to balances, transactions ...
        </ListItem>
        <ListItem>
          <ListIcon as={SettingsIcon} color="green.500" />
          Better responsive design
        </ListItem>
        <ListItem>
          <ListIcon as={SettingsIcon} color="green.500" />
          Rainbowkit integration
        </ListItem>
        <ListItem>
          <ListIcon as={SettingsIcon} color="green.500" />
          ... and more
        </ListItem>
      </List>
    </VStack>
  );
};

export default Home;
