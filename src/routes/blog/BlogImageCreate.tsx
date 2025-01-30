import React, { ChangeEvent, useState } from 'react';
import Title from '../../uitils/Title';
import { Button, Snackbar, Alert, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { URL } from '../../Base';
import { useNavigate } from 'react-router-dom';
import { OptionWithFormData, toastMsg } from '../../App';

const BlogImageCreate: React.FC = () => {
    const [blogs, setBlogs] = useState<any>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selected_blog, setSelectBlog] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const getBlogs = async () => {
        const response = await axios.get(`${URL}/blogfront`, {
            headers: { 'Accept-Language': 'az' },
        });
        if (response.data) {
            setBlogs(response.data);
        }
    };

    React.useEffect(() => {
        getBlogs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected_blog || !images.length) {
            setOpenSnackbar(true);
            setSnackbarMessage('Düzəlişdə bir xəta oldu yenidən yoxlayın');
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        images.forEach((image) => formData.append('imgback', image));
        formData.append('selected_blog', selected_blog);

        try {
            const response = await axios.post(`${URL}/blogimage`, formData, OptionWithFormData());
            if (response.data || response.status === 200) {
                navigate('/blogimage');
            }
            setSnackbarMessage('UĞURLU!');
        } catch (error) {
            toastMsg();
            setSnackbarMessage('GÖZLƏNİLMƏZ XƏTA...');
        } finally {
            setIsUploading(false);
            setOpenSnackbar(true);
        }
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setImages((prevImages) => [...prevImages, ...newFiles]);

            const previews = newFiles.map((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                return new Promise<string>((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string);
                });
            });

            Promise.all(previews).then((previewsArray) => {
                setImagePreviews((prevPreviews) => [...prevPreviews, ...previewsArray]);
            });
        }
    };

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectBlog(event.target.value);
    };

    return (
        <div className="component-create">
            <Title description="Əlavə et" title="Xəbərlər üçün şəkillər" to="" />
            <form noValidate autoComplete="off" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-images"
                        type="file"
                        name="imgback"
                        multiple
                        onChange={handleImageChange}
                    />
                    <label htmlFor="upload-images">
                        <Button variant="contained" component="span" style={{ marginTop: '16px', backgroundColor: 'mediumslateblue' }}>
                            Şəkillər əlavə et
                        </Button>
                    </label>

                    {imagePreviews.length > 0 && (
                        <Box mt={2}>
                            <Typography variant="subtitle1">Resim Önizlemeleri:</Typography>
                            <Box mt={2} sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                {imagePreviews.map((preview, index) => (
                                    <Box key={index}>
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

                    <select
                        onChange={handleChangeSelect}
                        required
                        value={selected_blog}
                        name="selected_blog"
                        style={{ width: '100%', maxWidth: '50%', height: '46px', borderRadius: '4px', margin: '24px 0px' }}>
                        <option value="">Bu şəkillər hansı xəbərin tərkibində olacaq?</option>
                        {blogs.map((blog: any) => (
                            <option key={blog?._id} value={blog?._id}>
                                {blog?.title}
                            </option>
                        ))}
                    </select>
                </div>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    disabled={isUploading}
                    style={{ marginTop: '16px', marginLeft: '24px' }}>
                    {isUploading ? <CircularProgress size={24} color="inherit" /> : 'Göndər'}
                </Button>
            </form>

            {isUploading && (
                <Box mt={2} display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size={40} />
                    <Typography variant="subtitle1" ml={2}>
                        Şəkillər yüklənir...
                    </Typography>
                </Box>
            )}

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%', height: '50px' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default BlogImageCreate;
