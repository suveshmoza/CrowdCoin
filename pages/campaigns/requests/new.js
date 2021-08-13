// continue from 201
import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

const RequestNew = ({ address }) => {
	const [value, setValue] = useState("");
	const [description, setDescription] = useState("");
	const [recipient, setRecipient] = useState("");
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		const campaign = Campaign(address);
		setLoading(true);
		setErrorMsg("");
		try {
			const accounts = await web3.eth.getAccounts();
			await campaign.methods
				.createRequest(description, web3.utils.toWei(value, "ether"), recipient)
				.send({ from: accounts[0] });
			Router.pushRoute(`/campaigns/${address}/requests`);
		} catch (err) {
			setErrorMsg(err.message);
		}
		setLoading(false);
	};

	return (
		<Layout>
			<Link route={`/campaigns/${address}/requests`}>
				<a>Back</a>
			</Link>
			<h3>Create a Request</h3>
			<Form error={!!errorMsg} onSubmit={onSubmit}>
				<Form.Field>
					<label>Description</label>
					<Input
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Value in Ether</label>
					<Input
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Recipient</label>
					<Input
						value={recipient}
						onChange={(e) => {
							setRecipient(e.target.value);
						}}
					/>
				</Form.Field>
				<Message error header="OOPS!" content={errorMsg} />
				<Button primary loading={loading}>
					Create!
				</Button>
			</Form>
		</Layout>
	);
};

RequestNew.getInitialProps = (props) => {
	const { address } = props.query;
	return { address };
};

export default RequestNew;
