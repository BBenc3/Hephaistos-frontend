import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Paper, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const InfoCard = ({ title, description, sx }) => {
  const theme = useTheme();

  return (
    <Paper
  id={title}
  elevation={3}
  sx={{
    backgroundColor: theme.palette.background.default,
    borderWidth: 5,
    borderColor: theme.palette.primary.main,
    borderStyle: "solid",
    overflow: "hidden",
    height: "auto",
    ...sx,
    borderRadius: 2, // Garantáltan nincs rés
    padding: 0, // Eltünteti az esetleges extra helyet
  }}
>
  <Card
    sx={{
      backgroundColor: "inherit",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 0, // Eltávolítja a sarkokat
      margin: 0, // Megszünteti a pici rést
      padding: 0, // Eltávolít minden belső paddinget
      boxShadow: "none", // Árnyékok okozhatnak vizuális eltérést
    }}
  >
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: 0, // Ne legyen különálló
        borderRadius: 0, // Eltávolít minden esetleges sarkosítást
      }}
    >
      <Typography id={`${title}-heading`} variant="h5" component="div">
        {title}
      </Typography>
    </Box>
    <CardContent
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
      }}
    >
      <Typography variant="body2" sx={{ color: theme.palette.text.primary, textAlign: "justify" }}>
        {description}
      </Typography>
    </CardContent>
    <CardActions
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: theme.spacing(2),
      }}
    >
      <Button size="small" sx={{ marginBottom: theme.spacing(1) }}>További információ</Button>
      <Button size="small" variant="contained" color="primary">Próbálja ki</Button>
    </CardActions>
  </Card>
</Paper>


  );
};

export default InfoCard;
