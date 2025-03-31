import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, TextField, Box } from "@mui/material";

const EditProfileDialog = ({ open, onClose }) => {
  const [birthYear, setBirthYear] = useState("2019");
  const [birthMonth, setBirthMonth] = useState("szemptember");
  const [birthDay, setBirthDay] = useState("30");
  const [country, setCountry] = useState("Magyarország");

  const isSaveDisabled = true; // Save button is inactive

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Profiladatok szerkesztése</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={2}>
            <TextField
              select
              label="Év"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              sx={{ flex: 1 }}
            >
              {Array.from({ length: 100 }, (_, i) => {
                const year = 2025 - i;
                return <MenuItem key={year} value={year}>{year}</MenuItem>;
              })}
            </TextField>
            <TextField
              select
              label="Hónap"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              sx={{ flex: 1 }}
            >
              {[
                "január", "február", "március", "április", "május", "június",
                "július", "augusztus", "szeptember", "október", "november", "december"
              ].map((month) => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Nap"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              sx={{ flex: 1 }}
            >
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                return <MenuItem key={day} value={day}>{day}</MenuItem>;
              })}
            </TextField>
          </Box>
          <Box>
            <TextField
              select
              label="Ország vagy régió"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
            >
              {["Magyarország", "Egyesült Államok", "Németország", "Franciaország", "Olaszország",
                "Spanyolország", "Egyesült Királyság", "Kanada", "Ausztrália", "Japán",
                "Kína", "India", "Brazília", "Mexikó", "Oroszország",
                "Dél-Afrika", "Argentína", "Chile", "Kolumbia", "Peru",
                "Új-Zéland", "Dél-Korea", "Szingapúr", "Thaiföld", "Vietnam",
                "Malajzia", "Indonézia", "Fülöp-szigetek", "Szaúd-Arábia", "Törökország",
                "Görögország", "Hollandia", "Belgium", "Svájc", "Ausztria",
                "Svédország", "Norvégia", "Dánia", "Finnország", "Izland",
                "Írország", "Portugália", "Lengyelország", "Csehország", "Szlovákia",
                "Szlovénia", "Horvátország", "Szerbia", "Románia", "Bulgária",
                "Ukrajna", "Fehéroroszország", "Észtország", "Lettország", "Litvánia",
                "Izrael", "Egyiptom", "Marokkó", "Tunézia", "Algéria",
                "Nigéria", "Kenya", "Etiópia", "Ghána", "Tanzánia",
                "Zambia", "Zimbabwe", "Botswana", "Namíbia", "Mozambik"
              ].map((country) => (
                <MenuItem key={country} value={country}>{country}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Mégse
        </Button>
        <Button disabled={isSaveDisabled} color="primary">
          Mentés
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
