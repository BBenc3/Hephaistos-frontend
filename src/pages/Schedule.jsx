import React, { useState } from 'react';
import { useTheme, Button, Grid, Paper, Typography } from '@mui/material';
import { useDarkMode } from '../hooks/useDarkMode';

const generateRandomSchedule = () => {
  const subjects = ['Math', 'Science', 'History', 'Art', 'PE', 'Music'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const schedule = {};

  days.forEach(day => {
    schedule[day] = subjects.sort(() => 0.5 - Math.random()).slice(0, 3);
  });

  return schedule;
};

const Schedule = () => {
  const theme = useTheme();
  const [schedule, setSchedule] = useState(generateRandomSchedule());
  const [isDarkMode] = useDarkMode();

  const handleGenerateClick = () => {
    setSchedule(generateRandomSchedule());
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down('sm')]: { padding: '10px' }
    }}>
      <Typography variant="h4" gutterBottom>Órarend</Typography>
      <Grid container spacing={2}>
        {Object.keys(schedule).map(day => (
          <Grid item xs={12} sm={6} md={4} key={day}>
            <Paper style={{
              padding: '10px',
              backgroundColor: theme.palette.background.default
            }}>
              <Typography variant="h6">{day}</Typography>
              {schedule[day].map((subject, index) => (
                <Typography key={index}>{subject}</Typography>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleGenerateClick} style={{ marginTop: '20px' }}>
        Generálás
      </Button>
    </div>
  );
};

export default Schedule;
