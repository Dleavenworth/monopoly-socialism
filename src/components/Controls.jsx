import React from "react";
import { Button, Box } from "@mui/material";
import CellTypes from "../CellTypes";

const Controls = (props) => {
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

	const movePlayer = () => {
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

		handleMove();
	};

	const handleMove = () => {
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
	};

	const startTrade = () => {};

	return (
		<Box>
			<Button onClick={movePlayer}>Press me to move</Button>
			<Button onClick={startTrade}>Press me to trade projects</Button>
		</Box>
	);
};

export default Controls;
