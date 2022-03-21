import React, {useEffect, useRef, useState, useMemo} from "react"
import Cell from "./Cell"
import { Button, Box } from "@mui/material"


const Board = () => {
    let playerLoc = 1
    const gridSize = 9
    let templateString = "repeat(" + gridSize + ", 0fr)"
	const [squares, setSquares] = useState([])
    let squareRefs = useRef([])

	useEffect(() => {
		makeBoard()
	}, [])

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

			let newSquares = squares
			newSquares.push(square)

			console.log("updated new squares")

			setSquares(newSquares)
		}
        //return displaySquares()
	}

	// Make an array of booleans where the index corresponds to each cell, then set the player field to this boolean and change the boolean whenever the player moves
		const displaySquares = () => {
            console.log(squares)
            return squares.map((curSquare, i) => {
			return (
				    <Cell
                        key={i}
					    player={squares[i].player}
                        ref={el => (squareRefs.current = [...squareRefs.current, el])}
					    row={curSquare.row}
					    column={curSquare.col}
				    />
			)
		})
    }

        const movePlayer = () => {

			let newSquare = squares[playerLoc]
			newSquare.player = false
			setSquares(newSquare)

            playerLoc++

			newSquare = squares[playerLoc]
			newSquare.player = true
			setSquares(newSquare)

            console.log(squareRefs.current[playerLoc])
			console.log(squares)
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
            {squares.map((curSquare, i) => {
			return (
				    <Cell
                        key={i}
					    player={squares[i].player}
                        ref={el => (squareRefs.current = [...squareRefs.current, el])}
					    row={curSquare.row}
					    column={curSquare.col}
				    />
			)
		})}
			</Box>
		</Box>
	)
}
export default Board