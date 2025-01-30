import React, { ChangeEvent, useEffect, useState } from 'react';
import Title from '../../uitils/Title';
import { Button, Snackbar, Alert, TextField } from '@mui/material';
import axios from 'axios';
import { URL } from '../../Base';
import { useNavigate } from 'react-router-dom';
import { OptionWithFormData, toastMsg } from '../../App';

const DynamicCategoryContentCreate: React.FC = () => {
    const [content, setContent] = useState<[]>([]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [title_az, setTitleAz] = useState("");
    const [title_en, setTitleEn] = useState("");
    const [title_ru, setTitleRu] = useState("");
    const [pdfaz, setPdfAz] = useState<File | null>(null);
    const [pdfen, setPdfEn] = useState<File | null>(null);
    const [pdfru, setPdfRu] = useState<File | null>(null);
    const [pdfPreviewAz, setPdfPreviewAz] = useState<string>("");
    const [pdfPreviewEn, setPdfPreviewEn] = useState<string>("");
    const [pdfPreviewRu, setPdfPreviewRu] = useState<string>("");
    const [selected_category, setSelectedCategory] = useState<string>('');

    const navigate = useNavigate();

    const getCategoryCalc = async () => {
        const response = await axios.get(`${URL}/dynamic-category-front`, {
            headers: {
                "Accept-Language": "az",
            },
        });
        if (response.data) {
            setContent(response.data);
        }
    };

    useEffect(() => {
        getCategoryCalc();
    }, []);


    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("selected_category", selected_category)
        formData.append("title_az", title_az || "");
        formData.append("title_en", title_en || "");
        formData.append("title_ru", title_ru || "");
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
            const response = await axios.post(`${URL}/dynamic-category-content`, formData, OptionWithFormData());
            if (response.data || response.status === 200) {
                navigate("/dynamic-category-content");
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

    return (
        <div className="component-create">
            <Title description="Əlavə et" title="Hesabat" to="" />
            <form noValidate autoComplete="off" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                        value={selected_category}
                        name="selected_category"
                        style={{ width: '100%', maxWidth: '50%', height: '46px', borderRadius: '4px', margin: '24px 0px' }}>
                        <option value="">Bu şəkillər hansı Hesabat kateqoriyasının tərkibində olacaq?</option>
                        {content?.map((c: any) => (
                            <option key={c?._id} value={c?._id}>
                                {c?.title}
                            </option>
                        ))}
                    </select>
                </div>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    style={{ marginTop: '16px', marginLeft: '24px' }}>
                    Göndər
                </Button>
            </form>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%', height: '50px' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default DynamicCategoryContentCreate;
