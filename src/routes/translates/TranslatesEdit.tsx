import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";

const TranslatesEdit: React.FC = () => {
  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [azTitle, setAzTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [ruTitle, setRuTitle] = useState("");

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/translates/${editid}`);
          const data = response.data;
          setAzTitle(data.az || "");
          setEnTitle(data.en || "");
          setRuTitle(data.ru || "");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [editid]);

  // UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editid) return;
    const data = {
      azTitle: azTitle,
      enTitle: enTitle,
      ruTitle: ruTitle,
    };

    console.log(data, 'dataa')

    try {
      const response = await axios.put(`${URL}/translates/${editid}`, data);
      console.log(response.data, 'geden data');
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/translates");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="component-edit">
      <Title description="Dəyişiklik et" title="Tərcümələr" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
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

        <Button type="submit" variant="contained" color="success" style={{ marginTop: "16px", marginLeft: "24px" }}>
          Düzəliş et
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

export default TranslatesEdit;
