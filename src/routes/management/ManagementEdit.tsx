import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Option, OptionWithFormData, toastMsg } from "../../App";

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

const ManagementEdit: React.FC = () => {
  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/management/${editid}`, Option());
          const data = response.data;
          console.log(data, "salam");
          setNameSurname_az(data.nameSurname.az || "");
          setNameSurname_en(data.nameSurname.en || "");
          setNameSurname_ru(data.nameSurname.ru || "");
          setJob_az(data.job.az || "");
          setJob_en(data.job.en || "");
          setJob_ru(data.job.ru || "");
          setDescriptionAz(data.description.az || "");
          setDescriptionEn(data.description.en || "");
          setDescriptionRu(data.description.ru || "");
          setEducationAz(data.education.az || "");
          setEducationEn(data.education.en || "");
          setEducationRu(data.education.ru || "");
        } catch (error) {
          toastMsg();
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
      const response = await axios.put(`${URL}/management/${editid}`, formData, OptionWithFormData());
      console.log(response.data);
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/management");
    } catch (error) {
      console.error(error);
      toastMsg();
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
      setOpenSnackbar(true);
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
    <div className="component-edit">
      <Title description="Dəyişiklik et" title="Rəhbərlik" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
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
            <Typography variant="subtitle1">Şəkil:</Typography>
            <img src={imagePreview} alt="Preview" style={{ width: "80%", maxHeight: "400px", objectFit: "cover" }} />
          </Box>
        )}

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

export default ManagementEdit;
