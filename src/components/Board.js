import React, {useEffect, useRef} from "react"
import Cell from "./Cell"
import { Button, Box } from "@mui/material"


const Board = () => {
    let playerLoc = 1
    const gridSize = 9
    let templateString = "repeat(" + gridSize + ", 0fr)"
	let squares = []
    let squareRefs = useRef([])

	const makeBoard = () => {
		let col = 1
		let row = 2

		const totalSquares = gridSize * 2 + (gridSize - 2) * 2

		for (let i = 0; i < totalSquares; i++) {
			if (i < gridSize) {
				col++
			} else if (i < 2 * gridSize - 1) {
				row++
			} else if (i < 3 * gridSize - 2) {
				col--
			} else {
				row--
			}

			const square = {
				col: col,
				row: row,
				player: i === 1 ? true : false,
			}

			squares.push(square)
		}
        return displaySquares()
	}
		const displaySquares = () => {
            console.log(squares)
            return squares.map((curSquare, i) => {
			return (
				    <Cell
                        key={i}
					    player={curSquare.player}
                        ref={el => (squareRefs.current = [...squareRefs.current, el])}
					    row={curSquare.row}
					    column={curSquare.col}
				    />
			)
		})
    }

        const movePlayer = () => {
            squares[playerLoc] = false
            playerLoc++
            squares[playerLoc] = true
            console.log(squareRefs)
        }

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
				{makeBoard()}
			</Box>
		</Box>
	)
}
export default Board