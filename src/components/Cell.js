import React from 'react';
import Box from '@mui/material/Box'

export default function Cell(props) {
    console.log(props)
    return (
        <Box sx={{border: "1px solid black", width: "100px", height: "100px"}}  gridRow={props.row} gridColumn={props.column}/>
    )
} 