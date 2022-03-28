import React, { useEffect, useState, useRef } from "react";
import Controls from "./Controls";
import Board from "./Board";
import { Box } from "@mui/material";
import CellTypes from "../CellTypes";
import NewPropertyAlert from "./NewPropertyAlert";
import ProjectTypes from "../ProjectTypes";

const Game = () => {
    const gridSize = 9;
    const [players, setPlayers] = useState([
        { num: 1, location: 0, properties: [], color: "red"},
        { num: 2, location: 0, properties: [], color: "blue"},
        { num: 3, location: 0, properties: [], color: "green"},
        { num: 4, location: 0, properties: [], color: "orange"},
    ]);
    let curPlayerTurn = useRef(1);
    let playerGettingProperty = useRef(undefined);
    const [propertyAlert, setPropertyAlert] = useState(false);

    const makeBoard = () => {
        let col = 1;
        let row = 2;
        let newSquares = [];
        let curType = CellTypes.Cell;
        const totalSquares = gridSize * 2 + (gridSize - 2) * 2;
        let propertyCounter = 0;
        let curDescription = ProjectTypes.getPropList()[0];

        for (let i = 0; i < totalSquares; i++) {
            //0 8 16 24
            if (i === 0) {
                curType = CellTypes.Start;
            } else if (i === gridSize - 1) {
                curType = CellTypes.GoToJail;
            } else if (i === gridSize * 2 - 2) {
                curType = CellTypes.Go;
            } else if (i === gridSize * 3 - 3) {
                curType = CellTypes.Jail;
            } else if (i % 2 === 0) {
                curType = CellTypes.Property;
                curDescription = ProjectTypes.getPropList()[propertyCounter];
                propertyCounter++;
            } else if (i % 2 !== 0) {
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
                purchased: false,
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
        console.log("setting prop alert");
        playerGettingProperty.current = player;
        setPropertyAlert(true);
    };

    const handleNewPropertyAccept = () => {
        console.log("Accept new property");
        let newPlayers = players;
        let newSquares = squares;
        newPlayers[playerGettingProperty.current-1].properties.push(
            squares[newPlayers[playerGettingProperty.current-1].location]
                .description
        );
        console.log(players[playerGettingProperty.current-1].location)
        console.log(playerGettingProperty.current)
        newSquares[
            players[playerGettingProperty.current-1].location
        ].purchased = true;
        setPropertyAlert(false);
        setPlayers(newPlayers);
        setSquares(newSquares);
    };

    const handleNewPropertyDecline = () => {
        console.log("Reject new property");
        setPropertyAlert(false);
    };

    return (
        <Box>
            <NewPropertyAlert
                open={propertyAlert}
                handleAccept={handleNewPropertyAccept}
                handleDecline={handleNewPropertyDecline}
            />
            <Box sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Board
                        players={players}
                        gridSize={gridSize}
                        squares={squares}
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Controls
                        players={players}
                        curPlayerTurn={curPlayerTurn}
                        squares={squares}
                        handleUpdatePlayers={updatePlayers}
                        openPropertyAlert={openPropertyAlert}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Game;
