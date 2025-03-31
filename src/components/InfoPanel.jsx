import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const InfoPanel = () => {
  return (
    <Paper sx={{ padding: 2, borderRadius: 3, boxShadow: 3, backgroundColor: "#f9f9f9", mb: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Üdvözöljük a Hephaistos oldalon!
      </Typography>
      <Typography variant="body1" color="textSecondary">
        A Hephaistos egy modern platform, amely segít az órarendek generálásában, a tantárgyak kezelésében, 
        valamint a felhasználói profilok és biztonsági beállítások kezelésében. Az oldal célja, hogy egyszerűbbé 
        és hatékonyabbá tegye a tanulmányi adminisztrációt.
      </Typography>
    </Paper>
  );
};

export default InfoPanel;
