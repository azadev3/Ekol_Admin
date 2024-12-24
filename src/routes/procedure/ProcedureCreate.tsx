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

    const [pdf, setPdf] = useState<File | null>(null);
    const [pdfPreview, setPdfPreview] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("pdf", pdf ? pdf : "");

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

    const handlePdfChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPdf(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPdfPreview(reader.result as string);
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
                    id="upload-pdf"
                    type="file"
                    name="pdf"
                    onChange={handlePdfChange}
                />
                <label htmlFor="upload-pdf">
                    <Button
                        variant="contained"
                        component="span"
                        style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
                        PDF əlavə et
                    </Button>
                </label>

                {pdfPreview && (
                    <iframe src={pdfPreview} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
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
