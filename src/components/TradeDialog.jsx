import React, { useState, useEffect, useRef} from "react";
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
} from "@mui/material";
import ItemSelection from "./TradeDialogSubcomponents/ItemSelection";
import PropertySelection from "./TradeDialogSubcomponents/PropertySelection";
import { CollectionsOutlined } from "@mui/icons-material"
import { uuid } from "uuidv4"

//Think about how you would string together multiple dialogs or display everything in a single dialog
//Make it a full screen dialog (this one sounds the most appealing actually)
//Make it its own page entirely (get react-router set up and just do another component for that page)
//No matter what you're going to have to use the transfer list you saw on MUI docs, that looks like the best way to do it
//The idea right now is to have a full screen dialog that populates the content below it when you fill out the fields above it

// We are trading money, which is a text field entry
// Trading property is using the transfer list too
// Trading chance cards is using the transfer list too
const TradeDialog = (props) => {
	//const [open, setOpen] = useState(props.open);
	let open = useRef(props.open)
	const [selectedPlayer, setSelectedPlayer] = useState("");
	const [selectedItems, setSelectedItems] = useState([]);
	const [selectedPlayerProjects, setSelectedPlayerProjects] = useState([])
	console.log(props.playerStarting.current)
	console.log(props.players[props.playerStarting.current-1])
	const [curPlayerProjects, setCurPlayerProjects] = useState(props.players[props.playerStarting.current-1].properties)
	const [propertiesSold, setPropertiesSold] = useState();
	const [propertiesBought, setPropertiesBought] = useState()


	useEffect(() => {
		console.log("sold")
		console.log(propertiesSold)
		console.log("bought")
		console.log(propertiesBought)
	}, [propertiesSold, propertiesBought])

	const handleClose = () => {
		console.log("closing")
		open.current = false
		props.closeDialog()
	};

	const handleSelectedPlayer = (e) => {
		let selectedPlayerNum = e.target.value
		setSelectedPlayer(selectedPlayerNum);
		setSelectedPlayerProjects(props.players[selectedPlayerNum-1].properties)
		console.log(props.players[selectedPlayerNum-1])
		console.log(selectedPlayerNum)
		console.log(selectedPlayerProjects)
		console.log(curPlayerProjects)
	};

	const changeSelectedItems = (newItems) => {
		setSelectedItems(newItems);
	};

	const handleBoughtProperties = (newProperties) => {
		setPropertiesBought(newProperties)
	}

	const handleSoldProperties = (newProperties) => {
		setPropertiesSold(newProperties)
	}

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
						<Typography variant="h6" component="div" sx={{ml: 2, flex: 1}}>
							Trade
						</Typography>
						<Button color="inherit">Submit</Button>
					</Toolbar>
				</AppBar>
			<DialogContent>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
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
									return curPlayer.num === props.playerStarting.current ? null : <MenuItem key={i} value={curPlayer.num}>Player {curPlayer.num}</MenuItem>
								})}
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
						<PropertySelection handleBoughtProperties={handleBoughtProperties} handleSoldProperties={handleSoldProperties} curPlayerProjects={curPlayerProjects} selectedPlayerProjects={selectedPlayerProjects}/>
					) : null}
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default TradeDialog;
