import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";

const EditAccountDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState("zhyte01@outlook.hu");
  const [phone, setPhone] = useState("");

  const isSaveDisabled = !email || !phone; // Save button is active only if both fields are filled

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Fiókadatok szerkesztése</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="E-mail cím"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Telefonszám"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

export default EditAccountDialog;
