import React from 'react';
import { Collapse, Alert, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material"
            
const GeneralAlert = (props) => {

    return (
            <Collapse in={props.open}>
                <Alert
                    sx={{ width: "15vw" }}
                    severity={props.severity}
                    variant={props.variant}
                    action={
                        props.action
                    }
                >
                    {props.children}
                </Alert>
            </Collapse>
    )
}

export default GeneralAlert