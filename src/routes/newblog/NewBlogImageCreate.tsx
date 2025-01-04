import React, { ChangeEvent, useState } from 'react';
import Title from '../../uitils/Title';
import { Button, Snackbar, Alert, Typography, Box, IconButton } from '@mui/material';
import axios from 'axios';
import { URL } from '../../Base';
import { useNavigate } from 'react-router-dom';
import { toastMsg } from '../../App';

const NewBlogImageCreate: React.FC = () => {
    const [blogs, setBlogs] = React.useState<any>([]);
    const getBlogs = async () => {
        const response = await axios.get(`${URL}/newblogfront`, {
            headers: {
                'Accept-Language': 'az',
            },
        });
        if (response.data) {
            setBlogs(() => {
                const newBlogs = [...response.data];
                newBlogs.unshift(newBlogs.pop()!);
                return newBlogs;
            });
            setBlogs(response.data);
        }
    };

    React.useEffect(() => {
        getBlogs();
    }, [blogs]);

    const navigate = useNavigate();

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selected_new_blog, setSelectBlog] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selected_new_blog || !images) {
            setOpenSnackbar(true);
            setSnackbarMessage('Düzəlişdə bir xəta oldu yenidən yoxlayın');
        }

        const formData = new FormData();
        images.forEach((image) => formData.append('imgback', image));
        formData.append('selected_new_blog', selected_new_blog);
        try {
            const response = await axios.post(`${URL}/newblogimage`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            if (response.data || response.status === 200) {
                navigate('/newblogimage');
            }
            setSnackbarMessage('UĞURLU!.');
            setOpenSnackbar(true);
        } catch (error) {
            toastMsg();
            console.error(error);
            setSnackbarMessage('GÖZLƏNİLMƏZ XƏTA...');
            setOpenSnackbar(true);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);

            setImages((prevImages) => [...prevImages, ...newFiles]);

            const previews = newFiles.map((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                return new Promise<string>((resolve) => {
                    reader.onloadend = () => {
                        resolve(reader.result as string);
                    };
                });
            });

            Promise.all(previews).then((previewsArray) => {
                setImagePreviews((prevPreviews) => [...prevPreviews, ...previewsArray]);
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectBlog(event.target.value);
    };

    return (
        <div className="component-create">
            <Title description="Əlavə et" title="Bloqlar üçün şəkillər" to="" />

            <form noValidate autoComplete="off" style={{ marginTop: '16px' }}>
                {/* upload multiple images */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                    }}>
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

                    {/* Display previews of selected images */}
                    {imagePreviews.length > 0 && (
                        <Box mt={2}>
                            <Typography variant="subtitle1">Resim Önizlemeleri:</Typography>
                            <Box
                                mt={2}
                                sx={{
                                    display: 'flex',
                                    gap: '16px', // Space between images
                                    flexWrap: 'wrap', // Allows wrapping to next line if screen is too small
                                }}>
                                {imagePreviews.map((preview, index) => (
                                    <Box key={index} sx={{ position: 'relative' }}>
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'cover',
                                                borderRadius: '8px', // Rounded corners for images
                                            }}
                                        />
                                        <IconButton
                                            onClick={() => handleRemoveImage(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: '5px',
                                                right: '5px',
                                                width: "24px",
                                                height: "24px",
                                                background: 'rgba(255, 255, 255, 0.7)',
                                            }}>
                                            x
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

                    <select
                        onChange={handleChangeSelect}
                        required
                        name="selected_new_blog"
                        style={{ width: '100%', maxWidth: '50%', height: '46px', borderRadius: '4px', margin: '24px 0px' }}>
                        <option value="">Bu şəkillər hansı bloqun tərkibində olacaq?</option>
                        {blogs ? blogs?.reverse()?.map((blog: any) => (
                            <option key={blog?._id} value={blog?._id}>
                                {blog?.title || ''}
                            </option>
                        )) : ''}
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

            {/* Snackbar for displaying messages */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%', height: '50px' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default NewBlogImageCreate;
