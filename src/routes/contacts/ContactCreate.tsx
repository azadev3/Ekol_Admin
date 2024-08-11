import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";

const ContactCreate: React.FC = () => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [telephoneTitleAz, setTelephoneTitleAz] = useState("");
  const [telephoneTitleEn, setTelephoneTitleEn] = useState("");
  const [telephoneTitleRu, setTelephoneTitleRu] = useState("");
  const [telephoneValue, setTelephoneValue] = useState("");

  const [faksTitleAz, setFaksTitleAz] = useState("");
  const [faksTitleEn, setFaksTitleEn] = useState("");
  const [faksTitleRu, setFaksTitleRu] = useState("");
  const [faksValue, setFaksValue] = useState("");

  const [locationTitleAz, setLocationTitleAz] = useState("");
  const [locationTitleEn, setLocationTitleEn] = useState("");
  const [locationTitleRu, setLocationTitleRu] = useState("");
  const [locationValue, setLocationValue] = useState("");

  const [emailTitleAz, setEmailTitleAz] = useState("");
  const [emailTitleEn, setEmailTitleEn] = useState("");
  const [emailTitleRu, setEmailTitleRu] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const [telephoneLogo, setTelephoneLogo] = useState<File | null>(null);
  const [telephoneLogoPreview, setTelephoneLogoPreview] = useState("");

  const [faksLogo, setFaksLogo] = useState<File | null>(null);
  const [faksLogoPreview, setFaksLogoPreview] = useState("");

  const [locationLogo, setLocationLogo] = useState<File | null>(null);
  const [locationLogoPreview, setLocationLogoPreview] = useState("");

  const [emailLogo, setEmailLogo] = useState<File | null>(null);
  const [emailLogoPreview, setEmailLogoPreview] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("telephone_title_az", telephoneTitleAz);
    formData.append("telephone_title_en", telephoneTitleEn);
    formData.append("telephone_title_ru", telephoneTitleRu);
    formData.append("telephone_value", telephoneValue);

    formData.append("faks_title_az", faksTitleAz);
    formData.append("faks_title_en", faksTitleEn);
    formData.append("faks_title_ru", faksTitleRu);
    formData.append("faks_value", faksValue);

    formData.append("location_title_az", locationTitleAz);
    formData.append("location_title_en", locationTitleEn);
    formData.append("location_title_ru", locationTitleRu);
    formData.append("location_value", locationValue);

    formData.append("email_title_az", emailTitleAz);
    formData.append("email_title_en", emailTitleEn);
    formData.append("email_title_ru", emailTitleRu);
    formData.append("email_value", emailValue);

    if (telephoneLogo) formData.append("telephone_logo", telephoneLogo);
    if (faksLogo) formData.append("faks_logo", faksLogo);
    if (locationLogo) formData.append("location_logo", locationLogo);
    if (emailLogo) formData.append("email_logo", emailLogo);

    try {
      const response = await axios.post(`${URL}/contact`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data || response.status === 200) {
        navigate("/contact");
      }
      setSnackbarMessage("Uğurlu oldu!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Gözlənilməz xəta...");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleImageChange = (setImage: React.Dispatch<React.SetStateAction<File | null>>, setImagePreview: React.Dispatch<React.SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="component-create">
      <Title description="Əlavə et" title="Əlaqə Məlumatları" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
        {/* Telefon */}
        <TextField required label="Telefon Başlıq(AZ)" variant="outlined" fullWidth margin="normal" value={telephoneTitleAz} onChange={(e) => setTelephoneTitleAz(e.target.value)} name="telephone_title_az" />
        <TextField required label="Telefon Başlıq(EN)" variant="outlined" fullWidth margin="normal" value={telephoneTitleEn} onChange={(e) => setTelephoneTitleEn(e.target.value)} name="telephone_title_en" />
        <TextField required label="Telefon Başlıq(RU)" variant="outlined" fullWidth margin="normal" value={telephoneTitleRu} onChange={(e) => setTelephoneTitleRu(e.target.value)} name="telephone_title_ru" />
        <TextField required label="Telefon Dəyəri" variant="outlined" fullWidth margin="normal" value={telephoneValue} onChange={(e) => setTelephoneValue(e.target.value)} name="telephone_value" />
        <input type="file" accept="image/*" onChange={handleImageChange(setTelephoneLogo, setTelephoneLogoPreview)} />
        {telephoneLogoPreview && (
          <Box mt={2}>
            <Typography>Telefon Logo Preview:</Typography>
            <img src={telephoneLogoPreview} alt="Telefon Logo Preview" width="100" height="100" />
          </Box>
        )}

        {/* Faks */}
        <TextField required label="Faks Başlıq(AZ)" variant="outlined" fullWidth margin="normal" value={faksTitleAz} onChange={(e) => setFaksTitleAz(e.target.value)} name="faks_title_az" />
        <TextField required label="Faks Başlıq(EN)" variant="outlined" fullWidth margin="normal" value={faksTitleEn} onChange={(e) => setFaksTitleEn(e.target.value)} name="faks_title_en" />
        <TextField required label="Faks Başlıq(RU)" variant="outlined" fullWidth margin="normal" value={faksTitleRu} onChange={(e) => setFaksTitleRu(e.target.value)} name="faks_title_ru" />
        <TextField required label="Faks Dəyəri" variant="outlined" fullWidth margin="normal" value={faksValue} onChange={(e) => setFaksValue(e.target.value)} name="faks_value" />
        <input type="file" accept="image/*" onChange={handleImageChange(setFaksLogo, setFaksLogoPreview)} />
        {faksLogoPreview && (
          <Box mt={2}>
            <Typography>Faks Logo Preview:</Typography>
            <img src={faksLogoPreview} alt="Faks Logo Preview" width="100" height="100" />
          </Box>
        )}

        {/* Location */}
        <TextField required label="Location Başlıq(AZ)" variant="outlined" fullWidth margin="normal" value={locationTitleAz} onChange={(e) => setLocationTitleAz(e.target.value)} name="location_title_az" />
        <TextField required label="Location Başlıq(EN)" variant="outlined" fullWidth margin="normal" value={locationTitleEn} onChange={(e) => setLocationTitleEn(e.target.value)} name="location_title_en" />
        <TextField required label="Location Başlıq(RU)" variant="outlined" fullWidth margin="normal" value={locationTitleRu} onChange={(e) => setLocationTitleRu(e.target.value)} name="location_title_ru" />
        <TextField required label="Location Dəyəri" variant="outlined" fullWidth margin="normal" value={locationValue} onChange={(e) => setLocationValue(e.target.value)} name="location_value" />
        <input type="file" accept="image/*" onChange={handleImageChange(setLocationLogo, setLocationLogoPreview)} />
        {locationLogoPreview && (
          <Box mt={2}>
            <Typography>Location Logo Preview:</Typography>
            <img src={locationLogoPreview} alt="Location Logo Preview" width="100" height="100" />
          </Box>
        )}

        {/* Email */}
        <TextField required label="Email Başlıq(AZ)" variant="outlined" fullWidth margin="normal" value={emailTitleAz} onChange={(e) => setEmailTitleAz(e.target.value)} name="email_title_az" />
        <TextField required label="Email Başlıq(EN)" variant="outlined" fullWidth margin="normal" value={emailTitleEn} onChange={(e) => setEmailTitleEn(e.target.value)} name="email_title_en" />
        <TextField required label="Email Başlıq(RU)" variant="outlined" fullWidth margin="normal" value={emailTitleRu} onChange={(e) => setEmailTitleRu(e.target.value)} name="email_title_ru" />
        <TextField required label="Email Dəyəri" variant="outlined" fullWidth margin="normal" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} name="email_value" />
        <input type="file" accept="image/*" onChange={handleImageChange(setEmailLogo, setEmailLogoPreview)} />
        {emailLogoPreview && (
          <Box mt={2}>
            <Typography>Email Logo Preview:</Typography>
            <img src={emailLogoPreview} alt="Email Logo Preview" width="100" height="100" />
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary">
          Əlavə et
        </Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage === "Uğurlu oldu!" ? "success" : "error"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactCreate;
