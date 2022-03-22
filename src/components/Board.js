import React, { useEffect, useRef, useState, useMemo, useReducer } from "react";
import Cell from "./Cell";
import { Button, Box } from "@mui/material";
import NewPropertyAlert from "./NewPropertyAlert";
import CellTypes from "../CellTypes";

const Board = (props) => {
    console.log(props)

    useEffect(() => {
        console.log(props)
    }, [props])
    //const gridSize = 9;
    let templateString = "repeat(" + props.gridSize + ", 0fr)";

    /*const [players, setPlayers] = useState([
        { num: 1, location: 0, properties: [] },
        { num: 2, location: 0, properties: [] },
        { num: 3, location: 0, properties: [] },
        { num: 4, location: 0, properties: [] },
    ]);*/
    const [propertyAlert, setPropertyAlert] = useState(false);
    let squareRefs = useRef([]);
    //let curPlayerTurn = useRef(1);

    /*const makeBoard = () => {
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

    const [squares, setSquares] = useState(makeBoard());*/

    // Make an array of booleans where the index corresponds to each cell, then set the player field to this boolean and change the boolean whenever the player moves
    const displaySquares = () => {
        //console.log(squares);
        return props.squares.map((curSquare, i) => {
            return (
                <Cell
                    key={i}
                    type={curSquare.type}
                    squareNum={i}
                    players={props.players}
                    ref={(el) =>
                        (squareRefs.current = [...squareRefs.current, el])
                    }
                    row={curSquare.row}
                    column={curSquare.col}
                />
            );
        });
    };

    /*const rollDie = () => {
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
        let newPlayers = players;
        const curPlayerLocation =
            newPlayers[curPlayerTurn.current - 1].location;
        let newPlayerLocation = curPlayerLocation;

        if (curPlayerLocation + numToMove >= squares.length) {
            console.log(squares.length - numToMove);
            newPlayerLocation = curPlayerLocation + numToMove - squares.length;
        } else {
            newPlayerLocation += numToMove;
        }

        newPlayers[curPlayerTurn.current - 1].location = newPlayerLocation;

        setPlayers([...newPlayers]);

        while (players !== newPlayers) {
            console.log("while loop doing something??")
        };

        handleMove();
    };

    const handleMove = () => {
        switch (squares[players[curPlayerTurn.current - 1].location].type) {
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
                openPropertyAlert();
                console.log("At property");
                break;
            case CellTypes.Chance:
                console.log("At chance");
                break;
            default:
                throw new Error("Invalid cell type");
        }

        if (curPlayerTurn.current >= 4) {
            curPlayerTurn.current = 1;
        } else {
            curPlayerTurn.current++;
        }
    };*/

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
            {/*<Button onClick={movePlayer}>Press me to move</Button>*/}
            <Box
                sx={{
                    display: "grid",
                    gap: 0,
                    gridTemplateColumns: templateString,
                    gridTemplateRows: templateString,
                }}
            >
                {displaySquares()}
            </Box>
        </Box>
    );
};
export default Board;
