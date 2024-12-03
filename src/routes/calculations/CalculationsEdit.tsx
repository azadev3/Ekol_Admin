import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
import { Option, OptionWithFormData, toastMsg } from "../../App";

const CalculationsEdit: React.FC = () => {
  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string>("");

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/calculations/${editid}`, Option());
          const data = response.data;
          setTitleAz(data.title.az || "");
          setTitleEn(data.title.en || "");
          setTitleRu(data.title.ru || "");
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
    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const response = await axios.put(`${URL}/calculations/${editid}`, formData, OptionWithFormData());
      console.log(response.data);
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/calculations");
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
      <Title description="Dəyişiklik et" title="Rüblük Hesabatlar" to="" />

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

export default CalculationsEdit;
