import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
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

const PurchAnnEdit: React.FC = () => {
  const { editid } = useParams();
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
  const [selectedStatus, setSelectedStatus] = useState("");

  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string>("");

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/purchaseannouncement/${editid}`);
          const data = response.data;
          setTitleAz(data.title.az || "");
          setTitleEn(data.title.en || "");
          setTitleRu(data.title.ru || "");
          setDescriptionAz(data.description.az || "");
          setDescriptionEn(data.description.en || "");
          setDescriptionRu(data.description.ru || "");
          setPredmetAz(data.predmet.az || "");
          setPredmetEn(data.predmet.en || "");
          setPredmetRu(data.predmet.ru || "");
          setEndDate(data.end_date.ru || "");
          setSelectedStatus(data.status || "");
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

    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const response = await axios.put(`${URL}/purchaseannouncement/${editid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/purchaseannouncement");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handlePdfChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPdf(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="component-edit">
      <Title description="Dəyişiklik et" title="Satınalma Elanları" to="" />

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
          label="Predmet(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={predmet_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPredmetAz(e.target.value)}
          name="predmet_az"
        />

        <TextField
          required
          label="Predmet(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={predmet_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPredmetEn(e.target.value)}
          name="predmet_en"
        />

        <TextField
          required
          label="Predmet(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={predmet_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPredmetRu(e.target.value)}
          name="predmet_ru"
        />

        <TextField
          required
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
          <FormControlLabel value={selectedStatus} control={<Radio />} label="Yeni ?" />
          <FormControlLabel value={selectedStatus} control={<Radio />} label="Aktual ?" />
          <FormControlLabel value={selectedStatus} control={<Radio />} label="Bitmiş ?" />
        </RadioGroup>

        {/* upload PDF area */}
        <input
          accept=".pdf, .doc, .docx"
          style={{ display: "none" }}
          id="upload-pdf"
          type="file"
          name="pdf"
          onChange={handlePdfChange}
        />
        <label htmlFor="upload-pdf">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
            PDF əlavə et
          </Button>
        </label>

        {pdfPreview && (
          <iframe src={pdfPreview} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
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

export default PurchAnnEdit;