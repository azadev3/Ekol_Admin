import React, { useState, useEffect, ChangeEvent } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate, useParams } from "react-router-dom";

const ContactEdit: React.FC = () => {
  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [telephoneTitleAz, setTelephoneTitleAz] = useState("");
  const [telephoneTitleEn, setTelephoneTitleEn] = useState("");
  const [telephoneTitleRu, setTelephoneTitleRu] = useState("");
  const [telephoneValue, setTelephoneValue] = useState("");
  const [telephoneLogo, setTelephoneLogo] = useState<File | null>(null);
  const [telLogoPreview, setTelephoneLogoPreview] = useState<string>("");

  const [faksTitleAz, setFaksTitleAz] = useState("");
  const [faksTitleEn, setFaksTitleEn] = useState("");
  const [faksTitleRu, setFaksTitleRu] = useState("");
  const [faksValue, setFaksValue] = useState("");
  const [faksLogo, setFaksLogo] = useState<File | null>(null);
  const [faksLogoPreview, setFaksLogoPreview] = useState<string>("");

  const [locationTitleAz, setLocationTitleAz] = useState("");
  const [locationTitleEn, setLocationTitleEn] = useState("");
  const [locationTitleRu, setLocationTitleRu] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [locationLogo, setLocationLogo] = useState<File | null>(null);
  const [locationLogoPreview, setLocationLogoPreview] = useState<string>("");

  const [emailTitleAz, setEmailTitleAz] = useState("");
  const [emailTitleEn, setEmailTitleEn] = useState("");
  const [emailTitleRu, setEmailTitleRu] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailLogo, setEmailLogo] = useState<File | null>(null);
  const [emailLogoPreview, setEmailLogoPreview] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/contact/${editid}`);
        const contact = response.data;

        const telephones = contact.telephones;
        if (telephones && telephones.length > 0) {
          setTelephoneTitleAz(telephones[0].title.az);
          setTelephoneTitleEn(telephones[0].title.en);
          setTelephoneTitleRu(telephones[0].title.ru);
          setTelephoneValue(telephones[0].value);
          setTelephoneLogoPreview(`https://ekol-server-1.onrender.com${telephones[0].logo}` || "");
        } else {
          setTelephoneTitleAz("");
          setTelephoneTitleEn("");
          setTelephoneTitleRu("");
          setTelephoneValue("");
          setTelephoneLogoPreview("");
        }

        setFaksTitleAz(contact.faks.title.az);
        setFaksTitleEn(contact.faks.title.en);
        setFaksTitleRu(contact.faks.title.ru);
        setFaksValue(contact.faks.value);
        setFaksLogoPreview(`https://ekol-server-1.onrender.com${contact.faks.logo}` || "");

        setLocationTitleAz(contact.location.title.az);
        setLocationTitleEn(contact.location.title.en);
        setLocationTitleRu(contact.location.title.ru);
        setLocationValue(contact.location.title.value);
        setLocationLogoPreview(`https://ekol-server-1.onrender.com${contact.location.logo}` || "");

        setEmailTitleAz(contact.email.title.az);
        setEmailTitleEn(contact.email.title.en);
        setEmailTitleRu(contact.email.title.ru);
        setEmailValue(contact.email.value);
        setEmailLogoPreview(`https://ekol-server-1.onrender.com${contact.email.logo}` || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [editid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("telephone_title_az", telephoneTitleAz);
    formData.append("telephone_title_en", telephoneTitleEn);
    formData.append("telephone_title_ru", telephoneTitleRu);
    formData.append("telephone_value", telephoneValue);
    if (telephoneLogo) formData.append("telephone_logo", telephoneLogo);

    formData.append("faks_title_az", faksTitleAz);
    formData.append("faks_title_en", faksTitleEn);
    formData.append("faks_title_ru", faksTitleRu);
    formData.append("faks_value", faksValue);
    if (faksLogo) formData.append("faks_logo", faksLogo);

    formData.append("location_title_az", locationTitleAz);
    formData.append("location_title_en", locationTitleEn);
    formData.append("location_title_ru", locationTitleRu);
    formData.append("location_value", locationValue);
    if (locationLogo) formData.append("location_logo", locationLogo);

    formData.append("email_title_az", emailTitleAz);
    formData.append("email_title_en", emailTitleEn);
    formData.append("email_title_ru", emailTitleRu);
    formData.append("email_value", emailValue);
    if (emailLogo) formData.append("email_logo", emailLogo);

    try {
      const response = await axios.put(`${URL}/contact/${editid}`, formData, {
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

  const handleImageChange =
    (
      setLogo: React.Dispatch<React.SetStateAction<File | null>>,
      setLogoPreview: React.Dispatch<React.SetStateAction<string>>
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setLogo(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <div className="component-edit">
      <Title description="Düzəliş et" title="Əlaqə Məlumatları" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
        {/* Telephone */}
        <TextField
          required
          label="Telefon Başlıq(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={telephoneTitleAz}
          onChange={(e) => setTelephoneTitleAz(e.target.value)}
          name="telephone_title_az"
        />
        <TextField
          required
          label="Telefon Başlıq(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={telephoneTitleEn}
          onChange={(e) => setTelephoneTitleEn(e.target.value)}
          name="telephone_title_en"
        />
        <TextField
          required
          label="Telefon Başlıq(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={telephoneTitleRu}
          onChange={(e) => setTelephoneTitleRu(e.target.value)}
          name="telephone_title_ru"
        />
        <TextField
          required
          label="Telefon Dəyəri"
          variant="outlined"
          fullWidth
          margin="normal"
          value={telephoneValue}
          onChange={(e) => setTelephoneValue(e.target.value)}
          name="telephone_value"
        />
        {telLogoPreview && (
          <Box mt={2}>
            <Typography variant="subtitle1">Şəkil:</Typography>
            <img src={telLogoPreview} alt="Preview" style={{ width: "40%", maxHeight: "80px", objectFit: "cover" }} />
          </Box>
        )}

        <input type="file" accept="image/*" onChange={handleImageChange(setTelephoneLogo, setTelephoneLogoPreview)} />

        {/* Faks */}
        <TextField
          required
          label="Faks Başlıq(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={faksTitleAz}
          onChange={(e) => setFaksTitleAz(e.target.value)}
          name="faks_title_az"
        />
        <TextField
          required
          label="Faks Başlıq(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={faksTitleEn}
          onChange={(e) => setFaksTitleEn(e.target.value)}
          name="faks_title_en"
        />
        <TextField
          required
          label="Faks Başlıq(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={faksTitleRu}
          onChange={(e) => setFaksTitleRu(e.target.value)}
          name="faks_title_ru"
        />
        <TextField
          required
          label="Faks Dəyəri"
          variant="outlined"
          fullWidth
          margin="normal"
          value={faksValue}
          onChange={(e) => setFaksValue(e.target.value)}
          name="faks_value"
        />

        {faksLogoPreview && (
          <Box mt={2}>
            <Typography variant="subtitle1">Şəkil:</Typography>
            <img src={faksLogoPreview} alt="Preview" style={{ width: "40%", maxHeight: "80px", objectFit: "cover" }} />
          </Box>
        )}

        <input type="file" accept="image/*" onChange={handleImageChange(setFaksLogo, setFaksLogoPreview)} />

        {/* Location */}
        <TextField
          required
          label="Location Başlıq(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={locationTitleAz}
          onChange={(e) => setLocationTitleAz(e.target.value)}
          name="location_title_az"
        />
        <TextField
          required
          label="Location Başlıq(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={locationTitleEn}
          onChange={(e) => setLocationTitleEn(e.target.value)}
          name="location_title_en"
        />
        <TextField
          required
          label="Location Başlıq(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={locationTitleRu}
          onChange={(e) => setLocationTitleRu(e.target.value)}
          name="location_title_ru"
        />
        <TextField
          required
          label="Location Dəyəri"
          variant="outlined"
          fullWidth
          margin="normal"
          value={locationValue}
          onChange={(e) => setLocationValue(e.target.value)}
          name="location_value"
        />

        {locationLogoPreview && (
          <Box mt={2}>
            <Typography variant="subtitle1">Şəkil:</Typography>
            <img
              src={locationLogoPreview}
              alt="Preview"
              style={{ width: "40%", maxHeight: "80px", objectFit: "cover" }}
            />
          </Box>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange(setLocationLogo, setLocationLogoPreview)} />
        {/* Email */}
        <TextField
          required
          label="Email Başlıq(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={emailTitleAz}
          onChange={(e) => setEmailTitleAz(e.target.value)}
          name="email_title_az"
        />
        <TextField
          required
          label="Email Başlıq(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={emailTitleEn}
          onChange={(e) => setEmailTitleEn(e.target.value)}
          name="email_title_en"
        />
        <TextField
          required
          label="Email Başlıq(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={emailTitleRu}
          onChange={(e) => setEmailTitleRu(e.target.value)}
          name="email_title_ru"
        />
        <TextField
          required
          label="Email Dəyəri"
          variant="outlined"
          fullWidth
          margin="normal"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          name="email_value"
        />
        {emailLogoPreview && (
          <Box mt={2}>
            <Typography variant="subtitle1">Şəkil:</Typography>
            <img src={emailLogoPreview} alt="Preview" style={{ width: "40%", maxHeight: "80px", objectFit: "cover" }} />
          </Box>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange(setEmailLogo, setEmailLogoPreview)} />

        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }}>
          Submit
        </Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactEdit;
