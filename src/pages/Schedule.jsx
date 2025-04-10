import axios from 'axios';
import React, { useState } from 'react';
import { useTheme, Button, Grid, Paper, Typography } from '@mui/material';
import { useDarkMode } from '../hooks/useDarkMode';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { colors } from '../styles/theme'; // Import colors for fallback if needed

const Schedule = () => {
  const theme = useTheme();
  const [isDarkMode] = useDarkMode();
  const { isLoggedIn } = useAuth();
  const [isPending, setPending] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const token = localStorage.getItem("accessToken");

  // If user is not logged in, show login instructions and a login button.
  if (!isLoggedIn) {
    return (
      <div style={{ padding: theme.spacing(3), backgroundColor: theme.palette.background.default }}>
        <Typography variant="h5" gutterBottom>
          Kérjük jelentkezz be a rendszerbe!
        </Typography>
        <Typography variant="body1">
          Használd a jobb felső sarokban vagy a navigációban található bejelentkezési lehetőséget.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{ marginTop: theme.spacing(2) }}
        >
          Bejelentkezés
        </Button>
      </div>
    );
  }

  const Generate = async () => {
    try {
      setPending(true);
      const response = await axios.post(
        'https://hephaistos-backend-c6c5ewhraedvgzex.germanywestcentral-01.azurewebsites.net/api/TimetableGenerator/generate', 20,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      const classes = response.data.timetable.$values;

      const groupByDay = {};
      daysOfWeek.forEach(day => {
        groupByDay[day] = [];
      });

      classes.forEach(item => {
        if (groupByDay[item.dayOfWeek]) {
          groupByDay[item.dayOfWeek].push(item);
        }
      });

      Object.keys(groupByDay).forEach(day => {
        groupByDay[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
      });

      setSchedule(groupByDay);

    } catch (error) {
      console.error("Hiba történt: ", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      style={{
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: { padding: theme.spacing(2) },
      }}
    >
      <Typography variant="h4" gutterBottom>Órarend</Typography>

      {isPending ? (
        <CircularProgress />
      ) : (
        <div>
          {schedule ? (
            <Grid container spacing={2}>
              {daysOfWeek.map(day => (
                <Grid item xs={12} sm={6} md={2} key={day}>
                  <Paper
                    sx={{
                      padding: theme.spacing(2),
                      backgroundColor: theme.palette.background.paper,
                      marginBottom: theme.spacing(2),
                      minHeight: '200px',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        marginBottom: theme.spacing(1),
                        textAlign: 'center',
                        color: theme.palette.text.primary,
                      }}
                    >
                      {day}
                    </Typography>
                    <hr />
                    {schedule[day].length > 0 ? (
                      schedule[day].map((classItem, index) => (
                        <div key={`${day}-${index}`} style={{ marginBottom: theme.spacing(1) }}>
                          <Typography sx={{ color: theme.palette.text.primary }}>
                            <b>{classItem.subjectName}</b>
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {classItem.startTime.substring(0, 5)} - {classItem.endTime.substring(0, 5)}
                          </Typography>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Nincsenek órák
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>Nincsenek órák</Typography>
          )}
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={Generate}
        disabled={isPending}
        sx={{ marginTop: theme.spacing(2) }}
      >
        Generálás
      </Button>
    </div>
  );
};

export default Schedule;
