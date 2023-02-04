import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const BookingForm = () => {
  const classes = useStyles();
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    // Add your submit logic here
    console.log("Reason: ", reason);
    console.log("Date: ", date);
    console.log("Time: ", time);
    // Clear form fields
    setReason("");
    setDate("");
    setTime("");
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Book an Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="reason"
              label="Reason for appointment"
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="date"
              label="Date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="time"
              label="Time"
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default BookingForm;
