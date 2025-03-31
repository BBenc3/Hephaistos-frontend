import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, TextField, MenuItem, Button, Chip, Grid, CircularProgress } from "@mui/material";
import { AddCircleOutline, Done, Save } from "@mui/icons-material";
import axios from "axios";

const CompletedSubjects = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [completedSubjects, setCompletedSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://hephaistos-backend-c6c5ewhraedvgzex.germanywestcentral-01.azurewebsites.net/api/subjects");
        setSubjects(response.data);
      } catch (err) {
        setError("Hiba történt a tantárgyak betöltése során.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddSubject = () => {
    if (selectedSubject && !completedSubjects.includes(selectedSubject)) {
      setCompletedSubjects([...completedSubjects, selectedSubject]);
      setSelectedSubject("");
    }
  };

  const handleRemoveSubject = (subject) => {
    setCompletedSubjects(completedSubjects.filter((item) => item !== subject));
  };

  const handleSaveSubjects = async () => {
    setSaving(true);
    try {
      await axios.put("https://hephaistos-backend-c6c5ewhraedvgzex.germanywestcentral-01.azurewebsites.net/api/User/completedSubjects", { completedSubjects });
      alert("A teljesített tárgyak sikeresen mentve!");
    } catch (err) {
      alert("Hiba történt a mentés során.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Teljesített tárgyak
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {/* Add Subject Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Tárgy hozzáadása
              </Typography>
              {loading ? (
                <Typography variant="body1" color="textSecondary">
                  Tantárgyak betöltése...
                </Typography>
              ) : error ? (
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              ) : (
                <Box display="flex" gap={2} alignItems="center">
                  <TextField
                    select
                    label="Válasszon tárgyat"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    fullWidth
                    variant="outlined"
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject.id} value={subject.name}>
                        {subject.name} ({subject.code})
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutline />}
                    onClick={handleAddSubject}
                    disabled={!selectedSubject}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    Hozzáadás
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Completed Subjects Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Teljesített tárgyak listája
              </Typography>
              {completedSubjects.length > 0 ? (
                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                  {completedSubjects.map((subject, index) => (
                    <Chip
                      key={index}
                      label={subject}
                      onDelete={() => handleRemoveSubject(subject)}
                      deleteIcon={<Done />}
                      color="primary"
                      sx={{ fontSize: "16px", padding: "8px" }}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" color="textSecondary" mb={2}>
                  Még nincs hozzáadott tárgy.
                </Typography>
              )}
              <Button
                variant="contained"
                color="success"
                startIcon={saving ? <CircularProgress size={20} /> : <Save />}
                onClick={handleSaveSubjects}
                disabled={completedSubjects.length === 0 || saving}
              >
                Mentés
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompletedSubjects;
