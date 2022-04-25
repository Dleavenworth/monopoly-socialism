import React, { Fragment, forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import CellTypes from "../CellTypes";

const CellText = (props) => <Typography sx={{fontSize: "13px"}}>{props.children}</Typography>


const Cell = forwardRef((props, ref) => {
	return (
		<Box
			ref={ref}
			sx={{
				border: "1px solid black",
				width: "9vw",
				height: "9vh",
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
						<CellText>Owner: {props.owner}</CellText>
						<CellText>Owner: {props.name}</CellText>
						{/*<Typography>Owner: {props.owner}</Typography>
						<Typography>Name: {props.name}</Typography>*/}
					</>
				) : null}
				{props.type === CellTypes.Chest ? (
					<>
						<CellText>Community chest</CellText>
						<CellText>Money: ${props.money}</CellText>
						{/*<Typography>Community Chest</Typography>
						<Typography>Money: ${props.money}</Typography>*/}
					</>
				) : null}
				{props.type === CellTypes.Chance ? (
					<>
						<CellText>Chance</CellText>
						{/*<Typography>Chance</Typography>*/}
					</>
	 			) : null}
				{props.type === CellTypes.Shuttle ? (
					<>
						<CellText>Community Shuttle</CellText>
						<CellText>$50</CellText>
						{/*<Typography>Community Shuttle</Typography>
						<Typography>$50</Typography>*/}
					</>
				) : null}
				{props.type === CellTypes.Jail ? (
					<>
						<CellText>Jail</CellText>
						{/*<Typography>Jail</Typography>*/}
					</>
				) : null}
				{props.type === CellTypes.Go ? (
					<>
						<CellText>Go</CellText>
						{/*<Typography>Go</Typography>*/}
					</>
				) : null}
				{props.type === CellTypes.GoToJail ? (
					<>
						<CellText>Go To Jail</CellText>
						{/*<Typography>Go To Jail</Typography>*/}
					</>
				) : null}
				{props.type === CellTypes.Parking ? (
					<>
						<CellText>Free Parking</CellText>
						{/*<Typography>Free Parking</Typography>*/}
					</>
				) : null}
				{props.type === CellTypes.Status ? (
					<>
						<CellText>Player: {props.curr}</CellText>
						<CellText>Current player's money: ${props.money}</CellText>
						<CellText>Previous Dice roll: {props.move}</CellText>
						{/*<Typography>Player: {props.curr}</Typography>
						<Typography>Dice roll: {props.move}</Typography>*/}
					</>
				) : null}
			</Box>
		</Box>
	);
});
export default Cell;
