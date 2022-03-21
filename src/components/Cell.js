import React, {useEffect, forwardRef, useState} from 'react';
import Box from '@mui/material/Box'

const Cell = forwardRef((props, ref) => {

    console.log(props)
    return (
        <Box ref={ref} sx={{border: "1px solid black", width: "100px", height: "100px", backgroundColor: props.player ? "black" : "white"}}  
        gridRow={props.row} gridColumn={props.column}/>
    )
})
export default Cell