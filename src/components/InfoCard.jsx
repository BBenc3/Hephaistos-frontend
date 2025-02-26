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
        height: 'auto', // Ensure the height adjusts to content
        ...sx // Allow custom styles from props
      }}
    >
      <Card sx={{ backgroundColor: "inherit", height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography id={`${title}-heading`} variant="h5" component="div">
            {title}
          </Typography>
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.primary, textAlign: 'justify' }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Button size="small" sx={{ marginBottom: theme.spacing(1) }}>További információ</Button>
          <Button size="small" variant="contained" color="primary">Próbálja ki</Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default InfoCard;
