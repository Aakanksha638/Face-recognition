import React, { useState, useRef } from 'react';
import './App.css';
import Web3 from 'web3';
import Webcam from 'react-webcam';

const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "faceHash",
        "type": "bytes32"
      }
    ],
    "name": "FaceRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "faceHash",
        "type": "bytes32"
      }
    ],
    "name": "registerFace",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userFaces",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "faceHash",
        "type": "bytes32"
      }
    ],
    "name": "verifyFace",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

function App() {
  const [account, setAccount] = useState('');
  const webcamRef = useRef(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        alert('Please install MetaMask');
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert(`Error connecting wallet: ${error.message || error}`);
    }
  };

  const disconnectWallet = () => {
    setAccount('');
  };

  const registerFace = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const imageSrc = webcamRef.current.getScreenshot();
      const faceHash = web3.utils.keccak256(imageSrc);

      await contract.methods.registerFace(faceHash).send({ from: account });
      alert('Face registered successfully');
    } catch (error) {
      console.error("Error registering face:", error);
      alert(`Error registering face: ${error.message || error}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {account ? (
          <>
            <button onClick={disconnectWallet}>Disconnect Wallet</button>
            <p>Connected account: {account}</p>
          </>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        {account && <button onClick={registerFace}>Register Face</button>}
      </header>
    </div>
  );
}

export default App;
