import React, { ChangeEvent, useEffect, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate, useParams } from "react-router-dom";
import { Option, OptionWithFormData, toastMsg } from "../../App";

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
  const [existingImages, setExistingImages] = useState<string[]>([]); // Track existing images for deletion
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); // Track images to delete

  useEffect(() => {
    // Fetch existing data
    if (editid) {
      axios
        .get(`${URL}/imagespage/${editid}`, Option())
        .then((response) => {
          const data = response.data;
          setCategoryNameAz(data.categoryName.az || "");
          setCategoryNameEn(data.categoryName.en || "");
          setCategoryNameRu(data.categoryName.ru || "");
          setImagePreviewCategoryImage(`https://ekol-server-1.onrender.com${data.categoryImg}` || "");
          setExistingImages(data.images.map((img: any) => img.image)); // Store existing images
          setImagesPreviews(data.images.map((img: any) => `https://ekol-server-1.onrender.com${img.image}`));
        })
        .catch((error) => {
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

  // Send images to delete as JSON
  formData.append("imagesToDelete", JSON.stringify(imagesToDelete));

  images.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const response = await axios.put(`${URL}/imagespage/${editid}`, formData, OptionWithFormData());
    if (response.data || response.status === 200) {
      navigate("/imagespage");
    }
    setSnackbarMessage("SUCCESS!");
    setOpenSnackbar(true);
  } catch (error) {
    console.error(error);
    toastMsg();
    setSnackbarMessage("Error...");
    setOpenSnackbar(true);
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
      setImages((prevImages) => [...prevImages, ...filesArray]);
      const previewsArray = filesArray.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
      });
      Promise.all(previewsArray).then((previews) =>
        setImagesPreviews((prevPreviews) => [...prevPreviews, ...previews])
      );
    }
  };

  const handleRemoveImage = (index: number, imagePath: string) => {
    // Remove the image from the state
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagesPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  
    // Add the deleted image to the imagesToDelete array if it's already saved in the database
    if (existingImages.includes(imagePath)) {
      setImagesToDelete((prevToDelete) => [...prevToDelete, imagePath]); 
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
            <img
              src={categoryImagePreview}
              alt="Preview"
              style={{ width: "80%", maxHeight: "400px", objectFit: "cover" }}
            />
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
                <Box key={index} m={1} position="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleRemoveImage(index, existingImages[index])}
                    style={{ position: "absolute", top: 0, right: 0 }}>
                    X
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} style={{ marginTop: "16px" }}>
          Yenilə
        </Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default ImagespageEdit;
