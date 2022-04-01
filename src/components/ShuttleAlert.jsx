import React, {useEffect, useState} from "react"
import GeneralAlert from "./GeneralAlert"
import { Button } from "@mui/material"

const ShuttleAlert = (props) => {
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
	}
	
	return (
		<GeneralAlert title={props.title} content={props.content} open={props.open}>
			<Button>Move with shuttle</Button>
			<Button>Do not use shuttle</Button>
		</GeneralAlert>	
	)
}

export default ShuttleAlert