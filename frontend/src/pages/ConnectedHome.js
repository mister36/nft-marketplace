import React, { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import Big from "big.js";
import { Typography, Button, Loading } from "web3uikit";

import marketAbi from "../abi/marketAbi.json";
import nftAbi from "../abi/nftAbi.json";
import CreateListingModal from "../components/CreateListingModal";

import "../App.css";

function ConnectedHome({ provider }) {
  const marketAddress = "0xa547199d42984a2a57f2b7bbfef637341af785fd"; // TODO: Remove hardcoding
  const nftAddress = "0x58eF2a822024447663bAE30de6C13d6b330Be9D8"; // TODO: Remove hardcoding
  const [marketContract, setMarketContract] = useState();
  const [nftContract, setNftContract] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(
      marketAddress,
      marketAbi,
      provider
    ).connect(signer);
    const nftContract = new ethers.Contract(
      nftAddress,
      nftAbi,
      provider
    ).connect(signer);

    setMarketContract(marketContract);
    setNftContract(nftContract);
  }, []);

  // Token contract, token id, price
  const createListing = async (tokenAddress, tokenId, price) => {
    let priceInWei = ethers.utils.parseUnits(price, "ether");

    try {
      const account = await provider.listAccounts()[0];
      await nftContract.approve(marketAddress, tokenId);
      await marketContract.listToken(tokenAddress, tokenId, priceInWei, {
        from: account,
      });
      setModalOpen(false);
    } catch (error) {
      console.log("Error creating listing:", error);
    }
  };

  return (
    <div className="ConnectedHome">
      <Button
        id="home-button"
        size="large"
        text="Create listing"
        theme="primary"
        type="button"
        onClick={() => setModalOpen(true)}
      />
      <CreateListingModal isOpen={modalOpen} createListing={createListing} />
    </div>
  );
}

export default ConnectedHome;
