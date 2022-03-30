import * as React from "react";
import { Card, Grid, Tabs, Tab, Box, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { FormatListBulletedSharp, NoteAdd } from "@mui/icons-material";
import { ZGCard } from "../../components";

export const Dashboard = () => {
  const cards = [
    {
      title: "Total Leads",
      count: "10",
      time: "",
      cardIconColor: "#FB8C00",
      cardBgColor: "",
      cardLink: "",
      icon: <ArticleIcon sx={{ fontSize: "2.2rem", color: "#fff" }} />,
    },
    {
      title: "Open Leads",
      count: "50",
      time: "",
      cardIconColor: "#006C74",
      cardBgColor: "",
      cardLink: "",
      icon: <AccessTimeIcon sx={{ fontSize: "2.2rem", color: "#fff" }} />,
    },
    {
      title: "Converted - Leads",
      count: "20",
      time: "",
      cardIconColor: "#56bf46",
      cardBgColor: "",
      cardLink: "",
      icon: (
        <FormatListBulletedSharp sx={{ fontSize: "2.2rem", color: "#fff" }} />
      ),
    },
    {
      title: "Rejected Leads",
      count: "30",
      time: "",
      cardIconColor: "#343A40",
      cardBgColor: "",
      cardLink: "",
      icon: <NoteAdd sx={{ fontSize: "2.2rem", color: "#fff" }} />,
    },
  ];

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Card sx={{ px: 2, py: 3, my: 2, textAlign: "center" }}>
        <Grid container spacing={0}>
          {cards.map((card, index) => (
            <Grid key={index} item lg={3} xl={3} md={3} sm={6} xs={12}>
              <ZGCard
                icon={card.icon}
                title={card.title}
                count={card.count}
                time={card.time}
                cardIconColor={card.cardIconColor}
                cardBgColor={card.cardBgColor}
                iconColor=""
                cardLink=""
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};
