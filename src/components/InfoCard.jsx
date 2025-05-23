import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Paper, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const InfoCard = ({ title, description, sx, icon: Icon }) => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate
  const iconColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000'; // Set icon color based on theme mode

  return (
    <Paper
      id={title}
      elevation={3}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderWidth: 2, // Set border width to 2 pixels
        borderColor: '#DEE2E6', // Set border color to #DEE2E6
        borderStyle: "solid",
        overflow: "hidden",
        height: "auto",
        ...sx,
        borderRadius: 1,
        padding: 0, // Nem lesz extra rés
      }}
    >
      <Card
        sx={{
          backgroundColor: "inherit",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 0, // A Paper kezeli a borderRadius-t!
          margin: 0,
          padding: 0,
          boxShadow: "none",
        }}
      >
        {/* HEADER - Teljesen egybeolvad */}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(3), // Keep the size of the bar
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "auto",
            borderRadius: 0, // Nincs külön kerekítés
          }}
        >
          {/* Remove the text from the green bar */}
        </Box>

        {/* TARTALOM */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: theme.spacing(2),
            flexDirection: "column", // Align icon and text vertically
          }}
        >
          <Icon size={80} style={{ marginBottom: theme.spacing(1), color: iconColor }} /> {/* Render icon */}
          <Typography variant="body2" sx={{ color: theme.palette.text.primary, textAlign: "center", marginBottom: theme.spacing(1), fontSize: 18, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Box sx={{ padding: theme.spacing(2) }} /> {/* Add padding between title and description */}
          <Typography variant="body2" sx={{ color: theme.palette.text.primary, textAlign: "justify", fontStyle: 'italic' }}>
            {description}
          </Typography>
        </CardContent>

        {/* GOMBOK */}
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: theme.spacing(2),
          }}
        >
          <Button
            size="small"
            variant="contained"
            onClick={() => { navigate("/schedule"); }} // Fix navigate function
            sx={{ width: '150px', backgroundColor: '#1D8C8C' }}
          >
            Próbálja ki
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default InfoCard;
