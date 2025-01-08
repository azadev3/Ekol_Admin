import axios from 'axios';
import React, { ChangeEvent } from 'react'
import { URL } from '../../../../Base';
import { toast } from 'react-toastify';

const Qalereya: React.FC = () => {

    const [loadingForm, setLoadingForm] = React.useState<boolean>(false);

    const [metaTitle_az, setMetaTitleAz] = React.useState<string>("");
    const [metaTitle_en, setMetaTitleEn] = React.useState<string>("");
    const [metaTitle_ru, setMetaTitleRu] = React.useState<string>("");
    const [metaDescription_az, setMetaDescriptionAz] = React.useState<string>("");
    const [metaDescription_en, setMetaDescriptionEn] = React.useState<string>("");
    const [metaDescription_ru, setMetaDescriptionRu] = React.useState<string>("");
    const [metaAuthor_az, setMetaAuthorAz] = React.useState<string>("");
    const [metaAuthor_en, setMetaAuthorEn] = React.useState<string>("");
    const [metaAuthor_ru, setMetaAuthorRu] = React.useState<string>("");
    const [metaGenerator_az, setMetaGeneratorAz] = React.useState<string>("");
    const [metaGenerator_en, setMetaGeneratorEn] = React.useState<string>("");
    const [metaGenerator_ru, setMetaGeneratorRu] = React.useState<string>("");

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingForm(true);
        try {
            const formData = new FormData();
            formData.append('meta_title_az', metaTitle_az);
            formData.append('meta_title_en', metaTitle_en);
            formData.append('meta_title_ru', metaTitle_ru);
            formData.append('meta_description_az', metaDescription_az);
            formData.append('meta_description_en', metaDescription_en);
            formData.append('meta_description_ru', metaDescription_ru);
            formData.append('meta_author_az', metaAuthor_az);
            formData.append('meta_author_en', metaAuthor_en);
            formData.append('meta_author_ru', metaAuthor_ru);
            formData.append('meta_generator_az', metaGenerator_az);
            formData.append('meta_generator_en', metaGenerator_en);
            formData.append('meta_generator_ru', metaGenerator_ru);

            const res = await axios.post(`${URL}/meta-tags-qalereya`, formData, {
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
                const res = await axios.get(`${URL}/meta-tags-qalereya`);
                if (res.data) {
                    setMetaTitleAz(res.data[0]?.meta_title?.az || '');
                    setMetaTitleEn(res.data[0]?.meta_title?.en || '');
                    setMetaTitleRu(res.data[0]?.meta_title?.ru || '');
                    setMetaDescriptionAz(res.data[0]?.meta_description?.az || '');
                    setMetaDescriptionEn(res.data[0]?.meta_description?.en || '');
                    setMetaDescriptionRu(res.data[0]?.meta_description?.ru || '');
                    setMetaAuthorAz(res.data[0]?.meta_author?.az || '');
                    setMetaAuthorEn(res.data[0]?.meta_author?.en || '');
                    setMetaAuthorRu(res.data[0]?.meta_author?.ru || '');
                    setMetaGeneratorAz(res.data[0]?.meta_generator?.az || '');
                    setMetaGeneratorEn(res.data[0]?.meta_generator?.en || '');
                    setMetaGeneratorRu(res.data[0]?.meta_generator?.ru || '');
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

            {/* meta description */}
            <div className="input-field">
                <label htmlFor="meta_description">
                    Meta açıqlama (META Description) - AZ
                </label>
                <input
                    value={metaDescription_az}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaDescriptionAz(e.target.value)}
                    type="text" name='meta_description_az'
                    placeholder='MƏS: Hər növ saytların sıfırdan hazırlanması'
                />
            </div>
            <div className="input-field">
                <label htmlFor="meta_description">
                    Meta açıqlama (META Description) - EN
                </label>
                <input
                    value={metaDescription_en}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaDescriptionEn(e.target.value)}
                    type="text" name='meta_description_en'
                    placeholder='MƏS: Hər növ saytların sıfırdan hazırlanması'
                />
            </div>
            <div className="input-field">
                <label htmlFor="meta_description">
                    Meta açıqlama (META Description) - RU
                </label>
                <input
                    value={metaDescription_ru}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaDescriptionRu(e.target.value)}
                    type="text" name='meta_description_ru'
                    placeholder='MƏS: Hər növ saytların sıfırdan hazırlanması'
                />
            </div>

            {/* meta author */}
            <div className="input-field">
                <label htmlFor="meta_author_az">
                    Meta author (META Author) - AZ
                </label>
                <input
                    value={metaAuthor_az}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaAuthorAz(e.target.value)}
                    type="text" name='meta_author_az' placeholder='MƏS: Ekol QSC' />
            </div>
            <div className="input-field">
                <label htmlFor="meta_author_en">
                    Meta author (META Author) - EN
                </label>
                <input
                    value={metaAuthor_en}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaAuthorEn(e.target.value)}
                    type="text" name='meta_author_en' placeholder='MƏS: Ekol QSC' />
            </div>
            <div className="input-field">
                <label htmlFor="meta_author_ru">
                    Meta author (META Author) - RU
                </label>
                <input
                    value={metaAuthor_ru}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaAuthorRu(e.target.value)}
                    type="text" name='meta_author_ru' placeholder='MƏS: Ekol QSC' />
            </div>

            <div className="input-field">
                <label htmlFor="meta_generator_az">
                    Meta generator (META Generator) - AZ
                </label>
                <input
                    value={metaGenerator_az}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaGeneratorAz(e.target.value)}
                    type="text" name='meta_generator_az'
                    placeholder='MƏS: saytlarin hazilanmasi,veb-sayt,veb-saytlarin hazilanmasi,Saytlarin yigilmasi'
                />
            </div>
            <div className="input-field">
                <label htmlFor="meta_generator_en">
                    Meta generator (META Generator) - EN
                </label>
                <input
                    value={metaGenerator_en}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaGeneratorEn(e.target.value)}
                    type="text" name='meta_generator_en'
                    placeholder='MƏS: saytlarin hazilanmasi,veb-sayt,veb-saytlarin hazilanmasi,Saytlarin yigilmasi'
                />
            </div>
            <div className="input-field">
                <label htmlFor="meta_generator_ru">
                    Meta generator (META Generator) - RU
                </label>
                <input
                    value={metaGenerator_ru}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaGeneratorRu(e.target.value)}
                    type="text" name='meta_generator_ru'
                    placeholder='MƏS: saytlarin hazilanmasi,veb-sayt,veb-saytlarin hazilanmasi,Saytlarin yigilmasi'
                />
            </div>
            <button type='submit'>{loadingForm ? 'Saxlanılır...' : "Yadda saxla"}</button>
        </form>
    )
}

export default Qalereya 