import React, { useEffect, useRef, useState, useMemo, useReducer } from "react";
import Cell from "./Cell";
import { Button, Box } from "@mui/material";

const Board = () => {
	const gridSize = 9;
	const [players, setPlayers] = useState([
		{ num: 1, location: 1 },
		{ num: 2, location: 1 },
		{ num: 3, location: 1 },
		{ num: 4, location: 1 },
	]);
	let templateString = "repeat(" + gridSize + ", 0fr)";
	let squareRefs = useRef([]);
	const curPlayerTurn = useRef(1);

	const makeBoard = () => {
		let col = 1;
		let row = 2;

		const totalSquares = gridSize * 2 + (gridSize - 2) * 2;
		let newSquares = [];

		for (let i = 0; i < totalSquares; i++) {
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
			};

			newSquares.push(square);
		}
		return newSquares;
	};

	const [squares, setSquares] = useState(makeBoard());

	// Make an array of booleans where the index corresponds to each cell, then set the player field to this boolean and change the boolean whenever the player moves
	const displaySquares = () => {
		//console.log(squares);
		return squares.map((curSquare, i) => {
			return (
				<Cell
					key={i}
					squareNum={i}
					players={players}
					ref={(el) => (squareRefs.current = [...squareRefs.current, el])}
					row={curSquare.row}
					column={curSquare.col}
				/>
			);
		});
	};

    const rollDie = () => {
        let movementDie = Math.floor(Math.random()*6) + 1
        let actionDie = Math.floor(Math.random()*6) + 1
        
        //Doubles movement, Draw chance card, draw two chance cards 
        //Other numbers are 2 3 and 4
        
        switch(actionDie) {
            case 1:
                movementDie = movementDie*2;
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
                console.log("draw chance!")
                break;
            case 6:
                console.log("draw two chance!")
                break;
            default:
                console.log("Something went wrong here")
                break;
        }
        return movementDie;
    }

	const movePlayer = () => {
		console.log(curPlayerTurn.current)
        console.log(players.length)
        console.log(players[curPlayerTurn.current-1].location)
        let numToMove = rollDie()
		let newPlayers = players;

        if(newPlayers[curPlayerTurn.current-1].location + numToMove >= squares.length) {
            newPlayers[curPlayerTurn.current-1].location = squares.length-numToMove;
        }
        else {
		    newPlayers[curPlayerTurn.current - 1].location += numToMove;
        }

		setPlayers([...newPlayers]);

		if (curPlayerTurn.current >= 4) {
			curPlayerTurn.current = 1;
		} else {
			curPlayerTurn.current++;
		}
	};


	return (
		<Box>
			<Button onClick={movePlayer}>Press me to move</Button>
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
