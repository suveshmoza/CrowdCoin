const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
	"long panda enter during process nuclear rent snack load shaft number globe",
	"https://rinkeby.infura.io/v3/53bd0d559c524e88899fd22697d886c7"
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log(accounts[0]);
	const result = await new web3.eth.Contract(
		JSON.parse(compiledFactory.interface)
	)
		.deploy({
			data: compiledFactory.bytecode,
		})
		.send({ gas: "1000000", from: accounts[0] });
	console.log(result.options.address);
};
deploy();
