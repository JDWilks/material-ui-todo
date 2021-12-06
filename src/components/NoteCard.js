import React from "react";
import {
  Avatar,
  Card,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { blue, green, pink, red, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  test: {
    border: (note) => {
      if (note.category === "work") {
        return "2px solid red";
      }
      if (note.category === "reminders") {
        return "2px solid blue";
      }
      if (note.category === "todos") {
        return "2px solid pink";
      }
      if (note.category === "money") {
        return "2px solid green";
      }
    },
  },
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return red[700];
      }
      if (note.category === "reminders") {
        return blue[700];
      }
      if (note.category === "todos") {
        return pink[100];
      }
      if (note.category === "money") {
        return green[700];
      }
    },
  },
});

function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note);

  return (
    <div>
      <Card elevation={5} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}{" "}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoteCard;
