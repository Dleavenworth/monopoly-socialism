import React, { useRef, useEffect, useMemo } from 'react'
import Cell from './Cell'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const gridSize = 5

export default function Board() {

    let squareRefs = []

    const makeBoard = () => {
        let col = 1
        let row = 1
        let squares = []

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
            let tag = <Cell key={i} column={col} row={row}/>
            squares.push(tag)
        }
        return squares
    }

    return (
        <Box sx={{display: "grid", gap: 0, gridTemplateColumns: 'repeat(5, 0fr)', gridTemplateRows: 'repeat(5, 0fr'}}>
            {makeBoard()}
        </Box>
    )
}