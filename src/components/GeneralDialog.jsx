import React, { useState, useEffect } from "react"
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button} from "@mui/material"

//This should be a HOC instead probably
const GeneralDialog = (props) => {
	/*const [open, setOpen] = useState(props.open);

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
	};*/

	return (	
		<Dialog
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{props.title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{props.content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{props.children}
			</DialogActions>
		</Dialog>
	)
}

export default GeneralDialog