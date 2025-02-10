import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { OptionWithFormData, toastMsg } from "../../App";
import MyEditor from "../../TipTap";

const BlogCreate: React.FC = () => {

  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  const [slogan_az, setSloganAz] = useState('');
  const [slogan_en, setSloganEn] = useState('');
  const [slogan_ru, setSloganRu] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [created_at, setCreatedAt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_az", title_az);
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    formData.append('slogan_az', slogan_az);
    formData.append('slogan_en', slogan_en);
    formData.append('slogan_ru', slogan_ru);
    formData.append("imgback", image ? image : "");
    formData.append("created_at", created_at);
    formData.append("updated", "");
    try {
      const response = await axios.post(`${URL}/blog`, formData, OptionWithFormData());
      if (response.data || response.status === 200) {
        navigate("/blog");
      }
      setSnackbarMessage("UĞURLU!.");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("GÖZLƏNİLMƏZ XƏTA...");
      setOpenSnackbar(true);
      toastMsg();
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
      <Title description="Əlavə et" title="Xəbərlər" to="" />

      <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
        <TextField
          label="Başlıq(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
          name="title_az"
        />

        <TextField
          label="Başlıq(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
          name="title_en"
        />

        <TextField
          label="Başlıq(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
          name="title_ru"
        />


        <TextField
          label="Slogan(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={slogan_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganAz(e.target.value)}
          name="slogan_az"
        />

        <TextField
          label="Slogan(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={slogan_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganEn(e.target.value)}
          name="slogan_en"
        />

        <TextField
          label="Slogan(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={slogan_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganRu(e.target.value)}
          name="slogan_ru"
        />

        <div className="my-editor-component">
          <label>Açıqlama (AZ)</label>
          <MyEditor value={description_az} handleChange={(html: string) => setDescriptionAz(html)} />
        </div>
        <div className="my-editor-component">
          <label>Açıqlama (EN)</label>
          <MyEditor value={description_en} handleChange={(html: string) => setDescriptionEn(html)} />
        </div>
        <div className="my-editor-component">
          <label>Açıqlama (RU)</label>
          <MyEditor value={description_ru} handleChange={(html: string) => setDescriptionRu(html)} />
        </div>

        <TextField
          label="Yaradılma tarixi"
          variant="outlined"
          fullWidth
          type="date"
          margin="normal"
          value={created_at}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCreatedAt(e.target.value)}
          name="created_at"
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

export default BlogCreate;
