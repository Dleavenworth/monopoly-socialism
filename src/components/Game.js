import React, { useEffect, useState, useRef } from "react";
import Controls from "./Controls";
import Board from "./Board";
import { Box } from "@mui/material";
import CellTypes from "../CellTypes";
import NewPropertyAlert from "./NewPropertyAlert";

const Game = () => {
    const gridSize = 9;
    const [players, setPlayers] = useState([
        { num: 1, location: 0, properties: [] },
        { num: 2, location: 0, properties: [] },
        { num: 3, location: 0, properties: [] },
        { num: 4, location: 0, properties: [] },
    ]);
    let curPlayerTurn = useRef(1);
    const [propertyAlert, setPropertyAlert] = useState(false);

    const makeBoard = () => {
        let col = 1;
        let row = 2;
        let newSquares = [];
        let curType = CellTypes.Cell;
        const totalSquares = gridSize * 2 + (gridSize - 2) * 2;

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
            } else if (i % 2 !== 0) {
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
            };

            newSquares.push(square);
        }
        return newSquares;
    };

    const [squares, setSquares] = useState(makeBoard());

    const updatePlayers = (newPlayers) => {
        setPlayers(newPlayers);
    };

    const openPropertyAlert = () => {
        console.log("setting prop alert");
        setPropertyAlert(true);
    };

    const handleNewPropertyAccept = () => {
        console.log("Accept new property");
        setPropertyAlert(false);
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
            <Controls
                players={players}
                curPlayerTurn={curPlayerTurn}
                squares={squares}
                handleUpdatePlayers={updatePlayers}
                openPropertyAlert={openPropertyAlert}
            />
            <Board players={players} gridSize={gridSize} squares={squares} />
        </Box>
    );
};

export default Game;
