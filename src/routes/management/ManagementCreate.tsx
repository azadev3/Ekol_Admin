import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
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

const ManagementCreate: React.FC = () => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [nameSurname_az, setNameSurname_az] = useState("");
  const [nameSurname_en, setNameSurname_en] = useState("");
  const [nameSurname_ru, setNameSurname_ru] = useState("");
  const [job_az, setJob_az] = useState("");
  const [job_en, setJob_en] = useState("");
  const [job_ru, setJob_ru] = useState("");
  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  const [education_az, setEducationAz] = useState("");
  const [education_en, setEducationEn] = useState("");
  const [education_ru, setEducationRu] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nameSurname_az", nameSurname_az);
    formData.append("nameSurname_en", nameSurname_en);
    formData.append("nameSurname_ru", nameSurname_ru);
    formData.append("job_az", job_az);
    formData.append("job_en", job_en);
    formData.append("job_ru", job_ru);
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    formData.append("education_az", education_az);
    formData.append("education_en", education_en);
    formData.append("education_ru", education_ru);
    if (image) {
      formData.append("imgback", image);
    }

    try {
      const response = await axios.post(`${URL}/management`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data || response.status === 200) {
        navigate("/management");
      }
      setSnackbarMessage("UĞURLU!.");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("GÖZLƏNİLMƏZ XƏTA...");
      setOpenSnackbar(true);
    }

    if (
      !job_az ||
      !job_en ||
      !job_ru ||
      !nameSurname_az ||
      !nameSurname_en ||
      !nameSurname_ru ||
      !image ||
      !description_az ||
      !description_en ||
      !description_ru ||
      !education_az ||
      !education_en ||
      !education_ru
    ) {
      setSnackbarMessage("Bütün xanaları doldurun.");
      setOpenSnackbar(true);
      return;
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="component-create">
      <Title description="Əlavə et" title="Rəhbərlik" to="" />

      <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
        <TextField
          required
          label="Ad-Soyad (AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nameSurname_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNameSurname_az(e.target.value)}
          name="nameSurname_az"
        />

        <TextField
          required
          label="Ad-Soyad (EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nameSurname_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNameSurname_en(e.target.value)}
          name="nameSurname_en"
        />

        <TextField
          required
          label="Ad-Soyad (RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nameSurname_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNameSurname_ru(e.target.value)}
          name="nameSurname_ru"
        />

        <TextField
          required
          label="Vəzifənin adı (AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={job_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setJob_az(e.target.value)}
          name="job_az"
        />

        <TextField
          required
          label="Vəzifənin adı (EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={job_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setJob_en(e.target.value)}
          name="job_en"
        />

        <TextField
          required
          label="Vəzifənin adı (RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={job_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setJob_ru(e.target.value)}
          name="job_ru"
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
          label="Təhsil (AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={education_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEducationAz(e.target.value)}
          name="education_az"
        />

        <TextField
          required
          label="Təhsil (EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={education_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEducationEn(e.target.value)}
          name="education_en"
        />

        <TextField
          required
          label="Təhsil (RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={education_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEducationRu(e.target.value)}
          name="education_ru"
        />

        {/* upload image area */}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-image"
          type="file"
          name="imgback"
          onChange={handleImageChange}
        />
        <label htmlFor="upload-image">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
            Şəkil əlavə et
          </Button>
        </label>

        {imagePreview && (
          <Box mt={2}>
            <Typography variant="subtitle1">Resim Önizlemesi:</Typography>
            <img src={imagePreview} alt="Preview" style={{ width: "80%", maxHeight: "400px", objectFit: "cover" }} />
          </Box>
        )}

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

export default ManagementCreate;
