import {
  Box,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useUserData from "../hooks/useUserData";
import { useUniversities } from "../hooks/useUniversities";
import useMajorSubjects from "../hooks/useMajorSubjects";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const {
    user,
    loading,
    errorNotification,
    updateCompletedSubjects,
    updateUserDetails,
    handleDeactivate, // Import the deactivate function
  } = useUserData();

  const { universities, loading: universitiesLoading, error: universitiesError } = useUniversities();
  console.log("Fetched universities:", universities); // Debugging line

  // A useMajorSubjects hookból kapjuk az elérhető tárgyakat a felhasználó szakához
  const { subjects: majorSubjects, loading: subjectsLoading, error: subjectsError, refresh: refreshMajorSubjects } = useMajorSubjects();

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [editableUser, setEditableUser] = useState(null);
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [availableMajors, setAvailableMajors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate(); // For redirecting after deactivation

  const handleDeactivateProfile = async () => {
    const confirmDeactivate = window.confirm("Biztosan inaktiválni szeretnéd a profilodat?");
    if (!confirmDeactivate) return;

    try {
      await handleDeactivate();
      navigate("/login"); // Redirect to login after deactivation
    } catch (error) {
      console.error("Error deactivating profile:", error);
    }
  };

  // Retrieve the base URL for profile pictures from the .env file
  const profileBaseUrl = process.env.REACT_APP_PROFILE_PICTURE_BASE_URL || ""; // Default to empty string if not defined

  // Construct the profile picture URL
  const displayAvatar = user?.profilePicturePath
    ? `${profileBaseUrl}ProfilePictures/${user?.profilePicturePath}`
    : "https://via.placeholder.com/80"; // Fallback image if no profile picture

  useEffect(() => {
    if (user && !editableUser) {
      const completed = Array.isArray(user.completedSubjects?.values)
        ? user.completedSubjects.values.map((s) => s.subjectId)
        : [];
      setSelectedSubjects(completed);
      setEditableUser({ ...user });
      setSelectedUniversityId(user.university?.id || "");
      const majors = universities.find((u) => u.id === user.university?.id)?.majors || [];
      setAvailableMajors(majors);
    }
  }, [user]);

  useEffect(() => {
    if (selectedUniversityId) {
      const selectedUni = universities.find((u) => u.id === selectedUniversityId);
      const majors = selectedUni?.majors || [];
      setAvailableMajors((prevMajors) =>
        JSON.stringify(prevMajors) !== JSON.stringify(majors) ? majors : prevMajors
      );
    }
  }, [selectedUniversityId, universities]);

  const handleCheckboxToggle = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSaveSubjects = () => {
    updateCompletedSubjects(selectedSubjects);
  };

  const handleSaveUserDetails = () => {
    updateUserDetails({
      username: editableUser.username,
      email: editableUser.email,
      startYear: parseInt(editableUser.startYear),
      role: editableUser.role || "User",
      note: editableUser.note || "",
      active: true,
      status: editableUser.status || "Active",
      majorId: editableUser.majorId,
    });
    setIsEditing(false);
  };

  if (loading || universitiesLoading || subjectsLoading) return <CircularProgress />;
  if (universitiesError || subjectsError)
    return <Typography variant="body2" color="error">
      Hiba történt az adatok betöltésekor.
    </Typography>;
  if (!user)
    return <Typography variant="body2" color="error">
      Nem sikerült betölteni a felhasználói adatokat.
    </Typography>;

  return (
    <Box sx={{ p: 4 }}>
      {errorNotification}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Avatar
            src={displayAvatar}
            alt={user.username}
            sx={{ width: 80, height: 80 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Felhasználónév"
                value={editableUser?.username || ""}
                onChange={(e) =>
                  setEditableUser((prev) => ({ ...prev, username: e.target.value }))
                }
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                value={editableUser?.email || ""}
                onChange={(e) =>
                  setEditableUser((prev) => ({ ...prev, email: e.target.value }))
                }
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!isEditing}>
                <InputLabel>Egyetem</InputLabel>
                <Select
                  value={selectedUniversityId}
                  label="Egyetem"
                  onChange={(e) => {
                    setSelectedUniversityId(e.target.value);
                    setEditableUser((prev) => ({
                      ...prev,
                      majorId: "",
                    }));
                  }}
                >
                  {universities.map((uni) => (
                    <MenuItem key={uni.id} value={uni.id}>
                      {uni.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!isEditing}>
                <InputLabel>Szak</InputLabel>
                <Select
                  value={editableUser?.major?.id || ""} // Default to user's major
                  label="Szak"
                  onChange={(e) =>
                    setEditableUser((prev) => ({
                      ...prev,
                      majorId: e.target.value,
                    }))
                  }
                >
                  {availableMajors.map((major) => (
                    <MenuItem key={major.id} value={major.id}>
                      {major.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Kezdés éve"
                value={editableUser?.startYear || ""}
                type="number"
                onChange={(e) =>
                  setEditableUser((prev) => ({
                    ...prev,
                    startYear: e.target.value,
                  }))
                }
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth disabled={!isEditing}>
                <InputLabel>Státusz</InputLabel>
                <Select
                  value={editableUser?.status || "Active"}
                  label="Státusz"
                  onChange={(e) =>
                    setEditableUser((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="Active">Aktív</MenuItem>
                  <MenuItem value="Passive">Passzív</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: "flex", gap: 2 }}>
              {!isEditing ? (
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(true)}
                  fullWidth
                >
                  Módosítás
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={handleSaveUserDetails}
                    fullWidth
                  >
                    Mentés
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsEditing(false);
                      setEditableUser({ ...user });
                      setSelectedUniversityId(user.university?.id || "");
                    }}
                    fullWidth
                  >
                    Mégse
                  </Button>
                </>
              )}
            </Grid>
            {/* Add the "Profil inaktiválása" button */}
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeactivateProfile}
                fullWidth
              >
                Profil inaktiválása
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <Paper sx={{ p: 2, flex: 1, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            ✅ Teljesített tárgyak
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {Array.isArray(user.completedSubjects?.values) &&
              user.completedSubjects.values.length > 0 ? (
              user.completedSubjects.values.map((s, idx) => (
                <ListItem key={`${s.subjectId}-${idx}`}>
                  <ListItemText primary={s.name} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2">Nincsenek teljesített tárgyak.</Typography>
            )}
          </List>
        </Paper>

        <Paper sx={{ p: 2, flex: 1, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            📚 Elérhető tárgyak
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {subjectsError ? (
            <Typography variant="body2" color="error">
              Hiba történt a tárgyak betöltésekor.
            </Typography>
          ) : (
            <List>
              {majorSubjects.length > 0 ? (
                majorSubjects.map((subject, idx) => (
                  <ListItem key={`${subject.id}-${idx}`}>
                    <Checkbox
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={() => handleCheckboxToggle(subject.id)}
                    />
                    <ListItemText
                      primary={`${subject.name}`}
                      secondary={`Kód: ${subject.code} – Kredit érték: ${subject.creditValue}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">Nincsenek elérhető tárgyak.</Typography>
              )}
            </List>
          )}
          <Button variant="contained" onClick={handleSaveSubjects}>
            Mentés
          </Button>
        </Paper>

      </Box>
    </Box>
  );
};

export default ProfilePage;
