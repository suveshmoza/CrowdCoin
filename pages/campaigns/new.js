import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const CampaignNew = () => {
	const [minimumContribution, setMinimumContribution] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = async (event) => {
		event.preventDefault();
		setLoading(true), setErrorMsg("");
		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods.createCampaign(minimumContribution).send({
				from: accounts[0],
			});
			Router.pushRoute("/");
		} catch (err) {
			setErrorMsg(err.message);
		}
		setLoading(false);
	};

	return (
		<Layout>
			<h3>Create a Campaign</h3>
			<Form onSubmit={onSubmit} error={!!errorMsg}>
				<Form.Field>
					<label>Minimum Contribution</label>
					<Input
						labelPosition="right"
						label="wei"
						value={minimumContribution}
						onChange={(event) => setMinimumContribution(event.target.value)}
					/>
					<Message error header="OOPS!" content={errorMsg} />
				</Form.Field>
				<Button primary loading={loading}>
					Create
				</Button>
			</Form>
		</Layout>
	);
};

export default CampaignNew;
