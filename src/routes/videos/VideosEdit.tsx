import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";

const VideosEdit: React.FC = () => {
  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [video, setVideo] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string>("");

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/videos/${editid}`);
          const data = response.data;
          setVideo(data.video || "");
          setVideoPreview(data.video || "");
          
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
    formData.append("video", video);

    try {
      const response = await axios.put(`${URL}/videos/${editid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/videos");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="component-edit">
      <Title description="Dəyişiklik et" title="Videolar" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
        <TextField
          required
          label="Yerləşdirmə Linki"
          placeholder="Youtube'dan vəya Iframe üzərindən əldə etdiyiniz bağlantı url'ni daxil edin"
          variant="outlined"
          fullWidth
          margin="normal"
          value={video}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setVideo(e.target.value)}
          name="video"
        />

        <div>
        {videoPreview && (
          <iframe width={600} height={300} src={videoPreview}></iframe>
        )}
        </div>

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

export default VideosEdit;
