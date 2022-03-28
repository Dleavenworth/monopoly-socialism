import React, { useEffect, forwardRef } from "react";
import { Box, List, ListItem } from "@mui/material";

const Cell = forwardRef((props, ref) => {
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
            <Box sx={{display: "flex", width: "50px", height: "50px"}}>
                    {props.players.map((curPlayer, i) => {
                    if (curPlayer.location === props.squareNum) {
                        return (
                            <Box sx={{backgroundColor: curPlayer.color, width: "10px", height: "10px"}}/>
                        );
                    } else {
                        return null;
                    }
                })}
            </Box>
            <Box sx={{bottom: 0}}>
                <p>Owned by: p</p>
            </Box>
            {/*<List>
                {props.players.map((curPlayer, i) => {
                    if (curPlayer.location === props.squareNum) {
                        return (
                            <ListItem key={i}>
                                Player {curPlayer.num} is here{" "}
                            </ListItem>
                        );
                    } else {
                        return null;
                    }
                })}
            </List>*/}
        </Box>
    );
});
export default Cell;
