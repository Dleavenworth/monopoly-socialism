import React, { useEffect, useRef, useState, useMemo, useReducer} from "react";
import Cell from "./Cell";
import { Button, Box } from "@mui/material";

const Board = () => {
    const gridSize = 9;
    const [players, setPlayers] = useState([{num: 1, location: 1}, {num: 2, location: 1}, {num: 3, location: 1}, {num: 4, location: 1}]);
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
                //player: i === 1 ? true : false,
            };

            newSquares.push(square);
        }
        return newSquares;
    };

    const [squares, setSquares] = useState(makeBoard());

    useEffect(() =>{
		console.log(players)
        console.log(curPlayerTurn.current)
        // Run this code after playerLoc is updated in movePlayer, that is, once playerLoc is incremented by 1 run this code
        // There might be a better way to do this but I couldn't find one
        let newSquares = squares
        let newSquare = squares[players[curPlayerTurn.current].location];
        //newSquare.player = true;
        newSquares[players[curPlayerTurn.current].location] = newSquare;
        console.log(newSquares);
        setSquares([...newSquares]);

        if(curPlayerTurn === 4) {
		    curPlayerTurn.current = 1;
        }
        else {
            curPlayerTurn.current++;
        }

        //console.log("MOVING CODE");
        //console.log(squareRefs.current[playerLoc]);
        //console.log("Playerloc is: " + playerLoc);
    }, [players])

    // Make an array of booleans where the index corresponds to each cell, then set the player field to this boolean and change the boolean whenever the player moves
    const displaySquares = () => {
        //console.log(squares);
        return squares.map((curSquare, i) => {
            return (
                <Cell
                    key={i}
					squareNum={i}
                    players={players}
                    ref={(el) =>
                        (squareRefs.current = [...squareRefs.current, el])
                    }
                    row={curSquare.row}
                    column={curSquare.col}
                />
            );
        });
    };

    useEffect(() => {
        console.log(squares);
    }, [squares]);

    const movePlayer = () => {
        //console.log("Playerloc is: " + players[curPlayerTurn].location);
        let newSquare = squares[players[curPlayerTurn.current].location];
        //newSquare.player = false;
        let newSquares = squares;
        newSquares[players[curPlayerTurn.current].location] = newSquare;
        //setSquares(newSquares)

		let newPlayers = players

		newPlayers[curPlayerTurn.current].location++;

        setPlayers([...newPlayers]);

        /*newSquare = squares[playerLoc];
        newSquare.player = true;
        newSquares[playerLoc] = newSquare;
        console.log(newSquares);
        setSquares([...newSquares]);

        console.log("MOVING CODE");
        console.log(squareRefs.current[playerLoc]);
        console.log("Playerloc is: " + playerLoc);*/
        //console.log(squares)
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

/*----------------------------------------------------------------
{squares ? squares.map((curSquare, i) => {
			return (
				    <Cell
                        key={i}
					    player={squares[i].player}
                        ref={el => (squareRefs.current = [...squareRefs.current, el])}
					    row={curSquare.row}
					    column={curSquare.col}
				    />
			)
		}) : console.log(typeof squares)}
        */
