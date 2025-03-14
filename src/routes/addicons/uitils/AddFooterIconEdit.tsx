import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconType } from './AddFooterIcon';
import axios from 'axios';
import { URL } from '../../../Base';
import { toast } from 'react-toastify';
import { HexColorPicker } from 'react-colorful';

const AddFooterIconEdit: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState<IconType[]>([]);
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [icon, setIcon] = useState<File | null>(null);
    const [iconPreview, setIconPreview] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${URL}/get-icon-footer`);
                if (res.data) {
                    setData(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (id && data.length > 0) {
            const findedData = data.find((icon) => icon._id === id);
            if (findedData) {
                setTitle(findedData.title);
                setUrl(findedData.url);
                setColor(findedData.color);
                setIconPreview(findedData.icon);
            }
        }
    }, [id, data]);

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setIconPreview(reader.result as string);
            };

            reader.readAsDataURL(file);
            setIcon(file);
        }
    };

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setColor(newColor);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('url', url);
            formData.append('color', color);
            if (icon) {
                formData.append('icon', icon);
            }

            let res;
            if (id) {
                res = await axios.put(`${URL}/update-icon-footer/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('İkon update edildi!');
            } else {
                res = await axios.post(`${URL}/add-icon-footer`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('İkon əlavə edildi!');
            }

            if (res.data) {
                navigate('/icon-add');
            } else {
                toast.error('Xəta');
            }
        } catch (error) {
            console.log(error);
            toast.error('Proses zamanı bir xəta oldu');
        }
    };


    return (
        <div className='edit-icon'>
            <form onSubmit={handleSubmit} className='content-inner'>
                <div className="field">
                    <label>İkon Başlığı:</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="İkon başlığı, məsələn: Facebook"
                    />
                </div>
                <div className="field">
                    <label>İkon URL:</label>
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        type="text"
                        placeholder="İkon URL, məsələn: https://www.example.com/"
                    />
                </div>
                <div className="field">
                    <label>İkon Arka Fon Rəngi:</label>
                    <HexColorPicker color={color} onChange={setColor} />
                    <input
                        type="text"
                        value={color}
                        onChange={handleColorChange}
                        placeholder="#ff0000"
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                    <p>Göndəriləcək rəng: <strong>{color}</strong></p>
                </div>
                <div className="field">
                    <label>Loqo:</label>
                    <div className="label-img">
                        <p>Loqo seçin</p>
                        <input type="file" onChange={handleChangeFile} />
                    </div>
                    {iconPreview && (
                        <div className='preview'>
                            <img src={`https://ekol-server-1.onrender.com/public/${iconPreview}`} alt="Seçilmiş Loqo" />
                        </div>
                    )}
                </div>
                <button type='submit'>{id ? 'Düzəliş et' : 'Əlavə et'}</button>
            </form>
        </div>
    );
};

export default AddFooterIconEdit;
