import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
type categoriesType = {
  id: number;
  title: string;
};

const StructureEdit: React.FC = () => {
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
  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [category, setCategory] = useState("");

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/departments/${editid}`);
          const data = response.data;
          setTitleAz(data.departments.title.az || "");
          setTitleEn(data.departments.title.en || "");
          setTitleRu(data.departments.title.ru || "");
          setCategory(data.departments.category || "");
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

    const departamentData = {
      title_az,
      title_en,
      title_ru,
      category,
    };
    try {
      const response = await axios.put(`${URL}/departments/${editid}`, departamentData);
      console.log(response.data);
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/departments");
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
      <Title description="Dəyişiklik et" title="Strukturlar (Departments)" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
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

export default StructureEdit;
