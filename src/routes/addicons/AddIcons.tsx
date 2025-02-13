import React from 'react'
import AddFooterIcon from './uitils/AddFooterIcon';
import { FaChevronDown } from 'react-icons/fa6';
import AddMapIcon from './uitils/addicon-map/AddMapIcon';

type AccordionType = {
    id: number;
    accordHeadTitle: string;
    accordComponent: JSX.Element;
}

const AccordionForAddIcons: AccordionType[] = [
    {
        id: 1,
        accordHeadTitle: "Footer üçün olan icon'ları dəyişdir / əlavə et",
        accordComponent: <AddFooterIcon />
    },
    {
        id: 2,
        accordHeadTitle: "Ana səhifədə yerləşən xəritə yanındakı icon'ları dəyişdir / əlavə et",
        accordComponent: <AddMapIcon />
    },
]

const AddIcons: React.FC = () => {

    const [open, setOpen] = React.useState<number | null>(null);
    const handleAccord = (id: number | null) => {
        setOpen((prev) => prev === null ? id : null);
    }

    return (
        <div className='add-icons-container'>
            <h2>Saytda görünən bütün ikonları idarə et və dəyişdir.</h2>

            <div className="container-accordions">
                {AccordionForAddIcons?.map((data: AccordionType) => (
                    <div key={data?.id} className='accordion-component'>
                        <div className="head-accord"
                            style={{ backgroundColor: open === data?.id ? '#31628a' : '' }}
                            onClick={() => handleAccord(data?.id)}>
                            <h3>{data?.accordHeadTitle}</h3>
                            <FaChevronDown className="chevron" style={{ transform: open === data?.id ? 'rotate(180deg)' : '' }} />
                        </div>
                        <div className={`content-accord ${open === data?.id ? 'opened' : ''}`}>
                            {data.accordComponent}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddIcons