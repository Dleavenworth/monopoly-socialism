import React, { useEffect, forwardRef, useState } from "react";
import { Box, List, ListItem } from "@mui/material";

const Cell = forwardRef((props, ref) => {
	useEffect(() => {
		console.log("player changed");
	}, [props]);

	console.log(props.players[1] === props.squareNum);

	return (
		<Box
			ref={ref}
			sx={{
				border: "1px solid black",
				width: "100px",
				height: "100px",
				//backgroundColor: props.player ? "black" : "white",
			}}
			gridRow={props.row}
			gridColumn={props.column}
		>
			<List>
				{props.players.map((curPlayer, i) => {
					if (props.players[i].location === props.squareNum) {
						return (
							<ListItem key={i}>
								Player {props.players[i].num} is here{" "}
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
