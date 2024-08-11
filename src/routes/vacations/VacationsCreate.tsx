import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Typography } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ],
};

const formats = ["header", "font", "list", "bullet", "bold", "italic", "underline", "link", "image", "align", "clean"];

const VacationsCreate: React.FC = () => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  const [location_az, setLocationAz] = useState("");
  const [location_en, setLocationEn] = useState("");
  const [location_ru, setLocationRu] = useState("");
  const [workRegime_az, setWorkRegimeAz] = useState("");
  const [workRegime_en, setWorkRegimeEn] = useState("");
  const [workRegime_ru, setWorkRegimeRu] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_az", title_az);
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    formData.append("location_az", location_az);
    formData.append("location_en", location_en);
    formData.append("location_ru", location_ru);
    formData.append("workRegime_az", workRegime_az);
    formData.append("workRegime_en", workRegime_en);
    formData.append("workRegime_ru", workRegime_ru);
    formData.append("end_date", endDate);
    formData.append("start_date", startDate);

    try {
      const response = await axios.post(`${URL}/vacations`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data || response.status === 200) {
        navigate("/vacations");
      }
      setSnackbarMessage("UĞURLU!.");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("GÖZLƏNİLMƏZ XƏTA...");
      setOpenSnackbar(true);
    }

    if (
      !title_az ||
      !title_en ||
      !title_ru ||
      !description_az ||
      !description_en ||
      !description_ru ||
      !location_az ||
      !location_en ||
      !location_ru ||
      !workRegime_az ||
      !workRegime_en ||
      !workRegime_ru ||
      !endDate ||
      !startDate
    ) {
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
      <Title description="Əlavə et" title="Vakansiyalar" to="" />

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

        <Typography variant="h6" gutterBottom>
          Açıqlama(AZ)
        </Typography>
        <ReactQuill value={description_az} onChange={setDescriptionAz} modules={modules} formats={formats} />

        <Typography variant="h6" gutterBottom>
          Açıqlama(EN)
        </Typography>
        <ReactQuill value={description_en} onChange={setDescriptionEn} modules={modules} formats={formats} />

        <Typography variant="h6" gutterBottom>
          Açıqlama(RU)
        </Typography>
        <ReactQuill value={description_ru} onChange={setDescriptionRu} modules={modules} formats={formats} />

        <TextField
          required
          label="Lokasyon(AZ) məsələn: Bakı, 28 May - Yeni Həyat Plaza"
          variant="outlined"
          fullWidth
          margin="normal"
          value={location_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLocationAz(e.target.value)}
          name="location_az"
        />
        <TextField
          required
          label="Lokasyon(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={location_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLocationEn(e.target.value)}
          name="location_en"
        />
        <TextField
          required
          label="Lokasyon(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={location_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLocationRu(e.target.value)}
          name="location_ru"
        />

        <TextField
          required
          label="Iş rejimi(AZ) Məsələn: Tam ştat"
          variant="outlined"
          fullWidth
          margin="normal"
          value={workRegime_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setWorkRegimeAz(e.target.value)}
          name="workRegime_az"
        />
        <TextField
          required
          label="Iş rejimi(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={workRegime_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setWorkRegimeEn(e.target.value)}
          name="workRegime_en"
        />
        <TextField
          required
          label="Iş rejimi(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={workRegime_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setWorkRegimeRu(e.target.value)}
          name="workRegime_ru"
        />
        <TextField
          required
          label="Başlanğıc tarixi məsələn: 12.05.2024 vəya 12 May 2024"
          variant="outlined"
          fullWidth
          margin="normal"
          value={startDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
          name="start_date"
        />
        <TextField
          required
          label="Bitiş tarixi məsələn: 12.06.2024 vəya 12 İyun 2024"
          variant="outlined"
          fullWidth
          margin="normal"
          value={endDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
          name="end_date"
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

export default VacationsCreate;
