import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { OptionWithFormData, toastMsg } from "../../App";
import MyEditor from "../../TipTap";

const ToolsInnerCreate: React.FC = () => {

  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_az", title_az);
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    try {
      const response = await axios.post(`${URL}/toolsinner`, formData, OptionWithFormData());
      if (response.data || response.status === 200) {
        navigate("/toolsinner");
      }
      setSnackbarMessage("UĞURLU!.");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("GÖZLƏNİLMƏZ XƏTA...");
      setOpenSnackbar(true);
      toastMsg();
    }

    if (!title_az || !title_en || !title_ru || !description_az || !description_en || !description_ru) {
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
      <Title description="Əlavə et" title="Avadanliqlar (daxili)" to="" />

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

export default ToolsInnerCreate;
