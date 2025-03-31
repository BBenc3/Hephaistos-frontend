import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Schedule = () => {
  const { currentUser } = useAuth();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(20);
  const [currentTimePosition, setCurrentTimePosition] = useState(null);

  const handleGenerateClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://hephaistos-backend-c6c5ewhraedvgzex.germanywestcentral-01.azurewebsites.net/api/TimetableGenerator/generate',
        credits,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSchedule(response.data);
    } catch (err) {
      setError('Hiba történt az órarend generálása során.');
    } finally {
      setLoading(false);
    }
  };

  const daysOfWeek = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
  const timeSlots = Array.from({ length: 17 }, (_, i) => `${4 + i}:00`); // 4:00 to 20:00

  useEffect(() => {
    const updateCurrentTimePosition = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const totalMinutes = (currentHour - 4) * 60 + currentMinutes; // Minutes since 4:00
      const position = (totalMinutes / 60) * 60; // Convert to pixels assuming each hour is 60px
      setCurrentTimePosition(position >= 0 && position <= 1020 ? position : null); // Only show if within range
    };

    updateCurrentTimePosition();
    const interval = setInterval(updateCurrentTimePosition, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={3} sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
      Hephaistos Órarend Generál
      </Typography>
      <Box mb={3} display="flex" gap={2} justifyContent="center">
        <TextField
          label="Kredit szám"
          type="number"
          value={credits}
          onChange={(e) => setCredits(parseInt(e.target.value, 10))}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateClick}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Generálás'}
        </Button>
      </Box>
      {error && (
        <Typography color="error" mb={3} textAlign="center">
          {error}
        </Typography>
      )}
      {schedule && (
        <Box sx={{ overflowX: 'auto', border: '1px solid #ccc', borderRadius: 3, padding: 2, position: 'relative' }}>
          {/* Red line indicating current time */}
          {currentTimePosition !== null && (
            <Box
              sx={{
                position: 'absolute',
                top: `${currentTimePosition}px`,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: 'red',
                zIndex: 10,
              }}
            />
          )}
          <Grid container>
            {/* Time Scale */}
            <Grid item xs={1}>
              <Box>
                {timeSlots.map((time, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid #e0e0e0',
                    }}
                  >
                    <Typography variant="body2">{time}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Days of the Week */}
            {daysOfWeek.map((day) => (
              <Grid item xs={1} key={day}>
                <Box>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{ borderBottom: '2px solid #ccc', padding: 1 }}
                  >
                    {day}
                  </Typography>
                  {timeSlots.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        height: 60,
                        borderBottom: '1px solid #e0e0e0',
                        position: 'relative',
                      }}
                    >
                      {Array.isArray(schedule[day]) &&
                        schedule[day]
                          .filter(
                            (event) =>
                              event.startTime === `${4 + index}:00` // Match the event's start time
                          )
                          .map((event, idx) => (
                            <Paper
                              key={idx}
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: '10%',
                                right: '10%',
                                backgroundColor: '#FFEB3B', // Sticky Note yellow
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 3,
                                transform: 'rotate(-2deg)', // Slight rotation for sticky note effect
                              }}
                            >
                              <Typography variant="subtitle2" fontWeight="bold">
                                {event.name}
                              </Typography>
                              <Typography variant="body2">
                                {event.startTime} - {event.endTime}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {event.location || 'N/A'}
                              </Typography>
                            </Paper>
                          ))}
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Schedule;
