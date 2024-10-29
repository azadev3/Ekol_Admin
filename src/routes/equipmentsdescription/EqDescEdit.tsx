import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";

const EqDescEdit: React.FC = () => {
  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/equipments-description/${editid}`);
          const data = response.data;
          console.log(data, "salam");
          setDescriptionAz(data.description.az || "");
          setDescriptionEn(data.description.en || "");
          setDescriptionRu(data.description.ru || "");
          if (data.images && Array.isArray(data.images)) {
            const fetchedPreviews = data.images.map((img: string) => `https://ekol-server-1.onrender.com${img}`);
            setImagePreviews(fetchedPreviews);
          }
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
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    images.forEach((image) => formData.append("imgeq", image));

    try {
      const response = await axios.put(`${URL}/equipments-description/${editid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/equipments-description");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Handle multiple image selection and previews
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      setImages((prevImages) => [...prevImages, ...newFiles]);

      const previews = newFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      });

      Promise.all(previews).then((previewsArray) => {
        setImagePreviews((prevPreviews) => [...prevPreviews, ...previewsArray]);
      });
    }
  };

  return (
    <div className="component-edit">
      <Title description="Dəyişiklik et" title="Avadanlıqlar üçün açıqlamalar" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
        <TextField
          label="Açıqlama(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionAz(e.target.value)}
          name="description_az"
        />

        <TextField
          label="Açıqlama(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionEn(e.target.value)}
          name="description_en"
        />

        <TextField
          label="Açıqlama(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionRu(e.target.value)}
          name="description_ru"
        />
        {/* upload multiple images */}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-images"
          type="file"
          name="imgeq"
          multiple
          onChange={handleImageChange}
        />
        <label htmlFor="upload-images">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
            Şəkillər əlavə et
          </Button>
        </label>

        {/* Display previews of selected images */}
        {imagePreviews.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">Şəkil Önizlemeleri:</Typography>
            <Box
              mt={2}
              sx={{
                display: "flex",
                gap: "16px", // Space between images
                flexWrap: "wrap", // Allows wrapping to next line if screen is too small
              }}>
              {imagePreviews.map((preview, index) => (
                <Box key={index}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px", // Rounded corners for images
                    }}
                  />
                </Box>
              ))}
            </Box>
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

export default EqDescEdit;
