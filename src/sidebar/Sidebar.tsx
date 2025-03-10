import React from 'react';
import SidebarLinkWithDropdown from './SidebarLinkWithDropdown';
import { NavLink } from 'react-router-dom';
import { HiChartPie } from 'react-icons/hi';
import { PiCaretLeftFill, PiNewspaperClipping } from 'react-icons/pi';
import { atom, useRecoilState } from 'recoil';
import { SiApacherocketmq } from 'react-icons/si';
import { BiPulse } from 'react-icons/bi';
import { MdEmail, MdOutlineMiscellaneousServices, MdOutlineTranslate } from 'react-icons/md';
import { BsTelephoneForward } from 'react-icons/bs';
import { LuShare2 } from 'react-icons/lu';
import { IoLogoElectron, IoImages } from 'react-icons/io5';
import { GoInfo } from 'react-icons/go';
import { AiOutlineRise } from 'react-icons/ai';
import { GiMovementSensor, GiReceiveMoney } from 'react-icons/gi';
import { GoEyeClosed } from 'react-icons/go';
import { MdOutlineContactPage } from 'react-icons/md';
import { RiSeoLine } from 'react-icons/ri';
import { FcDataConfiguration } from "react-icons/fc";
import { FaIcons } from 'react-icons/fa6';


export const SidebarLinkLengthState = atom<string>({
    key: 'lengthStateKeySidebarLink',
    default: '',
});

export const ToggleSidebarState = atom<boolean>({
    key: 'togglesideStateKey',
    default: true,
});

export const TooltipForLinkState = atom<{ [key: string]: boolean }>({
    key: 'forLinktooltipKey',
    default: {},
});

