import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box } from "@mui/material";

const ChangePasswordDialog = ({ open, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSaveDisabled = !currentPassword || !newPassword || newPassword !== confirmPassword;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Jelszó módosítása</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Egy nehezen megfejthető jelszó segít megakadályozni e-mail fiókja jogosulatlan elérését.
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Jelenlegi jelszó"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
          />
          <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
            Elfelejtette jelszavát?
          </Typography>
          <TextField
            label="Új jelszó"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            helperText="Legalább 8 karakter; a kis- és nagybetűk különbözőnek számítanak."
          />
          <TextField
            label="Jelszó ismét"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
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

export default ChangePasswordDialog;
