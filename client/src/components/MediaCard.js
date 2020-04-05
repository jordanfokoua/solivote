import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
});

const MediaCard = ({
  imgURL,
  index,
  results,
  candidate,
  voters,
  voteAction,
  voted
}) => {
  const classes = useStyles();
  console.log("candidate", candidate)
  console.log("voters", voters)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imgURL}
          title={candidate.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${index + 1} - ${candidate.name}`}
          </Typography>
          {results ? (
            <Box>
              <Typography variant="h4" color="textSecondary" component="p">
                {voters > 0
                  ? `${(candidate.voteCount / voters) * 100} %`
                  : "0%"}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {" "}
                {`${candidate.voteCount} votes`}
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="body2" color="textSecondary" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
      {voteAction && (
        <IconButton
          onClick={() => voteAction()}
          color="primary"
          aria-label="Vote"
          disabled={voted}
        >
          <ThumbUpIcon fontSize="large" />
        </IconButton>
      )}
    </Card>
  );
};

export default MediaCard;
