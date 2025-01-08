import React from 'react'
import { RiSeoLine } from 'react-icons/ri'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import Homepage from './uitils/Homepage';
import BizKimik from './uitils/BizKimik';
import Rehberlik from './uitils/Rehberlik';
import Struktur from './uitils/Struktur';
import Sertifikatlar from './uitils/Sertifikatlar';
import Partnyorlar from './uitils/Partnyorlar';
import GorduyumuzIsler from './uitils/GorduyumuzIsler';
import Hesabatlar from './uitils/Hesabatlar';
import Avadanliqlar from './uitils/Avadanliqlar';
import Xidmetler from './uitils/Xidmetler';
import SatinalmaElanlari from './uitils/SatinalmaElanlari';
import SatinalmaQaydalari from './uitils/SatinalmaQaydalari';
import SatinalmaElaqe from './uitils/SatinalmaElaqe';
import Xeberler from './uitils/Xeberler';
import Qalereya from './uitils/Qalereya';
import SosialHeyat from './uitils/SosialHeyat';
import Bloqlar from './uitils/Bloqlar';
import KaryeraImkanlariMelumat from './uitils/KaryeraImkanlariMelumat';
import KaryeraImkanlariVakansiyalar from './uitils/KaryeraImkanlariVakansiyalar';
import Elaqe from './uitils/Elaqe';
import BloqlarDaxili from './uitils/BloqlarDaxili';
import XeberlerDaxili from './uitils/XeberlerDaxili';

type AccordionItems = {
    id: number;
    pageTitle: string;
    component: React.JSX.Element,
}

const AccordionItemsData: AccordionItems[] = [
    {
        id: 1,
        pageTitle: 'Ana səhifə',
        component: <Homepage />,
    },
    {
        id: 2,
        pageTitle: 'Biz kimik?',
        component: <BizKimik />,
    },
    {
        id: 3,
        pageTitle: 'Rəhbərlik',
        component: <Rehberlik />
    },
    {
        id: 4,
        pageTitle: 'Struktur',
        component: <Struktur />
    },
    {
        id: 5,
        pageTitle: 'Lisenziyalar və Sertifikatlar',
        component: <Sertifikatlar />
    },
    {
        id: 6,
        pageTitle: 'Partnyorlar',
        component: <Partnyorlar />
    },
    {
        id: 7,
        pageTitle: 'Gördüyümüz İşlər',
        component: <GorduyumuzIsler />
    },
    {
        id: 8,
        pageTitle: 'Hesabatlar',
        component: <Hesabatlar />
    },
    {
        id: 9,
        pageTitle: 'Avadanlıqlar',
        component: <Avadanliqlar />
    },
    {
        id: 10,
        pageTitle: 'Xidmətlər',
        component: <Xidmetler />
    },
    {
        id: 11,
        pageTitle: 'Satınalma Elanları',
        component: <SatinalmaElanlari />
    },
    {
        id: 12,
        pageTitle: 'Satınalma Qaydaları',
        component: <SatinalmaQaydalari />
    },
    {
        id: 13,
        pageTitle: 'Satınalma - Əlaqə',
        component: <SatinalmaElaqe />
    },
    {
        id: 14,
        pageTitle: 'Xəbərlər',
        component: <Xeberler />
    },
    {
        id: 15,
        pageTitle: 'Qalereya',
        component: <Qalereya />
    },
    {
        id: 16,
        pageTitle: 'Sosial Həyat',
        component: <SosialHeyat />
    },
    {
        id: 17,
        pageTitle: 'Bloqlar',
        component: <Bloqlar />
    },
    {
        id: 18,
        pageTitle: 'Karyera İmkanları - Ümumi Məlumat',
        component: <KaryeraImkanlariMelumat />
    },
    {
        id: 19,
        pageTitle: 'Karyera İmkanları - Vakansiyalar',
        component: <KaryeraImkanlariVakansiyalar />
    },
    {
        id: 20,
        pageTitle: 'Əlaqə',
        component: <Elaqe />
    },
    {
        id: 21,
        pageTitle: 'Bloqlar - Daxili',
        component: <BloqlarDaxili />
    },
    {
        id: 22,
        pageTitle: 'Xəbərlər - Daxili',
        component: <XeberlerDaxili />
    },

]

const MetaTags: React.FC = () => {
    const navigate = useNavigate();

    const [accordion, setAccordion] = React.useState<Map<number, boolean>>(new Map());

    const handleAccordion = (id: number) => {
        setAccordion((prev) => {
            const newAccordion = new Map(prev);
            if (newAccordion.get(id)) {
                newAccordion.delete(id);
            } else {
                newAccordion.set(id, true);
            }
            return newAccordion;
        });
    }

    return (
        <div className='meta-tags-page'>
            <div className='title'>
                <IoIosArrowBack className='get-back' onClick={() => navigate('/seo-optimizations')} />
                <RiSeoLine className='seoicon' />
                <span>Səhifələr üçün Meta başlıqlar</span>
            </div>
            <p className='mini-title'>Aşağıdan səhifə seçin və "Meta title, meta description" bölmələrini istəyinizə uyğun doldurun.</p>

            <div className="accordion-contents">
                {AccordionItemsData?.map((data: AccordionItems) => (
                    <div className="item-accordion" key={data.id}>
                        <div className="head-accordion"
                            onClick={() => handleAccordion(data.id)}
                        >
                            <h3>{data.pageTitle}</h3>
                            <FaAngleDown className={`down ${accordion.get(data.id) ? 'active' : ''}`} />
                        </div>
                        <div className={`content-accordion ${accordion.get(data.id) ? 'active' : ''}`}>
                            {data.component}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MetaTags