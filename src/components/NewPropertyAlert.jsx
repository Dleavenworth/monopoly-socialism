import React, { useState, useEffect } from "react"
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material"

const NewPropertyAlert = (props) => {
	const [open, setOpen] = useState(props.open)

	useEffect(() => {
		setOpen(props.open)
	}, [props.open])

	const handleClose = (result) => {
		setOpen(false)
		if (result) {
			props.handleAccept()
		} else {
			props.handleDecline()
		}
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{"Acquire new property?"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Do you want to acquire this property?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleClose(false)}>No</Button>
				<Button onClick={() => handleClose(true)} autoFocus>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default NewPropertyAlert
