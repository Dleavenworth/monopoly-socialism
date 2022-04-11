import React, { useEffect, useState } from "react";
import GeneralAlert from "./GeneralAlert";
import { Button, Slider, Box} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const ShuttleAlert = (props) => {
	const [open, setOpen] = useState(props.open);
	let sliderValue = 0

	const setSliderValue = (e) => {
		sliderValue = e.target.value
	}

	const slider = <Slider key={uuidv4()} onChange={setSliderValue} sx={{pt: 10}} valueLabelDisplay="auto" defaultValue={0} step={1} marks min={0} max={props.max} />
	const content = [props.content, slider]

	console.log(props);

	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);

	const handleClose = (result) => {
		setOpen(false);
		if (result) {
			props.handleAccept(sliderValue);
		} else {
			props.handleDecline();
		}
	};


	return (
		<GeneralAlert title={props.title} content={content} open={props.open}>
			<Button onClick={handleClose}>Do not use shuttle</Button>
			<Button onClick={handleClose}>Move with shuttle</Button>
		</GeneralAlert>
	);
};

export default ShuttleAlert;
