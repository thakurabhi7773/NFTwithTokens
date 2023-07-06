// Connect to the contract using web3.js
var account = null;
var contract= null;
const ABI =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"add","type":"address"}],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkMinting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"createNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"erc20Supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isMintingOn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mintedWallets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"noOfNFTCreated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
const ContractAddress = "0x16c9D8C84c49eC6774E788bD53e2C223f5128b8c";

(async () =>  {
  if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      var accounts = await web3.eth.getAccounts();
      account = accounts[0];
      document.getElementById('walletAddress').textContent = account;
      contract = new web3.eth.Contract(ABI, ContractAddress);
      
      var owners = await contract.methods.owner.call();
       document.getElementById('owner').textContent = owners;

       var Name = await contract.methods.name.call();
       document.getElementById('name').textContent = Name;

       var Symbol = await contract.methods.symbol.call();
       document.getElementById('symbol').textContent = Symbol;
       
       document.getElementById("Create").onclick =() => {
         const result = contract.methods.createNFT().send({ from: accounts[0] });
         console.log(`'NFT created successfully:', ${result}`);
}

       document.getElementById("mint").onclick =() => {
       contract.methods.checkMinting().send({ from: accounts[0] });
       }

    
      
 return contract;
  } else {
      alert("Please install MetaMask to use this dapp.");
  }
})
();


// const web3 = new Web3(window.ethereum);
// async function lookupOwner() {
//   contract = new web3.eth.Contract(ABI, ContractAddress);
//   const tokenId = document.getElementById('tokenId').value;
//   const owner = await contract.methods.ownerOf(tokenId).call();
//   document.getElementById('ownerResult').innerText = `Owner: ${owner}`;
// }