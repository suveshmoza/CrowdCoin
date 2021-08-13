import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0xa07645fcA501B91CC868471faa376699E18E2bC6"
);

export default instance;
