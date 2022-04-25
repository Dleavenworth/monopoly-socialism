import React from "react";
import {
    ListItemText,
    ListItemIcon,
    List,
    ListItem,
    Drawer,
    Toolbar,
    Box,
    IconButton,
} from "@mui/material";
import CellTypes from "../CellTypes";
import CommunityChest from "../CommunityChest";
import {
    Casino,
    CurrencyExchange,
    Close as CloseIcon,
} from "@mui/icons-material";
import GeneralAlert from "./GeneralAlert";

const Controls = (props) => {
    const drawerWidth = "17vw";

    let currentTotal = props.currentTotal;

    const rollDie = () => {
        props.setChance(false);
        props.setDraw(false);
        props.setError(false);
        props.setGo(false);
        let movementDie = Math.floor(Math.random() * 6) + 1;
        console.log("Movement: " + movementDie);
        let actionDie = Math.floor(Math.random() * 6) + 1;
        console.log("Action: " + actionDie);
        //Doubles movement, Draw chance card, draw two chance cards
        //Other numbers are 2 3 and 4

        switch (actionDie) {
            case 1:
                movementDie = movementDie * 2;
                break;
            case 2:
                movementDie = movementDie + 2;
                break;
            case 3:
                movementDie = movementDie + 3;
                break;
            case 4:
                movementDie = movementDie + 4;
                break;
            case 5:
                console.log("draw chance!");
                props.setCommunityChest(20);
                currentTotal -= 20;
                //currentTotal = CommunityChest.getTotal();
                CommunityChest.setTotal(currentTotal);
                props.setDrawAlert(true);
                console.log("Current total: " + CommunityChest.getTotal());
                break;
            case 6:
                console.log("draw two chance!");
                props.setCommunityChest(30);
                currentTotal -= 30;
                //currentTotal = CommunityChest.getTotal();
                CommunityChest.setTotal(currentTotal);
                props.setDrawAlert(true);
                console.log("Current total: " + CommunityChest.getTotal());
                break;
            default:
                throw new Error("Action die result was not between 1 and 6");
        }
        props.setMove(movementDie);
        return movementDie;
    };

    const startTrade = () => {
        console.log("in the on click");
        props.startTrade();
    };

    return (
        <Drawer
            variant="permanent"
            anchor="right"
            PaperProps={{ elevation: 24 }}
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
                    <ListItem
                        key="move"
                        button
                        onClick={() => props.movePlayer(rollDie())}
                    >
                        <ListItemIcon>
                            <Casino />
                        </ListItemIcon>
                        <ListItemText primary="ROLL DIE" />
                    </ListItem>
                    <ListItem key="trade" button onClick={startTrade}>
                        <ListItemIcon>
                            <CurrencyExchange />
                        </ListItemIcon>
                        <ListItemText primary="START TRADE" />
                    </ListItem>

                    <GeneralAlert
                        open={props.errorAlert}
                        severity="error"
                        variant="filled"
                        action={
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => props.setError(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Not enough money!
                    </GeneralAlert>

                    <GeneralAlert
                        open={props.chanceAlert}
                        severity="info"
                        variant="filled"
                        action={
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => props.setChance(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        You landed on Chance, so money will be taken from the
                        community chest.
                    </GeneralAlert>

                    <GeneralAlert
                        open={props.drawAlert}
                        severity="info"
                        variant="filled"
                        action={
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => props.setDraw(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        You rolled chance, so money will be taken from the
                        community chest
                    </GeneralAlert>

                    <GeneralAlert
                        open={props.goAlert}
                        severity="info"
                        variant="filled"
                        action={
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => props.setGo(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        A player passed Go. They get $45 and the community chest
                        gets $5
                    </GeneralAlert>
                </List>
            </Box>
        </Drawer>
    );
};

export default Controls;
