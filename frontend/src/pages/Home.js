import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Typography, Button, Loading } from "web3uikit";

import ConnectedHome from "./ConnectedHome";

import "../App.css";

const Home = () => {
  const [provider, setProvider] = useState();
  const [connected, setConnected] = useState();
  const [loading, setLoading] = useState(true);

  const setUpWeb3 = async () => {
    const providerOptions = {
      /* See Provider Options Section */
    };

    const web3Modal = new Web3Modal({
      network: "rinkeby", // TODO: Find real network option
      cacheProvider: true,
      providerOptions,
    });

    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);
    setProvider(provider);
    const signer = provider.getSigner();
    setConnected(true);
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const isMetaMaskConnected = async () => {
      const accounts = await provider.listAccounts();
      return accounts.length > 0;
    };

    isMetaMaskConnected()
      .then((connected) => {
        setLoading(false);
        if (connected) {
          setProvider(provider);
          setConnected(true);
        }
      })
      .catch((err) => {
        console.log("THIS IS ERROR", err);
      });
  }, []);

  return (
    <div className="Home">
      <Typography variant="h1" color={"white"}>
        Welcome to the NFT Marketplace!
      </Typography>
      {loading ? (
        <div id="home-loader-container">
          <Loading
            id="home-loader"
            size={12}
            spinnerColor="green"
            spinnerType="wave"
          />
        </div>
      ) : null}
      {!connected ? (
        <>
          <Typography variant="subtitle1" id="home-subtitle" color={"white"}>
            Connect to your Metamask account to start shopping.
          </Typography>
          <Button
            id="home-button"
            size="large"
            text="Connect"
            theme="primary"
            type="button"
            onClick={setUpWeb3}
          />
        </>
      ) : (
        <ConnectedHome provider={provider} />
      )}
    </div>
  );
};

export default Home;
