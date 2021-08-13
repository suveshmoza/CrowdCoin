import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const ContributeForm = ({ address }) => {
	const [value, setValue] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const campaign = Campaign(address);
		try {
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.contribute().send({
				from: accounts[0],
				value: web3.utils.toWei(value, "ether"),
			});
			Router.replaceRoute(`/campaigns/${address}`);
		} catch (err) {
			setErrorMsg(err.message);
		}
		setLoading(false), setValue("");
	};

	return (
		<Form onSubmit={onSubmit} error={!!errorMsg}>
			<Form.Field>
				<label>Amount to Contribute</label>
				<Input
					value={value}
					onChange={(event) => setValue(event.target.value)}
					label="ether"
					labelPosition="right"
				/>
				<Message error header="OOPS!" content={errorMsg} />
			</Form.Field>
			<Button primary loading={loading}>
				Contribute!
			</Button>
		</Form>
	);
};
export default ContributeForm;
