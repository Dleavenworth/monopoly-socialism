import React, { useEffect } from "react";
import {
	Grid,
	List,
	Card,
	CardHeader,
	ListItem,
	ListItemText,
	ListItemIcon,
	Checkbox,
	Button,
	Divider,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const not = (a, b) => {
	return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
	return a.filter((value) => b.indexOf(value) !== -1);
};

const union = (a, b) => {
	return [...a, ...not(b, a)];
};

const PropertySelection = (props) => {
	const [checked, setChecked] = React.useState([]);

	useEffect(() => {
		setChecked([]);
	}, [props.reset]);

	useEffect(() => {
		const leftChecked = intersection(checked, props.curPlayerProjects);
		const rightChecked = intersection(checked, props.selectedPlayerProjects);
		props.handleBoughtProperties(rightChecked);
		props.handleSoldProperties(leftChecked);
	}, [checked]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const customList = (title, items) => (
		<Card>
			<CardHeader
				sx={{ px: 2, py: 1 }}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={
							numberOfChecked(items) === items.length && items.length !== 0
						}
						indeterminate={
							numberOfChecked(items) !== items.length &&
							numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{
							"aria-label": "all items selected",
						}}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List
				sx={{
					width: "20vw",
					height: "20vh",
					bgcolor: "background.paper",
					overflow: "auto",
				}}
				dense
				component="div"
				role="list"
			>
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem
							key={uuidv4()}
							role="listitem"
							button
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										"aria-labelledby": labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value.projectName} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<Grid container spacing={2} justifyContent="center" alignItems="center">
			<Grid item>{customList("My projects", props.curPlayerProjects)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						disabled={true}
						aria-label="move selected right"
					>
						&gt;
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						disabled={true}
						aria-label="move selected left"
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>
				{customList("Their projects", props.selectedPlayerProjects)}
			</Grid>
		</Grid>
	);
};

export default PropertySelection;
