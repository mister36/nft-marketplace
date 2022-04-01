import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ethers } from "ethers";
import { Typography, Button, Loading, Input } from "web3uikit";

import Spacer from "./Spacer";

import "../App.css";

// Token contract, token id, price

function CreateListingModal({ isOpen, createListing }) {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");

  return (
    // <div>
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          width: "50vh",
          height: "55vh",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          borderRadius: "12px",
          paddingTop: "3%",
        },
      }}
    >
      <Typography className="new-listing-modal-text" variant="subtitle1">
        Token Contract Address
      </Typography>
      <Input
        placeholder="0xb794f5ea0ba..."
        name="Test text Input"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />
      <Spacer height={"5%"} />
      <Typography className="new-listing-modal-text" variant="subtitle1">
        Token ID
      </Typography>
      <Input
        className="new-listing-input"
        placeholder="1"
        name="Test text Input"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />
      <Spacer height={"5%"} />
      <Typography className="new-listing-modal-text" variant="subtitle1">
        Price (In Ether)
      </Typography>
      <Input
        placeholder="2"
        name="test"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />

      <Button
        id="create-listing-button"
        size="large"
        text="Create"
        theme="primary"
        type="button"
        onClick={() => createListing(tokenAddress, tokenId, price)}
      />
    </Modal>
    // </div>
  );
}

export default CreateListingModal;
