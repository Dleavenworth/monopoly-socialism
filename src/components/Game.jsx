import React, { useState, useRef } from "react";
import Controls from "./Controls";
import Board from "./Board";
import { Alert, Box, IconButton, Collapse } from "@mui/material";
import CellTypes from "../CellTypes";
import CommunityChest from "../CommunityChest";
import PropertyDialog from "./PropertyDialog";
import ProjectTypes from "../ProjectTypes";
import TradeDialog from "./TradeDialog";
import ShuttleDialog from "./ShuttleDialog";
import { Close as CloseIcon } from "@mui/icons-material";
import GeneralAlert from "./GeneralAlert";

const Game = () => {
    const gridSize = 9;
    const numPlayers = 2;
    const notMovableSquares = 2;

    const [players, setPlayers] = useState([
        { num: 1, location: 0, properties: [], color: "Red", money: 100 },
        { num: 2, location: 0, properties: [], color: "Blue", money: 100 },
        //{ num: 3, location: 0, properties: [], color: "green", money: 100 },
        //{ num: 4, location: 0, properties: [], color: "orange", money: 100 },
    ]);
    let curPlayerTurn = useRef(1);
    let playerGettingProperty = useRef(undefined);
    let playerPassGo = useRef(undefined);
    const [propertyAlert, setPropertyAlert] = useState(false);
    const [isTrading, setIsTrading] = useState(false);
    const [reset, setReset] = useState(false);
    const [isShuttling, setIsShuttling] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [chanceAlert, setChanceAlert] = useState(false);
    const [drawChanceAlert, setDrawAlert] = useState(false);
    const [goAlert, setGoAlert] = useState(false);
    let communityChestTotal = useRef(CommunityChest.getTotal());

    const makeBoard = () => {
        let col = 1;
        let row = 2;
        let newSquares = [];
        let curType = CellTypes.Cell;
        const totalSquares = gridSize * 2 + (gridSize - 2) * 2;
        let propertyCounter = 0;
        let curDescription = "";

        for (let i = 0; i < totalSquares; i++) {
            //0 8 16 24 for corners
            //4 12 20 28 for shuttles
            if (i === 0) {
                curType = CellTypes.Go;
            } else if (i === 8) {
                curType = CellTypes.Jail;
            } else if (i === 16) {
                curType = CellTypes.Parking;
            } else if (i === 24) {
                curType = CellTypes.GoToJail;
            } else if (i % (gridSize - 1) === (gridSize - 1) / 2) {
                curType = CellTypes.Shuttle;
            } else if (i % 2 !== 0) {
                curType = CellTypes.Property;
                curDescription = ProjectTypes.getPropList()[propertyCounter];
                propertyCounter++;
            } else if (i % 2 === 0) {
                // Add description for chance cards here
                curType = CellTypes.Chance;
            } else {
                throw new Error("Invalid value for i in makeBoard");
            }

            if (i < gridSize) {
                col++;
            } else if (i < 2 * gridSize - 1) {
                row++;
            } else if (i < 3 * gridSize - 2) {
                col--;
            } else {
                row--;
            }

            const square = {
                col: col,
                row: row,
                type: curType,
                owner: undefined,
                description: curDescription,
            };

            newSquares.push(square);
        }
        const center = {
            col: 6,
            row: 6,
            type: CellTypes.Chest,
            owner: undefined,
            description: "something",
            money: CommunityChest.getTotal(),
        };
        newSquares.push(center);
        const status = {
            col: 6,
            row: 7,
            type: CellTypes.Status,
            owner: undefined,
            description: "something",
            move: 0,
            curr: players[0].color,
            money: players[0].money,
        };
        newSquares.push(status);
        return newSquares;
    };

    const [squares, setSquares] = useState(makeBoard());

    const updatePlayers = (newPlayers) => {
        setPlayers(newPlayers);
    };

    const openPropertyAlert = (player) => {
        playerGettingProperty.current = player;
        setPropertyAlert(true);
    };

    const handleNewPropertyAccept = () => {
        let newPlayers = players;
        let newSquares = squares;
        setPropertyAlert(false);

        if (newPlayers[playerGettingProperty.current - 1].money < 50) {
            console.log("Not enough money for new property");
            setErrorAlert(true);
            return -1;
        }

        newPlayers[playerGettingProperty.current - 1].properties.push(
            squares[newPlayers[playerGettingProperty.current - 1].location]
                .description
        );
        console.log(players[playerGettingProperty.current - 1].location);
        console.log(playerGettingProperty.current);
        newSquares[players[playerGettingProperty.current - 1].location].owner =
            newPlayers[playerGettingProperty.current - 1].color;
        newPlayers[playerGettingProperty.current - 1].money -= 50;
        setPlayers([...newPlayers]);
        setSquares([...newSquares]);
    };

    const handleNewPropertyDecline = () => {
        setPropertyAlert(false);
    };

    const startTrade = () => {
        setIsTrading(true);
    };

    const closeDialog = () => {
        setIsTrading(false);
    };
    const handleGo = (player) => {
        let newPlayers = players;
        setGoAlert(true);
        playerPassGo.current = player;
        newPlayers[playerPassGo.current - 1].money += 45;
        setPlayers([...newPlayers]);

        communityChestTotal.current += 5;
        let newSquares = squares;
        newSquares[newSquares.length - 2].money = communityChestTotal.current;
        setSquares([...newSquares]);
    };
    const movePlayer = (numToMove) => {
        //setChanceAlert(false);
        //setDrawAlert(false);
        //setErrorAlert(false);
        //setGoAlert(false);

        console.log(numToMove);
        let newPlayers = players;
        const curPlayerLocation =
            newPlayers[curPlayerTurn.current - 1].location;
        let newPlayerLocation = curPlayerLocation;

        if (
            curPlayerLocation + numToMove >=
            squares.length - (1 + notMovableSquares)
        ) {
            newPlayerLocation =
                curPlayerLocation +
                numToMove -
                (squares.length - (1 + notMovableSquares));
            console.log("Pass Go");
            handleGo(curPlayerTurn.current);
        } else {
            newPlayerLocation += numToMove;
        }

        newPlayers[curPlayerTurn.current - 1].location = newPlayerLocation;

        updatePlayers([...newPlayers]);

        while (players !== newPlayers) {
            console.log("while loop doing something??");
        }

        handleMove();
        setCurrPlayer(curPlayerTurn);
        //signalMoving();
    };

    const handleMove = () => {
        console.log(squares);
        const curCell = squares[players[curPlayerTurn.current - 1].location];
        console.log(curCell);
        switch (curCell.type) {
            case CellTypes.Start:
                break;
            case CellTypes.GoToJail:
                console.log("Going to jail");
                break;
            case CellTypes.Go:
                console.log("Passing go, get money!");
                handleGo(curPlayerTurn.current);
                break;
            case CellTypes.Jail:
                console.log("At jail");
                break;
            case CellTypes.Property:
                if (curCell.owner === undefined) {
                    openPropertyAlert(curPlayerTurn.current);
                }
                console.log("At property");
                break;
            case CellTypes.Chance:
                console.log("At chance");
                setCommunityChest(10);
                setChanceAlert(true);
                /*const currentTotal = CommunityChest.getTotal();
				CommunityChest.setTotal(currentTotal - 10);
				console.log("Current total: " + CommunityChest.getTotal());*/
                break;
            case CellTypes.Shuttle:
                openShuttleAlert();
                console.log("At shuttle");
                break;
            case CellTypes.Parking:
                console.log("Free parking!");
                break;
            default:
                throw new Error("Invalid cell type");
        }

        if (curPlayerTurn.current >= numPlayers) {
            curPlayerTurn.current = 1;
        } else {
            curPlayerTurn.current++;
        }

        console.log("Current player turn is: " + curPlayerTurn.current);
    };

    const handleTrade = (
        propertiesBought,
        propertiesSold,
        playerOffering,
        playerGettingOffer
    ) => {
        if (propertiesBought === 0 && propertiesSold === 0) {
            return -1;
        }
        console.log(propertiesBought);
        let newSquares = squares;
        let newPlayers = players;

        // Add the properties bought to the properties held by the current player
        // Remove the properties sold from the current players properties
        // Change the owner marking on those cells
        // Add the properties sold to the properties held by the player getting the offer
        // Remove the properties bought from the player getting the offer
        // Change the owner marking on those cells

        // Add the properties bought to the properties held by the current player
        propertiesBought.forEach((property) => {
            newPlayers[playerOffering.current - 1].properties.push(property);
            // Adjust the cell to have a new owner
            let indexToAdjust = newSquares.findIndex(
                (element) => element.description === property
            );
            newSquares[indexToAdjust].owner =
                newPlayers[playerOffering.current - 1].color;
        });

        // Remove the sold properties from the current player properties
        propertiesSold.forEach((property) => {
            let playerOfferingObj = newPlayers[playerOffering.current - 1];
            let indexToRemove = playerOfferingObj.properties.findIndex(
                (element) => element === property
            );
            if (indexToRemove >= 0) {
                newPlayers[playerOffering.current - 1].properties.splice(
                    indexToRemove,
                    1
                );
            } else {
                return;
            }
        });

        // Remove the properties bought from the properties held by the player getting the offer
        propertiesBought.forEach((property) => {
            let playerGettingOfferObj = newPlayers[playerGettingOffer - 1];
            let indexToRemove = playerGettingOfferObj.properties.findIndex(
                (element) => element === property
            );
            if (indexToRemove >= 0) {
                newPlayers[playerGettingOffer - 1].properties.splice(
                    indexToRemove,
                    1
                );
            } else {
                return;
            }
        });

        // Add the properties sold to the properties held by the player getting the offer
        propertiesSold.forEach((property) => {
            newPlayers[playerGettingOffer - 1].properties.push(property);
            // Adjust the cell to have a new owner
            let indexToAdjust = newSquares.findIndex(
                (element) => element.description === property
            );
            newSquares[indexToAdjust].owner =
                newPlayers[playerGettingOffer - 1].color;
        });

        setSquares(newSquares);
        setPlayers(newPlayers);
    };

    const signalMoving = () => {
        setReset(!reset);
    };

    const openShuttleAlert = () => {
        setIsShuttling(true);
    };

    const handleShuttleAccept = (toMove) => {
        let newPlayers = players;
        setIsShuttling(false);

        if (toMove <= 0) {
            return -1;
        }

        console.log("Pre adjust: " + curPlayerTurn.current);

        if (curPlayerTurn.current === 1) {
            //curPlayerTurn.current = 1;
            curPlayerTurn.current = numPlayers;
        } else {
            curPlayerTurn.current--;
        }
        //curPlayerTurn.current--;

        if (newPlayers[curPlayerTurn.current - 1].money < 50) {
            console.log("Not enough money for shuttle");
            setErrorAlert(true);
            return -1;
        }

        console.log("After adjust: " + curPlayerTurn.current);
        newPlayers[curPlayerTurn.current - 1].money -= 50;

        setPlayers(newPlayers);
        movePlayer(toMove);
    };

    const handleShuttleDecline = () => {
        setIsShuttling(false);
    };

    const setCommunityChest = (subVal) => {
        communityChestTotal.current -= subVal;
        let newSquares = squares;
        newSquares[newSquares.length - 2].money = communityChestTotal.current;
        setSquares([...newSquares]);
    };
    const setMove = (move) => {
        let newSquares = squares;
        newSquares[newSquares.length - 1].move = move;
        setSquares([...newSquares]);
    };
    const setCurrPlayer = (curPlayer) => {
        let newSquares = squares;
        console.log(curPlayer.current);
        newSquares[newSquares.length - 1].curr =
            players[curPlayer.current - 1].color;
        newSquares[newSquares.length - 1].money =
            players[curPlayer.current - 1].money;
        setSquares([...newSquares]);
    };
    const setDrawChanceAlert = (action) => {
        setDrawAlert(action);
    };

    const setError = (val) => {
        setErrorAlert(val);
    };

    const setChance = (val) => {
        setChanceAlert(val);
    };

    const setGo = (val) => {
        setGoAlert(val);
    };

    const setDraw = (val) => {
        setDrawAlert(val);
    };

    return (
        <Box>
            <TradeDialog
                handleTrade={handleTrade}
                closeDialog={closeDialog}
                playerStarting={curPlayerTurn}
                players={players}
                squares={squares}
                open={isTrading}
                reset={reset}
            />
            <PropertyDialog
                open={propertyAlert}
                handleAccept={handleNewPropertyAccept}
                handleDecline={handleNewPropertyDecline}
                title="New Property"
                content="Do you want to buy this new property?"
            />
            <ShuttleDialog
                max={squares.length - 2}
                title="Community shuttle"
                content="Use the slider to indicate how many spaces you wish to move"
                open={isShuttling}
                handleAccept={handleShuttleAccept}
                handleDecline={handleShuttleDecline}
            />
            <Box sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Board
                        players={players}
                        gridSize={gridSize}
                        squares={squares}
                    />
                </Box>
                <Box sx={{ flexShrink: 1 }}>
                    <Controls
                        currentTotal={communityChestTotal.current}
                        setCommunityChest={setCommunityChest}
                        players={players}
                        curPlayerTurn={curPlayerTurn}
                        squares={squares}
                        handleUpdatePlayers={updatePlayers}
                        openPropertyAlert={openPropertyAlert}
                        startTrade={startTrade}
                        signalMoving={signalMoving}
                        openShuttleAlert={openShuttleAlert}
                        movePlayer={movePlayer}
                        setDrawAlert={setDrawChanceAlert}
                        setMove={setMove}
                        setError={setError}
                        errorAlert={errorAlert}
                        setChance={setChance}
                        chanceAlert={chanceAlert}
                        setDraw={setDraw}
                        drawAlert={drawChanceAlert}
                        setGo={setGo}
                        goAlert={goAlert}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Game;
