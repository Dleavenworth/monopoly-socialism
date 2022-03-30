import React, { useState, useEffect, useRef } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Grid,
} from "@mui/material";
import ItemSelection from "./TradeDialogSubcomponents/ItemSelection";
import PropertySelection from "./TradeDialogSubcomponents/PropertySelection";
import { v4 as uuidv4 } from "uuid";

//Think about how you would string together multiple dialogs or display everything in a single dialog
//Make it a full screen dialog (this one sounds the most appealing actually)
//Make it its own page entirely (get react-router set up and just do another component for that page)
//No matter what you're going to have to use the transfer list you saw on MUI docs, that looks like the best way to do it
//The idea right now is to have a full screen dialog that populates the content below it when you fill out the fields above it

// We are trading money, which is a text field entry
// Trading property is using the transfer list too
// Trading chance cards is using the transfer list too

// The issue with the results of trades not being shown is because props.players does not get updated to the version created by handleTrade()
const TradeDialog = (props) => {
	let open = useRef(props.open);
	const [selectedPlayer, setSelectedPlayer] = useState("");
	const [selectedItems, setSelectedItems] = useState([]);
	const [selectedPlayerProjects, setSelectedPlayerProjects] = useState([]);
	const [propertiesSold, setPropertiesSold] = useState();
	const [propertiesBought, setPropertiesBought] = useState();

	useEffect(() => {
		triggerReset();
	}, [props.reset]);

	useEffect(() => {
		console.log("players were changed");
		console.log(props.players);
	}, [props.players]);

	const triggerReset = () => {
		setSelectedPlayer("");
		setSelectedItems([]);
	};

	const handleClose = () => {
		open.current = false;
		props.closeDialog();
	};

	const handleSelectedPlayer = (e) => {
		let selectedPlayerNum = e.target.value;
		console.log(props.players[selectedPlayerNum - 1].properties);
		setSelectedPlayer(selectedPlayerNum);
		//selectedPlayerProjects = [...props.players[selectedPlayerNum - 1].properties]
		setSelectedPlayerProjects([
			...props.players[selectedPlayerNum - 1].properties,
		]);
	};

	const changeSelectedItems = (newItems) => {
		setSelectedItems(newItems);
	};

	const handleBoughtProperties = (newProperties) => {
		setPropertiesBought(newProperties);
	};

	const handleSoldProperties = (newProperties) => {
		setPropertiesSold(newProperties);
	};

	const submitTrade = () => {
		props.handleTrade(
			propertiesBought,
			propertiesSold,
			props.playerStarting,
			selectedPlayer
		);
		setSelectedPlayer("");
		//setSelectedPlayerProjects([])
		triggerReset();
		handleClose();
	};

	return (
		<Dialog open={props.open} onClose={handleClose} fullScreen>
			<AppBar position="relative">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						sx={{ mr: 2 }}
					></IconButton>
					<Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }}>
						Trade
					</Typography>
					<Button onClick={handleClose} color="inherit">
						Cancel
					</Button>
					<Button onClick={submitTrade} color="inherit">
						Submit
					</Button>
				</Toolbar>
			</AppBar>
			<DialogContent sx={{ justifyContent: "center", alignItems: "center" }}>
				<Grid
					container
					spacing={2}
					direction="column"
					alignItems="center"
					justifyContent="center"
				>
					<Grid item>
						<Box noValidate component="form">
							<FormControl>
								<InputLabel>Player to trade with</InputLabel>
								<Select
									value={selectedPlayer}
									label="Player to trade with"
									onChange={handleSelectedPlayer}
									sx={{ minWidth: 200 }}
								>
									{props.players.map((curPlayer, i) => {
										let key = uuidv4();
										return curPlayer.num ===
											props.playerStarting.current ? null : (
											<MenuItem key={key} value={curPlayer.num}>
												Player {curPlayer.num}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Box>
					</Grid>
					<Grid item>
						{Number.isFinite(selectedPlayer) ? (
							<ItemSelection
								selectedItems={selectedItems}
								changeSelectedItems={changeSelectedItems}
							/>
						) : null}
					</Grid>
					<Grid>
						{selectedItems[0] ? (
							<PropertySelection
								handleBoughtProperties={handleBoughtProperties}
								handleSoldProperties={handleSoldProperties}
								curPlayerProjects={[
									...props.players[props.playerStarting.current - 1].properties,
								]}
								selectedPlayerProjects={selectedPlayerProjects}
							/>
						) : null}
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

export default TradeDialog;
