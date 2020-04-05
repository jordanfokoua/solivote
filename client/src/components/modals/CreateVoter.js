import React, { useState } from "react";
import moment from "moment";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Grid,
  TextField,
} from "../materialComponents";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateVoterDialog = ({ open, cancel, validate }) => {
  const [address, setAddress] = useState("");
  const handleNameChange = event => setAddress(event.target.value);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={cancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"New Voter"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <TextField
                  onChange={handleNameChange}
                  value={address}
                  id="title"
                  label="Voter address"
                  variant="outlined"
                  placeholder="0x0AE189b5F03f32B4e632..."
                  helperText="Blockchain address"
                  margin="normal"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={ validate(address)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateVoterDialog;
