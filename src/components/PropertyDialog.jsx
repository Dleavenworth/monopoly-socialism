import React, { useState, useEffect } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import GeneralDialog from "./GeneralDialog";

const PropertyDialog = (props) => {
	const [open, setOpen] = useState(props.open);

	console.log(props);

	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);

	const handleClose = (result) => {
		setOpen(false);
		if (result) {
			props.handleAccept();
		} else {
			props.handleDecline();
		}
	};

	return (
		<GeneralDialog content={props.content} title={props.title} open={props.open}>
			<Button color="error" autoFocus onClick={() => handleClose(false)}>
				No
			</Button>
			<Button color="success" onClick={() => handleClose(true)}>Yes</Button>
		</GeneralDialog>
	);
};

export default PropertyDialog;
