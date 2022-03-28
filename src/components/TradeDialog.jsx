import React, {useState, Fragment} from "react"
import {Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, DialogActions} from "@mui/material"

const TradeDialog = (props) => {
	const [open, setOpen] = useState(props.open)

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
      <Button variant="outlined">
        Open max-width dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
	)
}

export default TradeDialog