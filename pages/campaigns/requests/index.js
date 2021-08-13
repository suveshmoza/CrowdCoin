import React from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = ({ address, requests, requestCount, approversCount }) => {
	const { Header, Row, HeaderCell, Body } = Table;
	console.log(requestCount);
	const renderRow = () => {
		return requests.map((request, index) => {
			return (
				<RequestRow
					id={index}
					request={request}
					approversCount={approversCount}
					address={address}
					key={index}
				/>
			);
		});
	};

	return (
		<Layout>
			<h3>Request List</h3>
			<Link route={`/campaigns/${address}/requests/new`}>
				<a>
					<Button primary floated="right" style={{ marginBottom: 10 }}>
						Add Requests
					</Button>
				</a>
			</Link>
			<Table>
				<Header>
					<Row>
						<HeaderCell>ID</HeaderCell>
						<HeaderCell>Description</HeaderCell>
						<HeaderCell>Amount</HeaderCell>
						<HeaderCell>Recipient</HeaderCell>
						<HeaderCell>Approval Count</HeaderCell>
						<HeaderCell>Approve</HeaderCell>
						<HeaderCell>Finalize</HeaderCell>
					</Row>
				</Header>
				<Body>{renderRow()}</Body>
			</Table>
			<div>Found {requestCount} requests</div>
		</Layout>
	);
};

RequestIndex.getInitialProps = async (props) => {
	const { address } = props.query;
	const campaign = Campaign(address);
	const requestCount = await campaign.methods.getRequestsCount().call();
	const approversCount = await campaign.methods.approversCount().call();
	const requests = await Promise.all(
		Array(requestCount)
			.fill()
			.map((element, index) => {
				return campaign.methods.requests(index).call();
			})
	);
	return { address, requests, requestCount, approversCount };
};

export default RequestIndex;
