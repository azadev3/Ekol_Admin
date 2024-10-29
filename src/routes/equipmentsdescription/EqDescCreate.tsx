import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";

const EqDescCreate: React.FC = () => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    images.forEach((image) => formData.append("imgeq", image));

    try {
      const response = await axios.post(`${URL}/equipments-description`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data || response.status === 200) {
        navigate("/equipments-description");
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
    <div className="component-create">
      <Title description="Əlavə et" title="Avadanlıqlar üçün açıqlamalar" to="" />

      <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}>
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
              <Typography variant="subtitle1">Resim Önizlemeleri:</Typography>
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

export default EqDescCreate;
