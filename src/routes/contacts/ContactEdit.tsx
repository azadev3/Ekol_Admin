import React, { useState, useEffect, ChangeEvent } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert, Box } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate, useParams } from "react-router-dom";
import { Option, OptionWithFormData, toastMsg } from "../../App";

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

  const [faksTitleAz, setFaksTitleAz] = useState("");
  const [faksTitleEn, setFaksTitleEn] = useState("");
  const [faksTitleRu, setFaksTitleRu] = useState("");
  const [faksValue, setFaksValue] = useState("");
  const [faksLogo, setFaksLogo] = useState<File | null>(null);

  const [locationTitleAz, setLocationTitleAz] = useState("");
  const [locationTitleEn, setLocationTitleEn] = useState("");
  const [locationTitleRu, setLocationTitleRu] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [locationLogo, setLocationLogo] = useState<File | null>(null);

  const [emailTitleAz, setEmailTitleAz] = useState("");
  const [emailTitleEn, setEmailTitleEn] = useState("");
  const [emailTitleRu, setEmailTitleRu] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailLogo, setEmailLogo] = useState<File | null>(null);

  const [iframe, setIframe] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/contact/${editid}`, Option());
        const contact = response.data;

        const telephones = contact.telephones;
        if (telephones && telephones.length > 0) {
          setTelephoneTitleAz(telephones[0].title.az);
          setTelephoneTitleEn(telephones[0].title.en);
          setTelephoneTitleRu(telephones[0].title.ru);
          setTelephoneValue(telephones[0].value);
        }

        setFaksTitleAz(contact.faks.title.az);
        setFaksTitleEn(contact.faks.title.en);
        setFaksTitleRu(contact.faks.title.ru);
        setFaksValue(contact.faks.value);

        setLocationTitleAz(contact.location.title.az);
        setLocationTitleEn(contact.location.title.en);
        setLocationTitleRu(contact.location.title.ru);
        setLocationValue(contact.location.title.value);

        setEmailTitleAz(contact.email.title.az);
        setEmailTitleEn(contact.email.title.en);
        setEmailTitleRu(contact.email.title.ru);
        setEmailValue(contact.email.value);
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

    formData.append("iframemap", iframe);

    try {
      const response = await axios.put(`${URL}/contact/${editid}`, formData, OptionWithFormData());
      if (response.data || response.status === 200) {
        navigate("/contact");
      }
      setSnackbarMessage("Uğurlu oldu!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Gözlənilməz xəta...");
      setOpenSnackbar(true);
      toastMsg();
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleImageChange =
    (setLogo: React.Dispatch<React.SetStateAction<File | null>>) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setLogo(event.target.files[0]);
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
        <input type="file" name="telephone_logo" accept="image/*" onChange={handleImageChange(setTelephoneLogo)} />

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
        <input type="file" name="faks_logo" accept="image/*" onChange={handleImageChange(setFaksLogo)} />

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
        <input type="file" name="location_logo" accept="image/*" onChange={handleImageChange(setLocationLogo)} />

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
        <input type="file" accept="image/*" name="email_logo" onChange={handleImageChange(setEmailLogo)} />

        {/* map */}
        <TextField
          required
          label="Xəritə (Google mapdən aldığınız iframe linkini bura yapışdırın)"
          variant="outlined"
          placeholder="Məsələn: <iframe src='' width='' height=''></iframe>"
          fullWidth
          margin="normal"
          value={iframe}
          onChange={(e) => setIframe(e.target.value)}
          name="iframemap"
        />

        <Box mt={2} mb={2}>
          <Button type="submit" variant="contained" color="primary">
            Yadda saxla
          </Button>
        </Box>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage}>
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes("Uğurlu") ? "success" : "error"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactEdit;
