import React from "react";
import { List, ListItem, Drawer, Toolbar, Box } from "@mui/material";
import CellTypes from "../CellTypes";
import CommunityChest from "../CommunityChest";

const Controls = (props) => {
	const drawerWidth = "10vw";

	let currentTotal = props.currentTotal;

	const rollDie = () => {
		let movementDie = Math.floor(Math.random() * 6) + 1;
		console.log("Movement: " + movementDie);
		let actionDie = Math.floor(Math.random() * 6) + 1;

		//Doubles movement, Draw chance card, draw two chance cards
		//Other numbers are 2 3 and 4

		switch (actionDie) {
			case 1:
				movementDie = movementDie * 2;
				break;
			case 2:
				movementDie = movementDie + 2;
				break;
			case 3:
				movementDie = movementDie + 3;
				break;
			case 4:
				movementDie = movementDie + 4;
				break;
			case 5:
				console.log("draw chance!");
				props.setCommunityChest(20);
				currentTotal -= 20;
				//currentTotal = CommunityChest.getTotal();
				CommunityChest.setTotal(currentTotal);
				props.setDrawAlert(true);
				props.setDrawAlert(false);
				console.log("Current total: " + CommunityChest.getTotal()); 
				break;
			case 6:
				console.log("draw two chance!");
				props.setCommunityChest(30)
				currentTotal -= 30;
				//currentTotal = CommunityChest.getTotal();
				CommunityChest.setTotal(currentTotal);
				props.setDrawAlert(true);
				props.setDrawAlert(false);
				console.log("Current total: " + CommunityChest.getTotal());
				break;
			default:
				throw new Error("Action die result was not between 1 and 6");
		}
		props.setMove(movementDie);
		return movementDie;
	};

	const startTrade = () => {
		console.log("in the on click");
		props.startTrade();
	};

	return (
		<Drawer
			variant="permanent"
			anchor="right"
			sx={{
				width: drawerWidth,

				"& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
			}}
		>
			<Toolbar />
			<Box sx={{ overflow: "auto" }}>
				<List>
					<ListItem
						key="move"
						button
						onClick={() => props.movePlayer(rollDie())}
					>
						Move
					</ListItem>
					<ListItem key="trade" button onClick={startTrade}>
						Trade
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};

export default Controls;
