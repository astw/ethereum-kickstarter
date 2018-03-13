const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

var mnemoic =
  "weasel various about woman label guard initial dove famous barely planet indicate";

const provider = new HDWalletProvider(
  mnemoic,
  "https://rinkeby.infura.io/CAV5MLnXGBDc1fZslbyP"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode, arguments: ["Hi there"] })
    .send({ gas: "1000000", from: accounts[0] });

  // find out the address
  console.log("Contract deployed to :", result.options.address);
};

deploy();

/*
0x8E22e54eCE3340a8B2C2dFfB211BaFE1F873f6Bd
Contract deployed to : 0x6A3544f15bBCAC2ac32a5572e1aa7891d87Bb32E
*/
