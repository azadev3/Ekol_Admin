import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { Button, Snackbar, Alert, TextField } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import { Option, toastMsg } from "../../App";

const TranslatesCreate: React.FC = () => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [key, setKey] = useState("");
  const [azTitle, setAzTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [ruTitle, setRuTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      key: key,
      azTitle: azTitle,
      enTitle: enTitle,
      ruTitle: ruTitle,
    };

    try {
      const response = await axios.post(`${URL}/translates`, data, Option());
      if (response.data || response.status === 200) {
        navigate("/translates");
      }
      setSnackbarMessage("UĞURLU!.");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      toastMsg();
      setSnackbarMessage("GÖZLƏNİLMƏZ XƏTA...");
      setOpenSnackbar(true);
    }

    if (!azTitle || !enTitle || !ruTitle || !key) {
      setSnackbarMessage("Bütün xanaları doldurun.");
      setOpenSnackbar(true);
      return;
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="component-create">
      <Title description="Əlavə et" title="Tərcümələr" to="" />

      <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
        <TextField
          required
          label="KEY"
          variant="outlined"
          fullWidth
          margin="normal"
          value={key}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setKey(e.target.value)}
          name="key"
        />
        <TextField
          required
          label="SÖZ (AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={azTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAzTitle(e.target.value)}
          name="az"
        />
        <TextField
          required
          label="SÖZ (EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={enTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEnTitle(e.target.value)}
          name="en"
        />
        <TextField
          required
          label="SÖZ (RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ruTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setRuTitle(e.target.value)}
          name="ru"
        />

        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          style={{ marginTop: "16px", marginLeft: "24px" }}>
          Göndər
        </Button>
      </form>

      {/* Snackbar for displaying messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: "100%", height: "50px" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TranslatesCreate;
