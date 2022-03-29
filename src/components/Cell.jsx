import React, { Fragment, forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import CellTypes from "../CellTypes";

const Cell = forwardRef((props, ref) => {
	console.log(props.description);
	return (
		<Box
			ref={ref}
			sx={{
				border: "1px solid black",
				width: "10vw",
				height: "10vh",
				//backgroundColor: props.corner ? "black" : "white",
				display: "flex",
				flexDirection: "column",
			}}
			gridRow={props.row}
			gridColumn={props.column}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					width: "4vw",
					height: "4vh",
				}}
			>
				{props.players.map((curPlayer, i) => {
					if (curPlayer.location === props.squareNum) {
						return (
							<Box
								key={i}
								sx={{
									backgroundColor: curPlayer.color,
									width: "1vw",
									height: "1vh",
								}}
							/>
						);
					} else {
						return null;
					}
				})}
			</Box>
			<Box sx={{ bottom: 0 }}>
				{props.type === CellTypes.Property ? (
					<>
						<Typography>Owner: {props.owner}</Typography>
						<Typography>Name: {props.name}</Typography>
					</>
				) : null}
			</Box>
		</Box>
	);
});
export default Cell;
