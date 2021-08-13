import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
	return (
		<Menu style={{ marginTop: "10px" }}>
			<Link route="/">
				<a className="item">
					<img src="http://simpleicon.com/wp-content/uploads/dollar-256x256.png" />
					<strong>CrowdCoin</strong>
				</a>
			</Link>

			<Menu.Menu position="right">
				<Link route="/">
					<a className="item">
						<strong>Campaigns</strong>
					</a>
				</Link>{" "}
				<Link route="/campaigns/new">
					<a className="item">
						<strong>+</strong>
					</a>
				</Link>
			</Menu.Menu>
		</Menu>
	);
};
