import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
import "react-quill/dist/quill.snow.css";

const OurWorksInnerImagesEdit: React.FC = () => {
  const [ourworksdata, setOurworksdata] = React.useState<[]>([]);
  const getOurworks = async () => {
    const response = await axios.get(`${URL}/ourworksinnerfront`, {
      headers: {
        "Accept-Language": "az",
      },
    });
    if (response.data) {
      setOurworksdata(response.data);
    }
  };

  React.useEffect(() => {
    getOurworks();
  }, []);

  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // State to handle multiple images and previews
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selected_ourworks, setSelectedOurWork] = useState<string>("");

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/ourworksimages/${editid}`);
          const data = response.data;
          // Assuming the response contains an array of images, update previews
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

    if (!selected_ourworks || !images) {
      setOpenSnackbar(true);
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
    }

    const formData = new FormData();
    images.forEach((image) => formData.append("imgourworks", image));
    formData.append("selected_ourworks", selected_ourworks);

    try {
      const response = await axios.put(`${URL}/ourworksimages/${editid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data)
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/ourworksimages");
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
      const files = Array.from(event.target.files);
      setImages(files);

      // Generate previews for selected images
      const previews = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
      });

      Promise.all(previews).then((previewsArray) => {
        setImagePreviews(previewsArray);
      });
    }
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOurWork(event.target.value);
  };

  return (
    <div className="component-edit">
      <Title description="Dəyişiklik et" title="Xəbərlər" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
        {/* upload multiple images */}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-images"
          type="file"
          name="imgourworks"
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

        <select
          onChange={handleChangeSelect}
          required
          name="selected_ourworks"
          style={{ width: "100%", maxWidth: "50%", height: "46px", borderRadius: "4px", margin: "24px 0px" }}>
          <option value="">Bu şəkillər hansı xəbərin tərkibində olacaq?</option>
          {ourworksdata ? ourworksdata?.map((ourworks: any) => <option value={ourworks?._id || ""}>{ourworks?.title || ""}</option>) : ""}
        </select>

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

export default OurWorksInnerImagesEdit;
