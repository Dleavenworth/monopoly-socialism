import React, { useRef, useEffect, useMemo } from 'react'
import Cell from './Cell'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const gridSize = 9
let templateString = 'repeat(' + gridSize + ', 0fr)'

export default function Board() {
    let squares = []

    const makeBoard = () => {
        let col = 1
        let row = 2

        const totalSquares = (gridSize*2+((gridSize-2)*2))

        for(let i = 0; i < totalSquares; i++) {
            if(i < gridSize) {
                col++
            }
            else if(i < 2 * gridSize-1) {
                row++
            }
            else if(i < 3 * gridSize-2) {
                col--
            }
            else {
                row--
            }

            const square = {
                col: col,
                row: row,
                player: false
            }
            
            squares.push(square)
        }

        console.log(templateString)
        return squares.map((curSquare, i) => {
            return <Cell key={i} row={curSquare.row} column={curSquare.col}/>
        })
    }

    return (
        <Box sx={{display: "grid", gap: 0, gridTemplateColumns: templateString, gridTemplateRows: templateString}}>
            {makeBoard()}
        </Box>
    )
}