const Sidebar: React.FC = () => {
    const [toggleSidebar, setToggleSidebar] = useRecoilState(ToggleSidebarState);

    const [mobileSidebar, setMobileSidebar] = React.useState<boolean>(false);

    //give the sidebar link length values
    const sidebarRef = React.useRef<HTMLDivElement | null>(null);
    const [_, setLinkLength] = useRecoilState(SidebarLinkLengthState);

    React.useEffect(() => {
        if (sidebarRef && sidebarRef.current) {
            const sidebarLinks = sidebarRef.current.querySelectorAll('.link-area');
            setLinkLength(sidebarLinks.length.toString());
        }

        const controlMobilesidebar = () => {
            if (window.innerWidth <= 768) {
                setMobileSidebar(true);
            } else {
                setMobileSidebar(false);
            }
        };

        controlMobilesidebar();

        window.addEventListener('resize', controlMobilesidebar);
        return () => window.removeEventListener('resize', controlMobilesidebar);
    }, []);

    return (
        <aside className={`sidebar ${!toggleSidebar ? 'collapsed' : mobileSidebar ? 'mobile-sidebar' : ''}`} ref={sidebarRef}>
            <section className="top-area">
                <img src="/166.svg" alt="" />
                <PiCaretLeftFill
                    className={`toggle-sidebar-icon ${!toggleSidebar ? 'collapsedicon' : ''}`}
                    onClick={() => {
                        setToggleSidebar((prevSidebar) => !prevSidebar);
                    }}
                />
            </section>
            <NavLink to="/" className="overview-homepage">
                <HiChartPie className="pie" />
                <span>Əsas</span>
            </NavLink>
            {/* links */}
            <SidebarLinkWithDropdown to="/smtp-config" linkTitle="Mail / SMTP Config" linkIcon={<FcDataConfiguration />} />
            <SidebarLinkWithDropdown to="/seo-optimizations" linkTitle="SEO" linkIcon={<RiSeoLine />} />
            <SidebarLinkWithDropdown to="/hero" linkTitle="Hero" linkIcon={<SiApacherocketmq />} />
            <SidebarLinkWithDropdown to="/icon-add" linkTitle="İkon yerləşdir" linkIcon={<FaIcons />} />
            <SidebarLinkWithDropdown
                to="/ourworks"
                linkTitle="Gördüyümüz işlər (Ana səhifə)"
                linkIcon={<PiNewspaperClipping />}
            />
            <SidebarLinkWithDropdown to="/statistics" linkTitle="Statistikalar" linkIcon={<BiPulse />} />
            <SidebarLinkWithDropdown
                to=""
                linkIcon={<MdOutlineMiscellaneousServices />}
                linkTitle="Xidmətlər"
                isDropdown={true}
                dropdownItem={[{ title: 'Xidmətlər (daxili)', to: '/servicespage' }]}
            />
            <SidebarLinkWithDropdown to="/blog" linkTitle="Xəbərlər" linkIcon={<PiNewspaperClipping />} />
            <SidebarLinkWithDropdown to="/blogimage" linkTitle="Xəbərlər üçün şəkillər" linkIcon={<PiNewspaperClipping />} />
            <SidebarLinkWithDropdown to="/newblogimage" linkTitle="Bloqlar üçün şəkillər" linkIcon={<PiNewspaperClipping />} />
            <SidebarLinkWithDropdown to="/newblogs" linkTitle="Bloqlar" linkIcon={<PiNewspaperClipping />} />
            <SidebarLinkWithDropdown to="/contact" linkTitle="Əlaqə" linkIcon={<BsTelephoneForward />} />
            <SidebarLinkWithDropdown to="/socials" linkTitle="Sosial Medialar" linkIcon={<LuShare2 />} />
            <SidebarLinkWithDropdown to="/logo" linkTitle="Loqo" linkIcon={<IoLogoElectron />} />
            <SidebarLinkWithDropdown to="/translates" linkTitle="Tərcümələr" linkIcon={<MdOutlineTranslate />} />
            <SidebarLinkWithDropdown
                to=""
                linkTitle="Haqqımızda"
                isDropdown={true}
                linkIcon={<GoInfo />}
                dropdownItem={[
                    { title: 'Biz kimik?', to: '/whoarewe' },
                    { title: 'Rəhbərlik', to: '/management' },
                    { title: 'Struktur', to: '/structure' },
                    // { title: "Struktur", to: "/departments" },
                    // { title: "Struktur Kateqoriyalar", to: "/departmentscategories" },
                    { title: 'Lisenziyalar', to: '/lisansepage' },
                    { title: 'Partnyorlar', to: '/partners' },
                    { title: 'Sertifikatlar', to: '/certificates' },
                    { title: 'Gördüyümüz işlər (Daxili)', to: '/ourworksinner' },
                    { title: 'Gördüyümüz işlər - Şəkil yüklə', to: '/ourworksimages' },
                    { title: 'İllik hesabatlar', to: '/yearly_calculations' },
                    { title: 'Rüblük hesabatlar', to: '/calculations' },
                    { title: 'Hesabatlar - Kateqoriya Əlavə Et', to: '/dynamic-category' },
                    { title: 'Hesabatlar - Kateqoriyaya Məlumat Əlavə Et', to: '/dynamic-category-content' },
                ]}
            />
            <SidebarLinkWithDropdown
                to=""
                linkIcon={<AiOutlineRise />}
                linkTitle="Karyera İmkanları"
                isDropdown={true}
                dropdownItem={[
                    { title: 'Arxa fon və Başlıq', to: '/careerOpportunitiesBackground' },
                    { title: 'İşə Qəbul Prosesi', to: '/recruitmentprocess' },
                    { title: 'Niyə Ekol?', to: '/whyecol' },
                    { title: 'Vakansiyalar', to: '/vacations' },
                    { title: 'Vakansiya Müraciətləri', to: '/applyvacations' },
                ]}
            />
            <SidebarLinkWithDropdown
                to=""
                linkTitle="Qalereya"
                linkIcon={<IoImages />}
                isDropdown={true}
                dropdownItem={[
                    { title: 'Əsas səhifə', to: '/gallerydropdown' },
                    { title: 'Şəkillər və Kateqoriyalar', to: '/imagespage' },
                    { title: 'Videolar', to: '/videos' },
                ]}
            />
            <SidebarLinkWithDropdown
                to=""
                linkIcon={<GiMovementSensor />}
                linkTitle="Fəaliyyət"
                isDropdown={true}
                dropdownItem={[
                    { title: 'Avadanlıqlar (Daxili)', to: '/toolsinner' },
                    { title: 'Avadanlıqlar Şəkil əlavə et', to: '/toolsinnerimages' },
                    { title: 'Sosial Həyat', to: '/sociallife' },
                    { title: 'Sosial Həyat (Karusel)', to: '/sociallifecarousel' },
                ]}
            />
            {/* <SidebarLinkWithDropdown to="/purchase" linkTitle="Satınalmalar" linkIcon={<GiReceiveMoney />} /> */}
            <SidebarLinkWithDropdown
                to=""
                linkIcon={<GiReceiveMoney />}
                linkTitle="Satınalmalar"
                isDropdown={true}
                dropdownItem={[
                    { title: 'Satınalma Elanları', to: '/purchaseannouncement' },
                    { title: 'Satınalma Qaydaları', to: '/purchaserules' },
                    { title: 'Satınalma Əlaqə', to: '/purchasecontact' },
                    { title: 'Ölkə əlavə et', to: '/purchaseAddCountries' },
                    { title: 'Müəssisə adı əlavə et', to: '/addEnterprise' },
                    { title: 'Müsabiqə mərhələsi əlavə et', to: '/addStage' },
                ]}
            />
            <SidebarLinkWithDropdown
                to=""
                linkIcon={<BsTelephoneForward />}
                linkTitle="Əlaqə Səhifəsi"
                isDropdown={true}
                dropdownItem={[
                    { title: 'Ünvanlar', to: '/location' },
                    { title: 'Müraciətlər', to: '/appeals' },
                    { title: 'Şikayətlər proseduru', to: '/procedure' }
                ]}
            />
            <SidebarLinkWithDropdown to="/emails" linkTitle="E-maillər" linkIcon={<MdEmail />} />
            <SidebarLinkWithDropdown
                to=""
                linkIcon={<GoEyeClosed />}
                linkTitle="Gizlət / Göstər"
                isDropdown={true}
                dropdownItem={[
                    { title: 'Rəhbərlik', to: '/hidden-rehberlik' },
                    { title: 'Satınalma', to: '/hidden-purchase' },
                    { title: 'Karyera imkanları', to: '/hidden-carier' },
                    { title: 'Sosial həyat', to: '/hidden-social' },
                    { title: 'Hero', to: '/hidden-hero' },
                    { title: 'Gördüyümüz İşlər (ana səhifə)', to: '/hidden-ourworkshome' },
                    { title: 'Haqqımızda', to: '/hidden-about' },
                    { title: 'Fəaliyyət', to: '/hidden-activity' },
                    { title: 'Media', to: '/hidden-media' },
                    { title: 'Əlaqə', to: '/hidden-contact' },
                ]}
            />
            <SidebarLinkWithDropdown to="/page" linkTitle="Sayta Dinamik Səhifə Əlavə Et" linkIcon={<MdOutlineContactPage />} />
        </aside>
    );
};

export default Sidebar;
