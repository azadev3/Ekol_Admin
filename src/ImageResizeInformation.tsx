import React from 'react'
import { IoInformationCircleSharp } from 'react-icons/io5';
import { IoIosCloseCircle } from "react-icons/io";

type Props = {
    sizeTitle: string;
    routeTitle: string;
}

const ImageResizeInformation: React.FC<Props> = ({ routeTitle, sizeTitle }) => {

    const [close, setClose] = React.useState<boolean>(false);

    return (
        <div className="image-resize-information" style={{ display: close ? "none" : "flex" }}>
            <div className="left">
                <IoInformationCircleSharp className='warn' />
                <h6>{routeTitle} üçün yüklənəcək şəkil ölçüləri: <strong style={{ fontStyle: "italic", fontWeight: "bold", fontSize: "17px", userSelect: "all" }}>{sizeTitle}</strong></h6>
            </div>
            <IoIosCloseCircle className='closeicon' onClick={() => setClose(true)} />
        </div>
    )
}

export default ImageResizeInformation