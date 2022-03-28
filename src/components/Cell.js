import React, { useEffect, forwardRef } from "react";
import { Box, List, ListItem } from "@mui/material";

const Cell = forwardRef((props, ref) => {
    if(props.owner !== undefined) {
        console.log("The owner prop was set in cell")
    }
    return (
        <Box
            ref={ref}
            sx={{
                border: "1px solid black",
                width: "100px",
                height: "100px",
                //backgroundColor: props.corner ? "black" : "white",
            }}
            gridRow={props.row}
            gridColumn={props.column}
        >
            <Box sx={{display: "flex", width: "40px", height: "40px"}}>
                    {props.players.map((curPlayer, i) => {
                    if (curPlayer.location === props.squareNum) {
                        return (
                            <Box key={i} sx={{backgroundColor: curPlayer.color, width: "10px", height: "10px"}}/>
                        );
                    } else {
                        return null;
                    }
                })}
            </Box>
            <Box sx={{bottom: 0}}>
                <p>Owner: {props.owner}</p>
            </Box>
        </Box>
    );
});
export default Cell;
