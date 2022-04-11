import React from "react";
import { List, ListItem, Drawer, Toolbar, Box } from "@mui/material";
import CellTypes from "../CellTypes";

const Controls = (props) => {
	const drawerWidth = 240

	const rollDie = () => {
		let movementDie = Math.floor(Math.random() * 6) + 1;
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
				break;
			case 6:
				console.log("draw two chance!");
				break;
			default:
				throw new Error("Action die result was not between 1 and 6");
		}
		return movementDie;
	};

	/*const movePlayer = () => {
		let numToMove = rollDie();
		let newPlayers = props.players;
		const curPlayerLocation =
			newPlayers[props.curPlayerTurn.current - 1].location;
		let newPlayerLocation = curPlayerLocation;

		if (curPlayerLocation + numToMove >= props.squares.length) {
			newPlayerLocation = curPlayerLocation + numToMove - props.squares.length;
		} else {
			newPlayerLocation += numToMove;
		}

		newPlayers[props.curPlayerTurn.current - 1].location = newPlayerLocation;

		props.handleUpdatePlayers([...newPlayers]);

		while (props.players !== newPlayers) {
			console.log("while loop doing something??");
		}

		props.handleMove();
		props.signalMoving();
	};*/

	/*const handleMove = () => {
		console.log(props);
		const curCell =
			props.squares[props.players[props.curPlayerTurn.current - 1].location];
		switch (curCell.type) {
			case CellTypes.Start:
				break;
			case CellTypes.GoToJail:
				console.log("Going to jail");
				break;
			case CellTypes.Go:
				console.log("Passing go, get money!");
				break;
			case CellTypes.Jail:
				console.log("At jail");
				break;
			case CellTypes.Property:
				if (curCell.owner === undefined) {
					props.openPropertyAlert(props.curPlayerTurn.current);
				}
				console.log("At property");
				break;
			case CellTypes.Chance:
				console.log("At chance");
				break;
			case CellTypes.Shuttle:
				props.openShuttleAlert()
				console.log("At shuttle");
				break;
			default:
				throw new Error("Invalid cell type");
		}

		if (props.curPlayerTurn.current >= 4) {
			props.curPlayerTurn.current = 1;
		} else {
			props.curPlayerTurn.current++;
		}
	};*/

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
			<Toolbar/>
			<Box sx={{overflow: "auto"}}>
				<List>
			<ListItem key="move" button onClick={() => props.movePlayer(rollDie())}>Move</ListItem>
			<ListItem key="trade" button onClick={startTrade}>Trade</ListItem>
			</List>
		</Box>
		</Drawer>
	);
};

export default Controls;
