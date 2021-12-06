import React, { useState } from "react";
import { FormControlLabel, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  // envolking the hook
  const classes = useStyles();
  // useHistory for redirect
  const history = useHistory();
  // state
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  // handling errors if form not filled in
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  // setting radio button initial state
  const [category, setCategory] = useState("todos");
  // handleSubmit
  const handleSubmit = (e) => {
    // prevents reloading the page
    e.preventDefault();
    // on submit it sets the errors to false before checking below
    setTitleError(false);
    setDetailsError(false);
    // setting error to true on submit if title element in form is empty
    if (title === "") {
      setTitleError(true);
    }

    // setting error to true on submit if details element in form is empty
    if (details === "") {
      setDetailsError(true);
    }
    // console log checking the title and details
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        // telling fetch it is a post request to add data
        method: "POST",
        // what type of content is to be sent - basicall json
        headers: { "content-type": "application/json" },
        // this is where we send the json data - we need to stringify as we can't send json
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note.
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.btn}
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
