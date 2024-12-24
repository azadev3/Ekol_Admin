import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
import "react-quill/dist/quill.snow.css";
import { Option, OptionWithFormData, toastMsg } from "../../App";

const ProcedureEdit: React.FC = () => {
    const { editid } = useParams();
    const navigate = useNavigate();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("");

    const [pdf, setPdf] = useState<File | null>(null);
    const [pdfPreview, setPdfPreview] = useState<string>("");

    // Fetch data
    useEffect(() => {
        if (editid) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${URL}/procedure/${editid}`, Option());
                    const data = response.data;
                    setSelectedStatus(data.status || "");
                    setPdfPreview(`https://ekol-server-1.onrender.com${data.pdf}` || "");
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
        formData.append("status", selectedStatus);
        formData.append("pdf", pdf ? pdf : "");

        try {
            const response = await axios.put(`${URL}/procedure/${editid}`, formData, OptionWithFormData());
            console.log(response.data);
            setSnackbarMessage("Düzəliş uğurludur!");
            setOpenSnackbar(true);
            navigate("/procedure");
        } catch (error) {
            console.error(error);
            toastMsg();
            setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
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
        <div className="component-edit">
            <Title description="Dəyişiklik et" title="Şikayətlər proseduru" to="" />

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

export default ProcedureEdit;
