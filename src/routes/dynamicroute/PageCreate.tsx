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

const PageCreate: React.FC = () => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [path, setPath] = useState("");
  const [dropdownName, setDropdownName] = useState("");
  const [dropdownNameEn, setDropdownNameEn] = useState("");
  const [dropdownNameRu, setDropdownNameRu] = useState("");
  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!path) {
      setSnackbarMessage("Səhifə yolunun qeyd edilməsi mütləqdir.");
      setOpenSnackbar(true);
    }

    const formData = new FormData();
    formData.append("path", path);
    formData.append("dropdown_name", dropdownName);
    formData.append("dropdown_name_en", dropdownNameEn);
    formData.append("dropdown_name_ru", dropdownNameRu);
    formData.append("title_az", title_az);
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    formData.append("imgback", image ? image : "");

    try {
      const response = await axios.post(`${URL}/page`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data || response.status === 200) {
        navigate("/page");
      }
      setSnackbarMessage("UĞURLU!.");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("GÖZLƏNİLMƏZ XƏTA...");
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
    <div className="component-create">
      <Title description="Əlavə et" title="Dinamik Səhifə Yarat" to="" />

      <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
        <TextField
          label="Səhifə hansı Dropdown tərkibində olacaq? (Saytdakı AZƏRBAYCANCA başlığı böyük-kiçik hərf daxil olduğu kimi yazın)"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Mələsən: Haqqımızda, Fəaliyyət, Satınalma və s."
          required
          value={dropdownName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDropdownName(e.target.value)}
          name="dropdown_name"
        />

        <TextField
          label="Səhifə hansı Dropdown tərkibində olacaq? (Saytdakı İNGİLİSCƏ başlığı böyük-kiçik hərf daxil olduğu kimi yazın)"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Mələsən: Haqqımızda, Fəaliyyət, Satınalma və s."
          required
          value={dropdownNameEn}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDropdownNameEn(e.target.value)}
          name="dropdown_name_en"
        />

        <TextField
          label="Səhifə hansı Dropdown tərkibində olacaq? (Saytdakı RUSCA başlığı böyük-kiçik hərf daxil olduğu kimi yazın)"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Mələsən: Haqqımızda, Fəaliyyət, Satınalma və s."
          required
          value={dropdownNameRu}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDropdownNameRu(e.target.value)}
          name="dropdown_name_ru"
        />

        <TextField
          label="Səhifə yolu"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={path}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPath(e.target.value)}
          name="path"
        />

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

export default PageCreate;