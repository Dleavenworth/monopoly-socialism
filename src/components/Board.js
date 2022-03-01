import React from 'react'
import Cell from './Cell'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const gridSize = 10
const oneCell = <Cell/>
const duplicate = (x, n) => Array.from(new Array(n), () => x)
const nCells = duplicate(oneCell, gridSize)

export default function Board() {

    return (
        <Box sx={{display: "grid", gap: 0, gridTemplateColumns: 'repeat(5, 0fr)', gridTemplateRows: 'repeat(5, 0fr'}}>
            <Cell column="1" row="1"/>
            <Cell column="1" row="2"/>
            <Cell column="1" row="3"/>
            <Cell column="1" row="4"/>
            <Cell column="1" row="5"/>
            <Cell column="2" row="1"/>
            <Cell column="3" row="1"/>
            <Cell column="4" row="1"/>
            <Cell column="5" row="1"/>
            <Cell column="5" row="2"/>
            <Cell column="5" row="3"/>
            <Cell column="5" row="4"/>
            <Cell column="5" row="5"/>
            <Cell column="2" row="5"/>
            <Cell column="3" row="5"/>
            <Cell column="4" row="5"/> 
        </Box>
    )
}
            /*<Box sx={{border: '1px solid black'}} className="cell" gridColumn="7" gridRow="8"/>
            <Box sx={{border: '1px solid black'}} className="cell" gridColumn="8" gridRow="8"/>
            <Box sx={{border: '1px solid black'}} className="cell" gridColumn="9" gridRow="8"/>
            <Box sx={{border: '1px solid black'}} className="cell" gridColumn="10" gridRow="9"/>*/