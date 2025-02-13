import axios from 'axios';
import React, { ChangeEvent, FormEvent } from 'react'
import { HexColorPicker } from "react-colorful";
import { URL } from '../../../Base';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export type IconType = {
    _id: string;
    color: string;
    icon: string;
    title: string;
    url: string;
    mainTitle: string;
    value: string;
}

const AddFooterIcon: React.FC = () => {

    const navigate = useNavigate();

    const [color, setColor] = React.useState<string>("");
    const [title, setTitle] = React.useState<string>("");
    const [url, setUrl] = React.useState<string>("");
    const [icon, setIcon] = React.useState<File | null>(null);
    const [iconPreview, setPreviewIcon] = React.useState<string>("");

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewIcon(reader.result as string);
            }

            reader.readAsDataURL(file);
            setIcon(file);
        }
    }

    const handleFetch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!icon) {
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('url', url);
            formData.append('color', color);
            formData.append('icon', icon || '');

            const res = await axios.post(`${URL}/add-icon-footer`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data) {
                console.log(res.data);
                toast.success('Uğurla əlavə edildi!');
                navigate('/icon-add');
            } else {
                toast.error('Bir problem oldu')
                console.log(res.status);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleFetch} acceptCharset='UTF-8' className='content-inner'>
            <div className="field">
                <label>İkon başlığı: <span style={{ color: "#606060" }}>(qeyd edilməzsə, boş qalacaq)</span></label>
                <input
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    type="text" placeholder='İkon başlığı, məsələn: Facebook' />
            </div>
            <div className="field">
                <label>İkon URL: <span style={{ color: "#606060" }}>(sayt üzərində ikona click olunduqda yönlənəcəyi url)</span></label>
                <input
                    value={url}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                    type="text" placeholder='İkon başlığı, məsələn: https://www.example.com/' />
            </div>
            <div className="field">
                <label>İkon arxa fon rəngi: <span style={{ color: "#606060" }}>(qeyd edilməzsə, arxa fon logonun rəngində olacaq)</span></label>
                <HexColorPicker color={color} onChange={(newColor: string) => setColor(newColor)} />
                <p style={{ margin: '1rem 0' }}>Göndəriləcək rəng: <strong>{color}</strong></p>
            </div>
            <div className="field">
                <label>Loqo: <span style={{ color: "#606060" }}>(əsas icon, məcburidir, keyfiyyət üçün <strong style={{ color: 'black' }}>.svg</strong> formatında və eyni ölçülərdə yükləməyiniz tövsiyyə olunur)</span></label>
                <div className="label-img">
                    <p>Loqo seçin</p>
                    <input type="file" name='icon' required onChange={handleChangeFile} />
                </div>

                {iconPreview ? (
                    <div className='preview'>
                        <img src={iconPreview} alt="" />
                    </div>
                ) : null}
            </div>

            <button type='submit'>Göndər</button>
        </form>
    )
}

export default AddFooterIcon