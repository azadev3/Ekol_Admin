import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toastMsg } from "../../App";

const DynamicCategoryCreate: React.FC = () => {

    const navigate = useNavigate();

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const [title_az, setTitleAz] = useState("");
    const [title_en, setTitleEn] = useState("");
    const [title_ru, setTitleRu] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title_az", title_az);
        formData.append("title_en", title_en);
        formData.append("title_ru", title_ru);
        try {
            const response = await axios.post(`${URL}/dynamic-category`, formData);
            if (response.data || response.status === 200) {
                navigate("/dynamic-category");
            }
            setSnackbarMessage("UĞURLU!.");
            setOpenSnackbar(true);
        } catch (error) {
            console.error(error);
            setSnackbarMessage("GÖZLƏNİLMƏZ XƏTA...");
            setOpenSnackbar(true);
            toastMsg();
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="component-create">
            <Title description="Hesabatlar üçün kateqoriya əlavə et" title="Hesabatlar - Kateqoriya" to="" />

            <form noValidate autoComplete="off" style={{ marginTop: "16px" }}>
                <TextField
                    label="Kateqoriyanın adı: (AZ)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title_az}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
                    name="title_az"
                />

                <TextField
                    label="Kateqoriyanın adı: (EN)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title_en}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
                    name="title_en"
                />

                <TextField
                    label="Kateqoriyanın adı: (RU)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title_ru}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
                    name="title_ru"
                />

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

export default DynamicCategoryCreate;
