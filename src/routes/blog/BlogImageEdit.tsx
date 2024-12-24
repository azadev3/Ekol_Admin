import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Snackbar, Alert, Typography, Box, IconButton } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
import "react-quill/dist/quill.snow.css";
import { FaDeleteLeft } from "react-icons/fa6";
import { Option, toastMsg } from "../../App";

const BlogImageEdit: React.FC = () => {
  const [blogs, setBlogs] = useState<[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selected_blog, setSelectBlog] = useState<string>("");
  const [existingImages, setExistingImages] = useState<string[]>([]); 
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { editid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get(`${URL}/blogfront`, {
        headers: {
          "Accept-Language": "az",
        },
      });
      if (response.data) {
        setBlogs(response.data);
      }
    };
    getBlogs();
  }, []);

  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/blogimage/${editid}`, Option());
          const data = response.data;
          if (data.images && Array.isArray(data.images)) {
            const fetchedPreviews = data.images.map((img: string) => `https://ekol-server-1.onrender.com${img}`);
            setExistingImages(fetchedPreviews);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [editid]);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      setImages((prevImages) => [...prevImages, ...newFiles]);

      const readerPromises = newFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises).then((previews) => {
        setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      });
    }
  };

  const handleDeleteExistingImage = (image: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== image));
    setImagesToDelete((prev) => [...prev, image]);
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectBlog(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!editid) return;
  
    const formData = new FormData();
    const updatedExistingImages = existingImages.filter((img) => !imagesToDelete.includes(img));
  
    images.forEach((image) => formData.append("newImages", image));
    
    formData.append("existingImages", JSON.stringify(updatedExistingImages));
    
    formData.append("deletedImages", JSON.stringify(imagesToDelete));
  
    formData.append("selected_blog", selected_blog);
  
    try {
      const response = await axios.put(`${URL}/blogimage/${editid}`, formData, Option());
      console.log(response.data);
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/blogimage");
    } catch (error) {
      console.error(error);
      toastMsg();
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
      setOpenSnackbar(true);
    }
  };
  

  return (
    <div className="component-edit">
      <Title description="Dəyişiklik et" title="Xəbərlər üçün şəkillər" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-images"
          type="file"
          name="newImages"
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

        {existingImages.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">Mevcut Şəkillər:</Typography>
            <Box
              mt={2}
              sx={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}>
              {existingImages.map((image, index) => (
                <Box key={index} position="relative">
                  <img
                    src={image}
                    alt={`Existing ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <IconButton
                    onClick={() => handleDeleteExistingImage(image)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "white",
                    }}>
                    <FaDeleteLeft />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {imagePreviews.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">Yeni Şəkil Önizlemeleri:</Typography>
            <Box
              mt={2}
              sx={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
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
                      borderRadius: "8px",
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
          value={selected_blog}
          name="selected_blog"
          style={{ width: "100%", maxWidth: "50%", height: "46px", borderRadius: "4px", margin: "24px 0px" }}>
          <option value="">Bu şəkillər hansı xəbərin tərkibində olacaq?</option>
          {blogs ? blogs?.map((blog: any) => <option value={blog?._id || ""}>{blog?.title || ""}</option>) : ""}
        </select>

        <Button type="submit" variant="contained" color="success" style={{ marginTop: "16px", marginLeft: "24px" }}>
          Düzəliş et
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

export default BlogImageEdit;
