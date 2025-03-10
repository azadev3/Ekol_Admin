import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import { OptionWithFormData, toastMsg } from "../../App";

const ToolsInnerImagesCreate: React.FC = () => {
  const [toolsinnerdata, setToolsInnerData] = React.useState<[]>([]);
  const getTools = async () => {
    const response = await axios.get(`${URL}/toolsinnerfront`, {
      headers: {
        "Accept-Language": "az",
      },
    });
    if (response.data) {
      setToolsInnerData(response.data);
    }
  };

  React.useEffect(() => {
    getTools();
  }, []);

  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selected_tools, setSelectedTools] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selected_tools || !images) {
      setOpenSnackbar(true);
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => formData.append("imgtools", image));
    formData.append("selected_tools", selected_tools);
    try {
      const response = await axios.post(`${URL}/toolsinnerimages`, formData, OptionWithFormData());
      if (response.data || response.status === 200) {
        navigate("/toolsinnerimages");
      }
      setSnackbarMessage("UĞURLU!.");
      setOpenSnackbar(true);
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

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTools(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="component-create">
      <Title description="Əlavə et" title="Avadanliqlar şəkil əlavə et" to="" />

      <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
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
            name="imgtools"
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

          <select
            onChange={handleChangeSelect}
            required
            value={selected_tools}
            name="selected_tools"
            style={{ width: "100%", maxWidth: "50%", height: "46px", borderRadius: "4px", margin: "24px 0px" }}>
            <option value="">Bu şəkillər hansı xəbərin tərkibində olacaq?</option>
            {toolsinnerdata
              ? toolsinnerdata?.map((toolsinner: any) => (
                  <option value={toolsinner?._id || ""}>{toolsinner?.title || ""}</option>
                ))
              : ""}
          </select>
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

export default ToolsInnerImagesCreate;
