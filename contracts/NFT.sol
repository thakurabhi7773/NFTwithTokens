// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFT_With_Tokens {

    address public owner;
    string public name;
    string public symbol;
    uint256 public erc20Supply = 1000000 * 10**18 ; //1 million ERC20 Tokens 
    uint public noOfNFTCreated;

    uint256 private _tokenId;
    bool public isMintingOn;

    event Transfer(address indexed from, address indexed to, uint256 amount);

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) public mintedWallets;
    mapping(address => uint256) private balances;

    constructor() {
        name = "AbhisheK";
        symbol = "ABHI";
        owner = msg.sender;
        balances[owner] = erc20Supply;
    }

    function balance(address add) public view returns(uint256) {
        return balances[add];
    }

    function transfer(address from, address to, uint256 amount) internal returns(bool) {
        require(balances[from] >= amount, "Not enough tokens");
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        balances[from] -= amount;
        balances[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function ownerOf(uint256 tokenId) public  returns (address) {
         owner = _owners[tokenId];
        require(owner != address(0), "Invalid token ID");
        return owner;
    }

    function checkMinting() external {
        require(msg.sender == owner, "Only owner has rights");
        isMintingOn = !isMintingOn;
    }

    function _mint() internal  {
        require(isMintingOn, "Minting is not on");
        require(msg.sender != owner, "Owner can't mint");
        require(mintedWallets[msg.sender] < 10, "You can't mint more than 10");
        _owners[_tokenId] = msg.sender;
        _tokenId++;
        noOfNFTCreated++;
        mintedWallets[msg.sender]++;
    }

    function createNFT() external {
        require(erc20Supply > 0 , "erc20 supplies shortage");
        _mint();
        uint256 _amount =  1000 * 10**18 ;
        transfer(owner, msg.sender, _amount);
        erc20Supply-=_amount;
    }
}




