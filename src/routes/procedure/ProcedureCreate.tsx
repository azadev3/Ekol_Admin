import React, { ChangeEvent, useState } from "react";
import Title from "../../uitils/Title";
import { Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { OptionWithFormData, toastMsg } from "../../App";


const ProcedureCreate: React.FC = () => {
    const navigate = useNavigate();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [pdfaz, setPdfAz] = useState<File | null>(null);
    const [pdfen, setPdfEn] = useState<File | null>(null);
    const [pdfru, setPdfRu] = useState<File | null>(null);
    const [pdfPreviewAz, setPdfPreviewAz] = useState<string>("");
    const [pdfPreviewEn, setPdfPreviewEn] = useState<string>("");
    const [pdfPreviewRu, setPdfPreviewRu] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        if (pdfaz) {
            formData.append("pdfaz", pdfaz);
        }
        if (pdfen) {
            formData.append("pdfen", pdfen);
        }
        if (pdfru) {
            formData.append("pdfru", pdfru);
        }

        try {
            const response = await axios.post(`${URL}/procedure`, formData, OptionWithFormData());
            console.log(response.data);
            if (response.data || response.status === 200) {
                navigate("/procedure");
                setSnackbarMessage("UĞURLU!");
                setOpenSnackbar(true);
            }
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


    const handlePdfChangeAz = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPdfAz(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPdfPreviewAz(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePdfChangeEn = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPdfEn(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPdfPreviewEn(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePdfChangeRu = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPdfRu(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPdfPreviewRu(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="component-create">
            <Title description="Əlavə et" title="Şikayətlər Proseduru" to="" />

            <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>

                {/* upload PDF area */}
                <input
                    accept=".pdf, .doc, .docx"
                    style={{ display: "none" }}
                    id="upload-pdfaz"
                    type="file"
                    name="pdfaz"
                    onChange={handlePdfChangeAz}
                />
                <input
                    accept=".pdf, .doc, .docx"
                    style={{ display: "none" }}
                    id="upload-pdfen"
                    type="file"
                    name="pdfen"
                    onChange={handlePdfChangeEn}
                />
                <input
                    accept=".pdf, .doc, .docx"
                    style={{ display: "none" }}
                    id="upload-pdfru"
                    type="file"
                    name="pdfru"
                    onChange={handlePdfChangeRu}
                />
                <label htmlFor="upload-pdfaz">
                    <Button
                        variant="contained"
                        component="span"
                        style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
                        (AZ) PDF əlavə et
                    </Button>
                </label>
                <label htmlFor="upload-pdfen">
                    <Button
                        variant="contained"
                        component="span"
                        style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
                        (EN) PDF əlavə et
                    </Button>
                </label>
                <label htmlFor="upload-pdfru">
                    <Button
                        variant="contained"
                        component="span"
                        style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
                        (RU) PDF əlavə et
                    </Button>
                </label>

                {pdfPreviewAz && (
                    <iframe src={pdfPreviewAz} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
                )}
                {pdfPreviewEn && (
                    <iframe src={pdfPreviewEn} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
                )}
                {pdfPreviewRu && (
                    <iframe src={pdfPreviewRu} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
                )}

                <Button variant="contained" color="success" type="submit" style={{ marginTop: "16px", marginLeft: "24px" }}>
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

export default ProcedureCreate;
