import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import { OptionWithFormData, toastMsg } from "../../App";

const CalculationsCreate: React.FC = () => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [pdfaz, setPdfAz] = useState<File | null>(null);
  const [pdfen, setPdfEn] = useState<File | null>(null);
  const [pdfru, setPdfRu] = useState<File | null>(null);
  const [pdfPreviewAz, setPdfPreviewAz] = useState<string>("");
  const [pdfPreviewEn, setPdfPreviewEn] = useState<string>("");
  const [pdfPreviewRu, setPdfPreviewRu] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title_az || !title_en || !title_ru) {
      setSnackbarMessage("Bütün xanaları doldurun.");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("title_az", title_az);
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("pdfaz", pdfaz || "");
    formData.append("pdfen", pdfen || "");
    formData.append("pdfru", pdfru || "");

    try {
      const response = await axios.post(`${URL}/calculations`, formData, OptionWithFormData());
      if (response.data || response.status === 200) {
        navigate("/calculations");
        setSnackbarMessage("UĞURLU!");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error(error);
      toastMsg();
      setSnackbarMessage("GÖZLƏNİLMƏZ XƏTA...");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handlePdfChangeAz = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPdfAz(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfPreviewAz(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChangeEn = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPdfEn(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfPreviewEn(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChangeRu = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPdfRu(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfPreviewRu(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="component-create">
      <Title description="Əlavə et" title="Rüblük Hesabatlar" to="" />

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

        {/* upload PDF area */}
        <input
          accept=".pdf, .doc, .docx"
          style={{ display: "none" }}
          id="upload-pdfaz"
          type="file"
          name="pdfaz"
          onChange={handlePdfChangeAz}
        />
        <input
          accept=".pdf, .doc, .docx"
          style={{ display: "none" }}
          id="upload-pdfen"
          type="file"
          name="pdfen"
          onChange={handlePdfChangeEn}
        />
        <input
          accept=".pdf, .doc, .docx"
          style={{ display: "none" }}
          id="upload-pdfru"
          type="file"
          name="pdfru"
          onChange={handlePdfChangeRu}
        />
        <label htmlFor="upload-pdfaz">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
            (AZ) PDF əlavə et
          </Button>
        </label>
        <label htmlFor="upload-pdfen">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
            (EN) PDF əlavə et
          </Button>
        </label>
        <label htmlFor="upload-pdfru">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
            (RU) PDF əlavə et
          </Button>
        </label>

        {pdfPreviewAz && (
          <iframe src={pdfPreviewAz} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
        )}
        {pdfPreviewEn && (
          <iframe src={pdfPreviewEn} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
        )}
        {pdfPreviewRu && (
          <iframe src={pdfPreviewRu} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
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

export default CalculationsCreate;
