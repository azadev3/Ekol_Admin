import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";

type categoriesType = {
  id: number;
  title: string;
};

const StructureCreate: React.FC = () => {
  const categories: categoriesType[] = [
    {
      id: 1,
      title: "Daxili nəzarət departamenti",
    },
    {
      id: 2,
      title: "Ekologiya idarəsi",
    },
    {
      id: 3,
      title: "İstehsalat üzrə müavin (texniki drektor)",
    },
    {
      id: 4,
      title: "Baş direktorun müavini",
    },
    {
      id: 5,
      title: "SƏTƏM üzrə müavin",
    },
    {
      id: 6,
      title: "Ümumi işlər üzrə müavin",
    },
    {
      id: 7,
      title: "İqdisadiyyat və Uçot üzrə müavin",
    },
  ];

  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const departamentData = {
      title_az,
      title_en,
      title_ru,
      category,
    };

    try {
      const response = await axios.post(`${URL}/departments`, departamentData);
      if (response.data || response.status === 200) {
        navigate("/departments");
      }
      setSnackbarMessage("UĞURLU!.");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("GÖZLƏNİLMƏZ XƏTA...");
      setOpenSnackbar(true);
    }

    if (!title_az || !title_en || !title_ru) {
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
      <Title description="Əlavə et" title="Strukturlar" to="" />

      <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
        <TextField
          required
          label="Başlıq(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
          name="title_az"
        />

        <TextField
          required
          label="Başlıq(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
          name="title_en"
        />

        <TextField
          required
          label="Başlıq(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
          name="title_ru"
        />

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="category-label">Kategori</InputLabel>
          <Select
            name="category"
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Kategori">
            {categories.map((cat: categoriesType, index) => (
              <MenuItem key={index} value={cat.title}>
                {cat.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

export default StructureCreate;
