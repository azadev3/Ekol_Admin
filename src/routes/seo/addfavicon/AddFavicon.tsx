import React, { ChangeEvent } from 'react'
import { RiSeoLine } from 'react-icons/ri'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../Base';
import { toast } from 'react-toastify';

const AddFavicon: React.FC = () => {
    const navigate = useNavigate();

    const [icon, setIcon] = React.useState<File | null>(null);
    const [iconPreview, setIconPreview] = React.useState<string>("");

    const handleBrowseIcon = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setIcon(file);

            const reader = new FileReader();

            reader.onloadend = () => {
                setIconPreview(reader.result as string);
            }

            reader.readAsDataURL(file);
        }
    }

    const [loading, setLoading] = React.useState<boolean>(false);

    const [iconDb, setIconDb] = React.useState<string>("");
    const getFavicon = async () => {
        try {
            const res = await axios.get(`${URL}/get-favicon`);
            if(res.data) {
                console.log(res.data, 'favicon datasi');
                setIconDb(res.data?.favicon);
            } else {
                console.log(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const uploadFavicon = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('favicon', icon ? icon : '');

            const res = await axios.post(`${URL}/upload-favicon`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data) {
                toast.success('Favicon müvəffəqiyyətlə yükləndi.', {
                    position: 'top-center'
                });
                console.log(res.data);
                getFavicon();
            } else {
                toast.error('Favicon yüklənərkən problem oldu, zəhmət olmasa yenidən yoxlayın...', {
                    position: 'top-center'
                });
                console.log(res.status);
            }

        } catch (error) {
            toast.error('Favicon yüklənərkən problem oldu, zəhmət olmasa yenidən yoxlayın...', {
                position: 'top-center'
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getFavicon();
    }, []);



    return (
        <div className='meta-tags-page'>
            <div className='title'>
                <IoIosArrowBack className='get-back' onClick={() => navigate('/seo-optimizations')} />
                <RiSeoLine className='seoicon' />
                <span>Favicon (Website üçün simvol)</span>
            </div>
            <p className='mini-title'>Favicon əlavə etmək üçün bir <strong>.ico</strong> vəya <strong>.png</strong> şəkil yükləyin. <strong>Tövsiyyə edilən ölçü: 32x32</strong> </p>

            <form onSubmit={uploadFavicon} className="file-upload-form">
                <label className="file-upload-label" htmlFor="file">
                    <div className="file-upload-design">
                        <svg height="1em" viewBox="0 0 640 512">
                            <path
                                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                            ></path>
                        </svg>
                        <span className="browse-button">Fayl seçin</span>
                    </div>
                    <input name='favicon' onChange={handleBrowseIcon} type="file" id="file" />
                </label>
                <div className="preview-img">
                    {iconPreview ? <img src={iconPreview || ''} /> : <img src={`https://ekol-server-1.onrender.com${iconDb || ''}`} />}
                </div>
                <div className="button-content">
                    {iconPreview && (
                        <button type='submit'>{loading ? 'Yüklənir...' : 'Yüklə'}</button>
                    )}
                </div>
            </form>

        </div>
    )
}

export default AddFavicon