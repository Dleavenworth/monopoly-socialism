import React, { useRef } from "react";
import Cell from "./Cell";
import { Box } from "@mui/material";

const Board = (props) => {
    let templateString = "repeat(" + props.gridSize + ", 0fr)";
    let squareRefs = useRef([]);

    // Make an array of booleans where the index corresponds to each cell, then set the player field to this boolean and change the boolean whenever the player moves
    const displaySquares = () => {
        console.log(props.squares);
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
                    owner={curSquare.owner}
                />
            );
        });
    };

    return (
        <Box>
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
