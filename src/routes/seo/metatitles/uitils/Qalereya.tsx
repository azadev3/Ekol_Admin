import axios from 'axios';
import React, { ChangeEvent } from 'react'
import { URL } from '../../../../Base';
import { toast } from 'react-toastify';

const Qalereya: React.FC = () => {

    const [loadingForm, setLoadingForm] = React.useState<boolean>(false);

    const [metaTitle_az, setMetaTitleAz] = React.useState<string>("");
    const [metaTitle_en, setMetaTitleEn] = React.useState<string>("");
    const [metaTitle_ru, setMetaTitleRu] = React.useState<string>("");

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingForm(true);
        try {
            const formData = new FormData();
            formData.append('meta_title_az', metaTitle_az);
            formData.append('meta_title_en', metaTitle_en);
            formData.append('meta_title_ru', metaTitle_ru);

            const res = await axios.post(`${URL}/meta-titles-qalereya`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });

            if (res.data) {
                toast.success("Əməliyyat uğurla başa çatdı.", {
                    position: 'top-center'
                });
                console.log(res.data);
            } else {
                console.log(res.status);
                toast.error("Problem oldu, zəhmət olmasa yenidən yoxlayın.", {
                    position: 'top-center'
                })
            }

        } catch (error) {
            console.log(error);
            toast.error("Problem oldu, zəhmət olmasa yenidən yoxlayın.", {
                position: 'top-center'
            })
        } finally {
            setLoadingForm(false);
        }
    }

    React.useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${URL}/meta-titles-qalereya`);
                if (res.data) {
                    setMetaTitleAz(res.data[0]?.meta_title?.az || '');
                    setMetaTitleEn(res.data[0]?.meta_title?.en || '');
                    setMetaTitleRu(res.data[0]?.meta_title?.ru || '');
                } else {
                    console.log(res.status);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    return (
        <form acceptCharset='UTF-8' onSubmit={handleSubmitForm} className='meta-tags-form'>
            {/* meta title */}
            <div className="input-field">
                <label htmlFor="meta_title">
                    Meta başlıq (META Title) - AZ
                </label>
                <input
                    value={metaTitle_az}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaTitleAz(e.target.value)}
                    type="text" name='meta_title_az' placeholder='MƏS: Saytların hazırlanması, Saytların sıfırdan hazırlanması' />
            </div>
            <div className="input-field">
                <label htmlFor="meta_title">
                    Meta başlıq (META Title) - EN
                </label>
                <input
                    value={metaTitle_en}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaTitleEn(e.target.value)}
                    type="text" name='meta_title_en' placeholder='MƏS: Saytların hazırlanması, Saytların sıfırdan hazırlanması' />
            </div>
            <div className="input-field">
                <label htmlFor="meta_title">
                    Meta başlıq (META Title) - RU
                </label>
                <input
                    value={metaTitle_ru}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaTitleRu(e.target.value)}
                    type="text" name='meta_title_ru' placeholder='MƏS: Saytların hazırlanması, Saytların sıfırdan hazırlanması' />
            </div>
            <button type='submit'>{loadingForm ? 'Saxlanılır...' : "Yadda saxla"}</button>
        </form>
    )
}

export default Qalereya 