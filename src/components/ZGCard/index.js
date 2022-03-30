import React from "react";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import cardStyle from "./style";

export const ZGCard = (props) => {
  const {
    icon,
    title,
    count,
    time,
    cardBgColor,
    iconColor,
    cardLink,
    cardIconColor,
    ...others
  } = props;
  const useStyles = makeStyles(cardStyle);
  const classes = useStyles();

  return (
    <div>
      <Paper
        variant="standard"
        className={classes.card}
        sx={{ backgroundColor: cardBgColor ? cardBgColor : "#f3f1f1" }}
        {...others}
      >
        <CardContent>
          <Card
            className={classes.innerCard}
            variant="standard"
            style={{
              backgroundColor: cardIconColor ? cardIconColor : "#ccc",
              fontSize: "1rem",
            }}
          >
            {icon}
          </Card>
          <Typography
            sx={{ fontSize: 14, textAlign: "right", fontWeight: "100" }}
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            sx={{ fontSize: 28, textAlign: "right" }}
            color="text.secondary"
          >
            {count}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "content",
          }}
        >
          <Link to={cardLink}>
            <UpdateIcon sx={{ color: iconColor ? iconColor : "#b1b1b1" }} />
          </Link>
          <Link to={cardLink}>
            <Typography sx={{ mb: 1, fontSize: 14 }} color="text.secondary">
              {time ? time : "View"}
            </Typography>
          </Link>
        </CardActions>
      </Paper>
    </div>
  );
};
