import React, { ChangeEvent, useEffect, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate, useParams } from "react-router-dom";

const ImagespageEdit: React.FC = () => {
  const navigate = useNavigate();
  const { editid } = useParams<{ editid: string }>();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [categoryName_az, setCategoryNameAz] = useState("");
  const [categoryName_en, setCategoryNameEn] = useState("");
  const [categoryName_ru, setCategoryNameRu] = useState("");
  const [categoryImg, setCategoryImg] = useState<File | null>(null);
  const [categoryImagePreview, setImagePreviewCategoryImage] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);

  useEffect(() => {
    // Fetch existing data
    if (editid) {
      axios.get(`${URL}/imagespage/${editid}`)
        .then(response => {
          const data = response.data;
          setCategoryNameAz(data.categoryName.az || "");
          setCategoryNameEn(data.categoryName.en || "");
          setCategoryNameRu(data.categoryName.ru || "");
          setImagePreviewCategoryImage(`https://ekol-server-1.onrender.com${data.categoryImg }`|| "");
          setImagesPreviews(data.images.map((img: any) => `https://ekol-server-1.onrender.com${img.image}`));
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  }, [editid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName_az", categoryName_az);
    formData.append("categoryName_en", categoryName_en);
    formData.append("categoryName_ru", categoryName_ru);
    if (categoryImg) {
      formData.append("imgback", categoryImg);
    }
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.put(`${URL}/imagespage/${editid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data || response.status === 200) {
        navigate("/imagespage");
      }
      setSnackbarMessage("Başarıyla güncellendi!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Gözlemlenmeyen hata...");
      setOpenSnackbar(true);
    }

    if (!categoryName_az || !categoryName_en || !categoryName_ru) {
      setSnackbarMessage("Bütün alanları doldurun.");
      setOpenSnackbar(true);
      return;
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleCategoryImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCategoryImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewCategoryImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages(prevImages => [...prevImages, ...filesArray]);
      const previewsArray = filesArray.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>(resolve => {
          reader.onloadend = () => resolve(reader.result as string);
        });
      });
      Promise.all(previewsArray).then(previews => setImagesPreviews(prevPreviews => [...prevPreviews, ...previews]));
    }
  };

  return (
    <div className="component-edit">
      <Title description="Düzənlə" title="Qalereya - Şəkillər və Kateqoriyalar" to="" />

      <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
        <TextField
          required
          label="Kateqoriya adı(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={categoryName_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryNameAz(e.target.value)}
          name="categoryName_az"
        />

        <TextField
          required
          label="Kateqoriya adı(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={categoryName_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryNameEn(e.target.value)}
          name="categoryName_en"
        />

        <TextField
          required
          label="Kateqoriya adı(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={categoryName_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryNameRu(e.target.value)}
          name="categoryName_ru"
        />

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-category-image"
          type="file"
          name="imgback"
          onChange={handleCategoryImageChange}
        />
        <label htmlFor="upload-category-image">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
            Kateqoriya Şəkili Yükle
          </Button>
        </label>

        {categoryImagePreview && (
          <Box mt={2}>
            <Typography variant="subtitle1">Kateqoriya Şəkili Önizlemesi:</Typography>
            <img src={categoryImagePreview} alt="Preview" style={{ width: "80%", maxHeight: "400px", objectFit: "cover" }} />
          </Box>
        )}

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-images"
          type="file"
          multiple
          name="images"
          onChange={handleImagesChange}
        />
        <label htmlFor="upload-images">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: "16px", marginLeft: "40px", backgroundColor: "purple" }}>
            Əlavə Şəkillər Yükle
          </Button>
        </label>

        {imagesPreviews.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">Əlavə olunan şəkillər:</Typography>
            <Box display="flex" flexWrap="wrap">
              {imagesPreviews.map((preview, index) => (
                <Box key={index} m={1}>
                  <img src={preview} alt={`Preview ${index}`} style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          style={{ marginTop: "16px", marginLeft: "24px" }}>
          Güncelle
        </Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: "100%", height: "50px" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ImagespageEdit;
