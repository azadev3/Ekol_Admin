import React from 'react'
import Title from '../../../uitils/Title'
import { IconType } from './AddFooterIcon';
import { URL } from '../../../Base';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddFooterIconShow: React.FC = () => {

    const navigate = useNavigate();

    const [data, setData] = React.useState<IconType[]>([]);
    const [dataMap, setDataMap] = React.useState<IconType[]>([]);

    const handleGet = async () => {
        try {
            const res = await axios.get(`${URL}/get-icon-footer`);
            if (res.data) {
                console.log(res.data, 'iconlar');
                setData(res.data);
            } else {
                console.log(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetMapIcon = async () => {
        try {
            const res = await axios.get(`${URL}/get-icon-map`);
            if (res.data) {
                setDataMap(res.data);
            } else {
                console.log(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemoveIcon = async (id: string) => {
        try {
            const res = await axios.delete(`${URL}/delete-icon-footer/${id}`);
            if (res.data) {
                toast.success('Silindi');
                handleGet();
            } else {
                toast.error('Bir problem oldu');
            }
        } catch (error) {
            console.log(error);
            toast.error('Bir problem oldu');
        }
    }

    const handleRemoveIconMap = async (id: string) => {
        try {
            const res = await axios.delete(`${URL}/delete-icon-map/${id}`);
            if (res.data) {
                toast.success('Silindi');
                handleGetMapIcon();
            } else {
                toast.error('Bir problem oldu');
            }
        } catch (error) {
            console.log(error);
            toast.error('Bir problem oldu');
        }
    }

    React.useEffect(() => {
        handleGet();
        handleGetMapIcon();
    }, []);

    const containerStyles: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: '30px',
    }

    return (
        <div className='show-icons'>
            <div className="conta" style={containerStyles}>
                <Title title='Icon FOOTER' to='/icon-add/create' description='Footerə aid olan ikonlar' />
                {data?.map((icons: IconType, i: number) => (
                    <div key={icons?._id} className='icon-card'>
                        <span className='num'>{i + 1}</span>
                        <img src={`https://ekol-server-1.onrender.com/public/${icons?.icon}`} alt="" />
                        <div className="right">
                            <button className='remove' onClick={() => handleRemoveIcon(icons?._id)}>Sil</button>
                            <button className='edit' onClick={() => navigate(`/icon-add/edit/${icons?._id}`)}>Düzəliş</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="conta" style={containerStyles}>
                <Title title='Icon MAP' to='/icon-add/create' description='Map yanındakı ikonlar' />
                {dataMap?.map((icons: IconType, i: number) => (
                    <div key={icons?._id} className='icon-card'>
                        <span className='num'>{i + 1}</span>
                        <img src={`https://ekol-server-1.onrender.com/public/${icons?.icon}`} alt="" />
                        <div className="right">
                            <button className='remove' onClick={() => handleRemoveIconMap(icons?._id)}>Sil</button>
                            <button className='edit' onClick={() => navigate(`/icon-add-map/edit/${icons?._id}`)}>Düzəliş</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddFooterIconShow