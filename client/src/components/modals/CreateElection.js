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
  Box,
  TextField,
  Container,
  IconButton,
  Typography
} from "../materialComponents";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateElectionDialog = ({ election, open, cancel, validate }) => {
  const [title, setTitle] = useState("");
  const handleTitleChange = event => setTitle(event.target.value);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const handleSDChange = event => setStartDate(event.target.value);
  const [endDate, setEndDate] = useState(
    moment()
      .add(1, "days")
      .format("YYYY-MM-DD")
  );
  const handleEDChange = event => setEndDate(event.target.value);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={cancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"md"}
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4" component="span">
            New Election
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <TextField
                  onChange={handleTitleChange}
                  value={election.title}
                  id="title"
                  label="Title"
                  variant="outlined"
                  placeholder="Municpal Election"
                  helperText="The name of the election"
                  margin="normal"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="Start Date"
                  type="date"
                  defaultValue={startDate}
                  variant="outlined"
                  value={startDate}
                  onChange={handleSDChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  defaultValue={endDate}
                  variant="outlined"
                  value={endDate}
                  onChange={handleEDChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => validate(title, startDate, endDate)}
            color="primary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateElectionDialog;
