import React, { useState } from "react";
import {
	Grid,
	Button,
	Card,
	CardHeader,
	Checkbox,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

	const intersection = (a, b) => {
		return a.filter((value) => b.indexOf(value) === -1);
	};

	const not = (a, b) => {
		return a.filter((value) => b.indexOf(value) === -1);
	};

	const union = (a, b) => {
		return [...a, ...not(b, a)];
	};
	
const PropertySelection = (props) => {

	const [checkedProjects, setCheckedProjects] = useState([]);
	const [left, setLeft] = useState([0, 1, 2, 3]);
	const [right, setRight] = useState([4, 5, 6, 7]);
	const leftChecked = intersection(checkedProjects, left);
	const rightChecked = intersection(checkedProjects, right);
	const numberOfChecked = (items) =>
		intersection(checkedProjects, items).length;

	const handleToggle = (value) => () => {
		const currentIndex = checkedProjects.indexOf(value);
		const newChecked = [...checkedProjects];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setCheckedProjects(newChecked);
	};

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setCheckedProjects(not(checkedProjects, items));
		} else {
			setCheckedProjects(union(checkedProjects, items));
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
					width: 200,
					height: 230,
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
							key={value}
							role="listitem"
							button
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checkedProjects.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										"aria-labelledby": labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`List item ${value + 1}`} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<Grid container spacing={2} justifyContent="center" alignItems="center">
			<Grid item>{customList("My projects", left)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						disabled={true}
					>
						&gt;
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						disabled={true}
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList("Their projects", right)}</Grid>
		</Grid>
	);
};

export default PropertySelection;
