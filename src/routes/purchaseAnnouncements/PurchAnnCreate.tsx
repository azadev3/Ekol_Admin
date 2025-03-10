import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Typography, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { OptionWithFormData, toastMsg } from "../../App";

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

const PurchAnnCreate: React.FC = () => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  const [predmet_az, setPredmetAz] = useState("");
  const [predmet_en, setPredmetEn] = useState("");
  const [predmet_ru, setPredmetRu] = useState("");
  const [end_date, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [pdfaz, setPdfAz] = useState<File | null>(null);
  const [pdfen, setPdfEn] = useState<File | null>(null);
  const [pdfru, setPdfRu] = useState<File | null>(null);
  const [pdfPreviewAz, setPdfPreviewAz] = useState<string>("");
  const [pdfPreviewEn, setPdfPreviewEn] = useState<string>("");
  const [pdfPreviewRu, setPdfPreviewRu] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_az", title_az);
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    formData.append("predmet_az", predmet_az);
    formData.append("predmet_en", predmet_en);
    formData.append("predmet_ru", predmet_ru);
    formData.append("end_date", end_date);
    formData.append("status", selectedStatus);
    
    if (pdfaz) {
      formData.append("pdfaz", pdfaz);
    }
    if (pdfen) {
      formData.append("pdfen", pdfen);
    }
    if (pdfru) {
      formData.append("pdfru", pdfru);
    }

    try {
      const response = await axios.post(`${URL}/purchaseannouncement`, formData, OptionWithFormData());
      console.log(response.data);
      if (response.data || response.status === 200) {
        navigate("/purchaseannouncement");
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
      <Title description="Əlavə et" title="Satınalma Elanları" to="" />

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
          label="Predmet(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={predmet_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPredmetAz(e.target.value)}
          name="predmet_az"
        />

        <TextField
          label="Predmet(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={predmet_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPredmetEn(e.target.value)}
          name="predmet_en"
        />

        <TextField
          label="Predmet(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={predmet_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPredmetRu(e.target.value)}
          name="predmet_ru"
        />

        <TextField
          label="Bitmə tarixi"
          variant="outlined"
          fullWidth
          margin="normal"
          value={end_date}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
          name="end_date"
        />

        <Typography variant="h6" style={{ color: "mediumslateblue", marginTop: "24px" }}>
          Aşağıdakılardan birini işarələyin*
        </Typography>
        <RadioGroup value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <FormControlLabel value="new" control={<Radio />} label="Yeni ?" />
          <FormControlLabel value="current" control={<Radio />} label="Aktual ?" />
          <FormControlLabel value="ended" control={<Radio />} label="Bitmiş ?" />
        </RadioGroup>

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

        <Button variant="contained" color="success" type="submit" style={{ marginTop: "16px", marginLeft: "24px" }}>
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

export default PurchAnnCreate;
