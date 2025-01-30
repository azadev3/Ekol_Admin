import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
import { Option, OptionWithFormData, toastMsg } from "../../App";

const DynamicCategoryContentEdit: React.FC = () => {
    const { editid } = useParams();
    const navigate = useNavigate();

    const [content, setContent] = useState<[]>([]);


    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [title_az, setTitleAz] = useState("");
    const [title_en, setTitleEn] = useState("");
    const [title_ru, setTitleRu] = useState("");
    const [pdfaz, setPdfAz] = useState<File | null>(null);
    const [pdfen, setPdfEn] = useState<File | null>(null);
    const [pdfru, setPdfRu] = useState<File | null>(null);
    const [pdfPreviewAz, setPdfPreviewAz] = useState<string>("");
    const [pdfPreviewEn, setPdfPreviewEn] = useState<string>("");
    const [pdfPreviewRu, setPdfPreviewRu] = useState<string>("");
    const [selected_category, setSelectedCategory] = useState<string>("");


    useEffect(() => {
        const getCategoryCalc = async () => {
            const response = await axios.get(`${URL}/dynamic-category-front`, {
                headers: {
                    "Accept-Language": "az",
                },
            });
            if (response.data) {
                setContent(response.data?.reverse());
            }
        };
        getCategoryCalc();
    }, []);

    // Fetch data
    useEffect(() => {
        if (editid) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${URL}/dynamic-category-content/${editid}`, Option());
                    const data = response.data;
                    setTitleAz(data.title.az || "");
                    setTitleEn(data.title.en || "");
                    setTitleRu(data.title.ru || "");
                    setPdfPreviewAz(`https://ekol-server-1.onrender.com${data.pdf.az}` || "");
                    setPdfPreviewEn(`https://ekol-server-1.onrender.com${data.pdf.en}` || "");
                    setPdfPreviewRu(`https://ekol-server-1.onrender.com${data.pdf.ru}` || "");
                    setSelectedCategory(data.selected_category || "");
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [editid]);

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    // UPDATE
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editid) return;

        const formData = new FormData();
        formData.append("title_az", title_az);
        formData.append("title_en", title_en);
        formData.append("title_ru", title_ru);
        formData.append("selected_category", selected_category);

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
            const response = await axios.put(`${URL}/dynamic-category-content/${editid}`, formData, OptionWithFormData());
            console.log(response.data);
            setSnackbarMessage("Düzəliş uğurludur!");
            setOpenSnackbar(true);
            navigate("/dynamic-category-content");
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
        <div className="component-edit">
            <Title description="Dəyişiklik et" title="Hesabatlar" to="" />

            <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
                <TextField
                    required
                    label="Başlıq(AZ)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title_az}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
                    name="title_az"
                />

                <TextField
                    required
                    label="Başlıq(EN)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title_en}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
                    name="title_en"
                />

                <TextField
                    required
                    label="Başlıq(RU)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title_ru}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
                    name="title_ru"
                />

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
                {pdfPreviewAz && (
                    <iframe src={pdfPreviewAz} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
                )}
                <label htmlFor="upload-pdfen">
                    <Button
                        variant="contained"
                        component="span"
                        style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
                        (EN) PDF əlavə et
                    </Button>
                </label>

                {pdfPreviewEn && (
                    <iframe src={pdfPreviewEn} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
                )}
                <label htmlFor="upload-pdfru">
                    <Button
                        variant="contained"
                        component="span"
                        style={{ marginTop: "16px", backgroundColor: "mediumslateblue" }}>
                        (RU) PDF əlavə et
                    </Button>
                </label>
                {pdfPreviewRu && (
                    <iframe src={pdfPreviewRu} title="PDF Preview" style={{ marginTop: "16px", width: "100%", height: "500px" }} />
                )}

                <select
                    onChange={handleChangeSelect}
                    required
                    name="selected_category"
                    style={{ width: "100%", maxWidth: "50%", height: "46px", borderRadius: "4px", margin: "24px 0px" }}>
                    <option value="">Bu şəkillər hansı Hesabat kateqoriyasının tərkibində olacaq?</option>
                    {content ? content?.map((c: any) => <option value={c?._id || ""}>{c?.title || ""}</option>) : ""}
                </select>

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

export default DynamicCategoryContentEdit;
