import React, { useState, useEffect } from "react";
import {
	Box,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material";

const ItemSelection = (props) => {
	const [tradeMoney, setTradeMoney] = useState(false);
	const [tradeProjects, setTradeProjects] = useState(false);
	const [tradeChance, setTradeChance] = useState(false);

	useEffect(() => {
		props.changeSelectedItems([tradeProjects, tradeMoney, tradeChance]);
	}, [tradeMoney, tradeProjects, tradeChance]);

	useEffect(() => {
		setTradeMoney(false);
		setTradeProjects(false);
		setTradeChance(false);
		console.log("resetting item selection");
	}, [props.reset]);

	const handleSelectionChange = (e, selection) => {
		switch (selection) {
			case "tradeProjects":
				console.log("Trade Projects");
				setTradeProjects(!tradeProjects);
				break;
			case "tradeChance":
				console.log("trade chance");
				setTradeChance(!tradeChance);
				break;
			case "tradeMoney":
				console.log("trade money");
				setTradeMoney(!tradeMoney);
				break;
			default:
				throw new Error("Invalid trade selection");
		}
	};

	return (
		<Box noValidate component="form" sx={{ flexGrow: 1 }}>
			<FormControl component="fieldset" variant="standard">
				<FormLabel component="legend">Items to trade</FormLabel>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={tradeProjects}
								onChange={(e) => handleSelectionChange(e, "tradeProjects")}
								name="projects"
							/>
						}
						label="Projects"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={tradeMoney}
								onChange={(e) => handleSelectionChange(e, "tradeMoney")}
								name="money"
							/>
						}
						label="Money"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={tradeChance}
								onChange={(e) => handleSelectionChange(e, "tradeChance")}
								name="chance"
							/>
						}
						label="Chance cards"
					/>
				</FormGroup>
			</FormControl>
		</Box>
	);
};

export default ItemSelection;
