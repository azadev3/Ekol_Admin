import React from 'react'
import { RiSeoLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className='seo-mainpage'>
            <div className='title'>
                <RiSeoLine className='seoicon' />
                <span>Ümumi saytın <strong>SEO (Search Engine Optimization)</strong> ilə bağlı başlanğıc optimizasiyaları</span>
            </div>
            <p className='mini-title'>Zəhmət olmasa, aşağıdan hansı işi görmək istədiyinizi seçin:</p>
            <div className='grid-cards'>
                <div className="card" onClick={() => navigate('/seo-optimizations-meta-tags')}>
                    <h2 className='card-title'>Səhifələr üçün meta başlıqlar əlavə edin</h2>
                </div>
                <div className="card" onClick={() => navigate('/seo-optimizations-favicon')}>
                    <h2 className='card-title'>Favicon əlavə edin</h2>
                </div>
                {/* <div className="card">
                    <h2 className='card-title'>Şəkillər üçün ALT teqləri əlavə edin</h2>
                </div> */}
            </div>
        </div>
    )
}

export default MainPage