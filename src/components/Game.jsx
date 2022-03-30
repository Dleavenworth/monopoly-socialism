import React, { useEffect, useState, useRef } from "react";
import Controls from "./Controls";
import Board from "./Board";
import { Box } from "@mui/material";
import CellTypes from "../CellTypes";
import NewPropertyAlert from "./NewPropertyAlert";
import ProjectTypes from "../ProjectTypes";
import TradeDialog from "./TradeDialog";

const Game = () => {
	const gridSize = 9;
	const [players, setPlayers] = useState([
		{ num: 1, location: 0, properties: [], color: "red" },
		{ num: 2, location: 0, properties: [], color: "blue" },
		{ num: 3, location: 0, properties: [], color: "green" },
		{ num: 4, location: 0, properties: [], color: "orange" },
	]);
	let curPlayerTurn = useRef(1);
	let playerGettingProperty = useRef(undefined);
	const [propertyAlert, setPropertyAlert] = useState(false);
	const [isTrading, setIsTrading] = useState(false);
	const [reset, setReset] = useState(false);

	const makeBoard = () => {
		let col = 1;
		let row = 2;
		let newSquares = [];
		let curType = CellTypes.Cell;
		const totalSquares = gridSize * 2 + (gridSize - 2) * 2;
		let propertyCounter = 0;
		let curDescription = "";
		let cornerCounter = 0;

		for (let i = 0; i < totalSquares; i++) {
			//0 8 16 24 for corners
			//4 12 20 28 for shuttles
			if (i === gridSize * cornerCounter - cornerCounter) {
				curType = CellTypes.getPropList()[cornerCounter];
			} else if (i % (gridSize - 1) === (gridSize - 1) / 2) {
				curType = CellTypes.Shuttle;
			} else if (i % 2 !== 0) {
				curType = CellTypes.Property;
				curDescription = ProjectTypes.getPropList()[propertyCounter];
				propertyCounter++;
			} else if (i % 2 === 0) {
				// Add description for chance cards here
				curType = CellTypes.Chance;
			} else {
				throw new Error("Invalid value for i in makeBoard");
			}

			if (i < gridSize) {
				col++;
			} else if (i < 2 * gridSize - 1) {
				row++;
			} else if (i < 3 * gridSize - 2) {
				col--;
			} else {
				row--;
			}

			const square = {
				col: col,
				row: row,
				type: curType,
				owner: undefined,
				description: curDescription,
			};

			newSquares.push(square);
		}
		return newSquares;
	};

	const [squares, setSquares] = useState(makeBoard());

	const updatePlayers = (newPlayers) => {
		setPlayers(newPlayers);
	};

	const openPropertyAlert = (player) => {
		playerGettingProperty.current = player;
		setPropertyAlert(true);
	};

	const handleNewPropertyAccept = () => {
		let newPlayers = players;
		let newSquares = squares;
		newPlayers[playerGettingProperty.current - 1].properties.push(
			squares[newPlayers[playerGettingProperty.current - 1].location]
				.description
		);
		console.log(players[playerGettingProperty.current - 1].location);
		console.log(playerGettingProperty.current);
		newSquares[players[playerGettingProperty.current - 1].location].owner =
			newPlayers[playerGettingProperty.current - 1].color;
		setPropertyAlert(false);
		setPlayers(newPlayers);
		setSquares(newSquares);
	};

	const handleNewPropertyDecline = () => {
		setPropertyAlert(false);
	};

	const startTrade = () => {
		setIsTrading(true);
	};

	const closeDialog = () => {
		setIsTrading(false);
	};

	const handleTrade = (
		propertiesBought,
		propertiesSold,
		playerOffering,
		playerGettingOffer
	) => {
		let newSquares = [...squares];
		let newPlayers = [...players];
		console.log(squares);
		console.log(players)

		// Add the properties bought to the properties held by the current player
		// Remove the properties sold from the current players properties
		// Change the owner marking on those cells
		// Add the properties sold to the properties held by the player getting the offer
		// Remove the properties bought from the player getting the offer
		// Change the owner marking on those cells

		// Add the properties bought to the properties held by the current player
		propertiesBought.forEach((property) => {
			newPlayers[playerOffering.current - 1].properties.push(property);
			// Adjust the cell to have a new owner
			let indexToAdjust = newSquares.findIndex(
				(element) => element.description === property
			);
			newSquares[indexToAdjust].owner =
				newPlayers[playerOffering.current - 1].color;
		});
		// Remove the sold properties from the current player properties
		propertiesSold.forEach((property) => {
			let playerOfferingObj = newPlayers[playerOffering.current - 1];
			let indexToRemove = playerOfferingObj.properties.findIndex(
				(element) => element === property
			);
			if(indexToRemove < 0) {
				newPlayers[playerOffering.current - 1].properties.splice(
					indexToRemove,
					1
				);
			}
			else {
				return
			}
		});

		// Remove the properties bought from the properties help by the player getting the offer
		propertiesBought.forEach((property) => {
			let playerGettingOfferObj = newPlayers[playerGettingOffer];
			let indexToRemove = playerGettingOfferObj.properties.findIndex(
				(element) => element === property
			);
			if(indexToRemove < 0 ) { 
				newPlayers[playerGettingOffer].properties.splice(indexToRemove, 1);
			}
			else {
				return
			}
		});

		// Add the properties sold to the properties held by the player getting the offer
		propertiesSold.forEach((property) => {
			newPlayers[playerGettingOffer].properties.push(property);
			// Adjust the cell to have a new owner
			let indexToAdjust = newSquares.findIndex(
				(element) => element.description === property
			);
			newSquares[indexToAdjust].owner = newPlayers[playerGettingOffer].color;
		});
		console.log(newSquares);
		console.log(newPlayers)
		setSquares(newSquares);
		setPlayers(newPlayers);
	};

	const signalMoving = () => {
		setReset(!reset);
	}

	return (
		<Box>
			<TradeDialog
				handleTrade={handleTrade}
				closeDialog={closeDialog}
				playerStarting={curPlayerTurn}
				players={players}
				squares={squares}
				open={isTrading}
				reset={reset}
			/>
			<NewPropertyAlert
				open={propertyAlert}
				handleAccept={handleNewPropertyAccept}
				handleDecline={handleNewPropertyDecline}
			/>
			<Box sx={{ display: "flex" }}>
				<Box sx={{ flexGrow: 1 }}>
					<Board players={players} gridSize={gridSize} squares={squares} />
				</Box>
				<Box sx={{ flexGrow: 1 }}>
					<Controls
						players={players}
						curPlayerTurn={curPlayerTurn}
						squares={squares}
						handleUpdatePlayers={updatePlayers}
						openPropertyAlert={openPropertyAlert}
						startTrade={startTrade}
						signalMoving={signalMoving}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Game;
