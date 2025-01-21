import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
import "react-quill/dist/quill.snow.css";
import { Option, OptionWithFormData, toastMsg } from "../../App";
import MyEditor from "../../TipTap";

const ServicesPageEdit: React.FC = () => {

  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [slogan_az, setSloganAz] = useState("");
  const [slogan_en, setSloganEn] = useState("");
  const [slogan_ru, setSloganRu] = useState("");
  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/servicespage/${editid}`, Option());
          const data = response.data;
          console.log(data.description, 'bu data descdir')
          setTitleAz(data.title.az || "");
          setTitleEn(data.title.en || "");
          setTitleRu(data.title.ru || "");
          setSloganAz(data.slogan.az || "");
          setSloganEn(data.slogan.en || "");
          setSloganRu(data.slogan.ru || "");
          setImagePreview(`https://ekol-server-1.onrender.com${data.image}` || "");
          console.log("Description AZ:", data.description.az);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [editid]);

  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/servicespage/${editid}`, Option());

          setDescriptionAz(response.data?.description?.az || "");
          setDescriptionEn(response.data?.description?.en || "");
          setDescriptionRu(response.data?.description?.ru || "");

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);

  // UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editid) return;

    const formData = new FormData();
    formData.append("title_az", title_az);
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("slogan_az", slogan_az);
    formData.append("slogan_en", slogan_en);
    formData.append("slogan_ru", slogan_ru);
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    formData.append("imgback", image ? image : "");

    try {
      const response = await axios.put(`${URL}/servicespage/${editid}`, formData, OptionWithFormData());
      console.log(response.data);
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/servicespage");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
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
    <div className="component-edit">
      <Title description="Dəyişiklik et" title="Servislər (Fəaliyyət)" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
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
          label="Önizləmə mətni(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={slogan_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganAz(e.target.value)}
          name="slogan_az"
        />
        <TextField
          label="Önizləmə mətni(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={slogan_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganEn(e.target.value)}
          name="slogan_en"
        />
        <TextField
          label="Önizləmə mətni(RU)"
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

export default ServicesPageEdit;
