import React, { useEffect, forwardRef } from "react";
import { Box, List, ListItem } from "@mui/material";

const Cell = forwardRef((props, ref) => {
    useEffect(() => {
        console.log("player changed");
    }, [props]);

    console.log(props);

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
            <List>
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
            </List>
        </Box>
    );
});
export default Cell;
