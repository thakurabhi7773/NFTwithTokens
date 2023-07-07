
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT_With_Tokens", function () {
  let nftWithTokens;
  let owner;
  let wallet1;
  let wallet2;

  beforeEach(async function () {
    // Deploy the NFT_With_Tokens contract
    const NFTWithTokens = await ethers.getContractFactory("NFT_With_Tokens");
    nftWithTokens = await NFTWithTokens.deploy();
    await nftWithTokens.deployed();
    [owner, wallet1, wallet2] = await ethers.getSigners();
  });

  it("should have the correct name and symbol", async function () {
    expect(await nftWithTokens.name()).to.equal("AbhisheK");
    expect(await nftWithTokens.symbol()).to.equal("ABHI");
  });

  it("should allow balance check", async function () {
    const balance = await nftWithTokens.balance(owner.address);
    expect(balance).to.equal(10 * 10**6);
  });
  
  
  it("should allow creating NFTs and transferring ERC20 tokens", async function () {

    const ownerBalanceBefore = await nftWithTokens.balance(owner.address);
    const wallet1BalanceBefore = await nftWithTokens.balance(wallet1.address);

    await nftWithTokens.connect(wallet1).createNFT();
    
    await nftWithTokens.connect(wallet1)._mint();
    const tokenOwner = await nftWithTokens.ownerOf(0);
    expect(tokenOwner).to.equal(wallet1.address);

    const ownerBalanceAfter = await nftWithTokens.balance(owner.address);
    const wallet1BalanceAfter = await nftWithTokens.balance(wallet1.address);

    expect(ownerBalanceAfter).to.equal(ownerBalanceBefore - (10 * 10**2));
    expect(wallet1BalanceAfter).to.equal(wallet1BalanceBefore + (10 * 10**2));

    // const tokenOwner = await nftWithTokens.ownerOf(0);
    // expect(tokenOwner).to.equal(wallet1.address);
  });

  it("should allow owner to check minting status", async function () {
    const initialMintingStatus = await nftWithTokens.isMintingOn();
    await nftWithTokens.checkMinting();
    const updatedMintingStatus = await nftWithTokens.isMintingOn();

    expect(updatedMintingStatus).to.not.equal(initialMintingStatus);
  });
});