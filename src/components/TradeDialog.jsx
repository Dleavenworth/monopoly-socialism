import React, { useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Card,
	CardHeader,
	Divider,
	List,
	Checkbox,
	ListItem,
	ListItemIcon,
	ListItemText,
	Grid,
} from "@mui/material";
import ItemSelection from "./TradeDialogSubcomponents/ItemSelection";
import PropertySelection from "./TradeDialogSubcomponents/PropertySelection";

//Think about how you would string together multiple dialogs or display everything in a single dialog
//Make it a full screen dialog (this one sounds the most appealing actually)
//Make it its own page entirely (get react-router set up and just do another component for that page)
//No matter what you're going to have to use the transfer list you saw on MUI docs, that looks like the best way to do it
//The idea right now is to have a full screen dialog that populates the content below it when you fill out the fields above it

// We are trading money, which is a text field entry
// Trading property is using the transfer list too
// Trading chance cards is using the transfer list too
const TradeDialog = (props) => {
	const [open, setOpen] = useState(props.open);
	const [selectedPlayer, setSelectedPlayer] = useState("");
	const [selectedItems, setSelectedItems] = useState([]);

	console.log(selectedItems);

	const handleClose = () => {
		setOpen(false);
	};

	const handleSelectedPlayer = (e) => {
		setSelectedPlayer(e.target.value);
	};

	const changeSelectedItems = (newItems) => {
		setSelectedItems(newItems);
	};

	const [left, setLeft] = useState([]);
	const [right, setRight] = useState([]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Button variant="outlined">Trade offer dialog</Button>
			<Dialog open={open} onClose={handleClose} fullScreen>
				<DialogTitle>Trade</DialogTitle>
				<DialogContent>
					<DialogContentText>Make your trade offer here</DialogContentText>
					<Box noValidate component="form">
						<FormControl>
							<InputLabel>Player to trade with</InputLabel>
							<Select
								value={selectedPlayer}
								label="Player to trade with"
								onChange={handleSelectedPlayer}
								sx={{ minWidth: 200 }}
							>
								<MenuItem value={1}>Player 1</MenuItem>
								<MenuItem value={2}>Player 2</MenuItem>
								<MenuItem value={3}>Player 3</MenuItem>
								<MenuItem value={4}>Player 4</MenuItem>
							</Select>
						</FormControl>
					</Box>
					{Number.isFinite(selectedPlayer) ? (
						<ItemSelection
							selectedItems={selectedItems}
							changeSelectedItems={changeSelectedItems}
						/>
					) : null}
					{selectedItems.find((element) => element) ? (
						<PropertySelection/>
					) : null}
				</DialogContent>
			</Dialog>
		</Box>
	);
};

export default TradeDialog;
