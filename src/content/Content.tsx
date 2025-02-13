import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HeroShow from '../routes/hero/HeroShow';
import HeroCreate from '../routes/hero/HeroCreate';
import HeroEdit from '../routes/hero/HeroEdit';
import OurworksShow from '../routes/ourworks/OurworksShow';
import OurworksCreate from '../routes/ourworks/OurworksCreate';
import OurworksEdit from '../routes/ourworks/OurworksEdit';
import StatisticsShow from '../routes/statistics/StatisticsShow';
import StatisticsCreate from '../routes/statistics/StatisticsCreate';
import StatisticsEdit from '../routes/statistics/StatisticsEdit';
import ServicesShow from '../routes/services/ServicesShow';
import ServicesCreate from '../routes/services/ServicesCreate';
import ServicesEdit from '../routes/services/ServicesEdit';
import BlogShow from '../routes/blog/BlogShow';
import BlogCreate from '../routes/blog/BlogCreate';
import BlogEdit from '../routes/blog/BlogEdit';
import ContactShow from '../routes/contacts/ContactShow';
import ContactCreate from '../routes/contacts/ContactCreate';
import ContactEdit from '../routes/contacts/ContactEdit';
import SocialShow from '../routes/socials/SocialShow';
import SocialCreate from '../routes/socials/SocialCreate';
import SocialEdit from '../routes/socials/SocialEdit';
import LogoShow from '../routes/logo/LogoShow';
import LogoCreate from '../routes/logo/LogoCreate';
import LogoEdit from '../routes/logo/LogoEdit';
import TranslatesShow from '../routes/translates/TranslatesShow';
import TranslatesCreate from '../routes/translates/TranslatesCreate';
import TranslatesEdit from '../routes/translates/TranslatesEdit';
import WhoareweShow from '../routes/whoarewe/WhoareweShow';
import WhoareweCreate from '../routes/whoarewe/WhoareweCreate';
import WhoareweEdit from '../routes/whoarewe/WhoareweEdit';
import ManagementShow from '../routes/management/ManagementShow';
import ManagementCreate from '../routes/management/ManagementCreate';
import ManagementEdit from '../routes/management/ManagementEdit';
import LisanseShow from '../routes/lisanse/LisanseShow';
import LisanseCreate from '../routes/lisanse/LisanseCreate';
import LisanseEdit from '../routes/lisanse/LisanseEdit';
import PartnersShow from '../routes/partners/PartnersShow';
import PartnersCreate from '../routes/partners/PartnersCreate';
import PartnersEdit from '../routes/partners/PartnersEdit';
import GalleryDropdownShow from '../routes/gallerydropdown/GalleryDropdownShow';
import GalleryDropdownCreate from '../routes/gallerydropdown/GalleryDropdownCreate';
import GalleryDropdownEdit from '../routes/gallerydropdown/GalleryDropdownEdit';
import ImagespageCreate from '../routes/imagespage/ImagespageCreate';
import ImagespageEdit from '../routes/imagespage/ImagespageEdit';
import ImagespageShow from '../routes/imagespage/ImagespageShow';
import OurworksinnerShow from '../routes/ourworksinner/OurworksinnerShow';
import OurworksinnerCreate from '../routes/ourworksinner/OurworksinnerCreate';
import OurworksinnerEdit from '../routes/ourworksinner/OurworksinnerEdit';
import CobShow from '../routes/careerOpportunitiesBackground/CobShow';
import CobCreate from '../routes/careerOpportunitiesBackground/CobCreate';
import CobEdit from '../routes/careerOpportunitiesBackground/CobEdi';
import WhyEcolShow from '../routes/whyecol/WhyEcolShow';
import WhyEcolCreate from '../routes/whyecol/WhyEcolCreate';
import WhyEcolEdit from '../routes/whyecol/WhyEcolEdit';
import RecruitmentShow from '../routes/recruitmentProcess/RecruitmentShow';
import RecruitmentCreate from '../routes/recruitmentProcess/RecruitmentCreate';
import RecruitmentEdit from '../routes/recruitmentProcess/RecruitmentEdit';
import VacationsShow from '../routes/vacations/VacationsShow';
import VacationsCreate from '../routes/vacations/VacationsCreate';
import VacationsEdit from '../routes/vacations/VacationsEdit';
import ApplyVacationShow from '../routes/applyvacations/ApplyVacationShow';
import ApplyVacationInner from '../routes/applyvacations/ApplyVacationInner';
import EquipmentsShow from '../routes/equipments/EquipmentsShow';
import EquipmentsCreate from '../routes/equipments/EquipmentsCreate';
import EquipmentsEdit from '../routes/equipments/EquipmentsEdit';
import ServicesPageShow from '../routes/servicespage/ServicesPageShow';
import ServicesPageCreate from '../routes/servicespage/ServicesPageCreate';
import ServicesPageEdit from '../routes/servicespage/ServicesPageEdit';
import SocialLifeCarouselShow from '../routes/sociallifecarousel/SocialLifeCarouselShow';
import SocialLifeCarouselCreate from '../routes/sociallifecarousel/SocialLifeCarouselCreate';
import SocialLifeCarouselEdit from '../routes/sociallifecarousel/SocialLifeCarouselEdit';
import SocialLifeShow from '../routes/sociallife/SocialLifeShow';
import SocialLifeCreate from '../routes/sociallife/SocialLifeCreate';
import SocialLifeEdit from '../routes/sociallife/SocialLifeEdit';
import PurchaseShow from '../routes/purchase/PurchaseShow';
import PurchaseCreate from '../routes/purchase/PurchaseCreate';
import PurchaseEdit from '../routes/purchase/PurchaseEdit';
import CertificatesEdit from '../routes/certificates/CertificatesEdit';
import CertificatesCreate from '../routes/certificates/CertificatesCreate';
import CertificatesShow from '../routes/certificates/CertificatesShow';
import LisansePageShow from '../routes/lisansepage/LisansePageShow';
import LisansePageCreate from '../routes/lisansepage/LisansePageCreate';
import LisansePageEdit from '../routes/lisansepage/LisansePageEdit';
import LocationShow from '../routes/location/LocationShow';
import LocationCreate from '../routes/location/LocationCreate';
import LocationEdit from '../routes/location/LocationEdit';
import AppealsShow from '../routes/appeals/AppealsShow';
import AppealsInner from '../routes/appeals/AppealsInner';
import VideosShow from '../routes/videos/VideosShow';
import VideosCreate from '../routes/videos/VideosCreate';
import VideosEdit from '../routes/videos/VideosEdit';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ToggleSidebarState } from '../sidebar/Sidebar';
import { FaRegHandPointRight } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa6';
import Overview from './Overview';
import { IoMoon } from 'react-icons/io5';
import { DarkModeState } from '../App';
import { IoSunnyOutline } from 'react-icons/io5';
import EmailsShow from '../routes/emails/EmailsShow';
import NewBlogShow from '../routes/newblog/NewBlogShow';
import NewBlogCreate from '../routes/newblog/NewBlogCreate';
import NewBlogEdit from '../routes/newblog/NewBlogEdit';
import PurchAnnShow from '../routes/purchaseAnnouncements/PurchAnnShow';
import PurchAnnCreate from '../routes/purchaseAnnouncements/PurchAnnCreate';
import PurchAnnEdit from '../routes/purchaseAnnouncements/PurchAnnEdit';
import PurchRuleCreate from '../routes/purchaserules/PurchRuleCreate';
import PurchRuleShow from '../routes/purchaserules/PurchRuleShow';
import PurchaseContact from '../routes/purchasecontact/PurchaseContact';
import PurchaseAddCountries from '../routes/PurchaseAddCountries';
import YearlyCalculationsCreate from '../routes/yearlycalculations/YearlyCalculationsCreate';
import YearlyCalculationsShow from '../routes/yearlycalculations/YearlyCalculationsShow';
import YearlyCalculationsEdit from '../routes/yearlycalculations/YearlyCalculationsEdit';
import CalculationsShow from '../routes/calculations/CalculationsShow';
import CalculationsCreate from '../routes/calculations/CalculationsCreate';
import CalculationsEdit from '../routes/calculations/CalculationsEdit';
import BlogImageCreate from '../routes/blog/BlogImageCreate';
import BlogImageShow from '../routes/blog/BlogImageShow';
import OurWorksInnerImagesShow from '../routes/ourworksinner/OurWorksInnerImagesShow';
import OurWorksInnerImageCreate from '../routes/ourworksinner/OurWorksInnerImagesCreate';
import OurWorksInnerImagesEdit from '../routes/ourworksinner/OurWorksInnerImagesEdit';
import ToolsInnerShow from '../routes/toolsinner/ToolsInnerShow';
import ToolsInnerCreate from '../routes/toolsinner/ToolsInnerCreate';
import ToolsInnerEdit from '../routes/toolsinner/ToolsInnerEdit';
import ToolsInnerImagesShow from '../routes/toolsinner/ToolsInnerImagesShow';
import ToolsInnerImagesCreate from '../routes/toolsinner/ToolsInnerImagesCreate';
import ToolsInnerImagesEdit from '../routes/toolsinner/ToolsInnerImagesEdit';
import HiddenRehberlik from '../routes/hiddenrehberlik/HiddenRehberlik';
import StructureShow from '../routes/structure/StructureShow';
import StructureCreate from '../routes/structure/StructureCreate';
import StructureEdit from '../routes/structure/StructureEdit';
import BlogImageEdit from '../routes/blog/BlogImageEdit';
import PageShow from '../routes/dynamicroute/PageShow';
import PageCreate from '../routes/dynamicroute/PageCreate';
import PageEdit from '../routes/dynamicroute/PageEdit';
import { FaAngleDown } from 'react-icons/fa6';
import CreateUser from '../permissionsroutes/users/CreateUser';
import CreateRole from '../permissionsroutes/roles/CreateRole';
import CreatePermission from '../permissionsroutes/permissions/CreatePermission';
import HiddenPurchase from '../routes/hiddenpurchase/HiddenPurchase';
import HiddenCarier from '../routes/hiddencarier/HiddenCarier';
import AddEnterPrise from '../routes/addenterprise/AddEnterPrise';
import AddStage from '../routes/addstage/AddStage';
import HiddenSocial from '../routes/hiddensocial/HiddenSocial';
import ProcedureShow from '../routes/procedure/ProcedureShow';
import ProcedureCreate from '../routes/procedure/ProcedureCreate';
import ProcedureEdit from '../routes/procedure/ProcedureEdit';
import NewBlogImageShow from '../routes/newblog/NewBlogImageShow';
import NewBlogImageCreate from '../routes/newblog/NewBlogImageCreate';
import NewBlogImageEdit from '../routes/newblog/NewBlogImageEdit';
import HiddenHero from '../routes/hiddenhero/HiddenHero';
import HiddenOurWorksHome from '../routes/hiddenourworkshome/HiddenOurWorksHome';
import HiddenAbout from '../routes/hiddenabout/HiddenAbout';
import HiddenActivity from '../routes/hiddenactivity/HiddenActivity';
import HiddenMedia from '../routes/hiddenmedia/HiddenMedia';
import MainPage from '../routes/seo/MainPage';
import MetaTags from '../routes/seo/metatags/MetaTags';
import HiddenContact from '../routes/hiddencontact/HiddenContact';
import AddFavicon from '../routes/seo/addfavicon/AddFavicon';
import PurchRuleEdit from '../routes/purchaserules/PurchRuleEdit';
import SmtpCreate from '../routes/smtpconfig/SmtpCreate';
import DynamicCategoryShow from '../routes/dynamiccalculations/DynamicCategoryShow';
import DynamicCategoryCreate from '../routes/dynamiccalculations/DynamicCategoryCreate';
import DynamicCategoryEdit from '../routes/dynamiccalculations/DynamicCategoryEdit';
import DynamicCategoryContentShow from '../routes/dynamiccalculationcontent/DynamicCategoryContentShow';
import DynamicCategoryContentCreate from '../routes/dynamiccalculationcontent/DynamicCategoryContentCreate';
import DynamicCategoryContentEdit from '../routes/dynamiccalculationcontent/DynamicCategoryContentEdit';
import AddIcons from '../routes/addicons/AddIcons';
import AddFooterIconShow from '../routes/addicons/uitils/AddFooterIconShow';
import AddFooterIconEdit from '../routes/addicons/uitils/AddFooterIconEdit';
import AddMapIconEdit from '../routes/addicons/uitils/addicon-map/AddMapIconEdit';

const Content: React.FC = () => {
    const toggleSidebar = useRecoilValue(ToggleSidebarState);

    const email = localStorage.getItem('usermailforadmin');

    const [darkmode, setDarkmode] = useRecoilState(DarkModeState);

    const [toggleNav, setToggleNav] = React.useState<boolean>(false);

    const navigate = useNavigate();

    const [modalLogout, setModalLogout] = React.useState<boolean>(false);

    const handleLogoutModal = () => {
        setModalLogout((prev) => !prev);
    };

    return (
        <main className="content" style={{ width: !toggleSidebar ? '95%' : '' }}>
            <header className="header">
                <div className="left-logo">
                    <FaRegHandPointRight className="right" />
                    <h1 className="project-name">Ekol</h1>
                </div>

                <div className="right-user">
                    <div className="name-and-surname">
                        <span>{email ? email : 'example@gmail.com'}</span>
                    </div>
                    <div className="profile" onClick={handleLogoutModal}>
                        <FaRegUser className="user" />
                    </div>
                    <div className={`logout-modal ${modalLogout ? 'actived' : ''}`}>
                        <button
                            type="button"
                            onClick={() => {
                                localStorage.clear();
                                setModalLogout(false);

                                const timeout = setTimeout(() => {
                                    window.location.reload();
                                }, 1000);

                                return () => clearTimeout(timeout);
                            }}>
                            Çıxış
                        </button>
                    </div>
                    <div
                        className="mode"
                        onClick={() => {
                            setDarkmode((prevMode) => !prevMode);
                        }}>
                        {darkmode ? <IoSunnyOutline className={`sun ${darkmode ? 'active' : ''}`} /> : <IoMoon className="moon" />}
                    </div>

                    <div
                        className="navbar-for-permissions"
                        style={{
                            display: email ? (email === 'admin@gmail.com' ? 'flex' : 'none') : '',
                        }}>
                        <div className="nav" onClick={() => setToggleNav((prev) => !prev)}>
                            <span>İdarəçilik</span>
                            <FaAngleDown className="down" style={{ transform: toggleNav ? 'rotate(180deg)' : '' }} />
                        </div>
                        <div className={`navbar-sub ${toggleNav ? 'active' : ''}`}>
                            <li
                                className="item-nav"
                                onClick={() => {
                                    setToggleNav(false);
                                    navigate('/create_user', { replace: true });
                                }}>
                                İstifadəçilər
                            </li>
                            <li
                                className="item-nav"
                                onClick={() => {
                                    setToggleNav(false);
                                    navigate('/create_role', { replace: true });
                                }}>
                                Rollar
                            </li>
                            <li
                                className="item-nav"
                                onClick={() => {
                                    setToggleNav(false);
                                    navigate('/create_permission', { replace: true });
                                }}>
                                İcazələr
                            </li>
                        </div>
                    </div>
                </div>
            </header>
            <Routes>
                {/* OVERVIEW */}
                <Route path="/" element={<Overview />} />
                {/* HERO */}
                <Route path="/hero" element={<HeroShow />} />
                <Route path="/hero/create" element={<HeroCreate />} />
                <Route path="/hero/:editid" element={<HeroEdit />} />
                {/* OURWORKS */}
                <Route path="/ourworks" element={<OurworksShow />} />
                <Route path="/ourworks/create" element={<OurworksCreate />} />
                <Route path="/ourworks/:editid" element={<OurworksEdit />} />
                {/* STATISTICS */}
                <Route path="/statistics" element={<StatisticsShow />} />
                <Route path="/statistics/create" element={<StatisticsCreate />} />
                <Route path="/statistics/:editid" element={<StatisticsEdit />} />
                {/* SERVICES */}
                <Route path="/services" element={<ServicesShow />} />
                <Route path="/services/create" element={<ServicesCreate />} />
                <Route path="/services/:editid" element={<ServicesEdit />} />
                {/* XEBERLER (NEWS) */}
                <Route path="/blog" element={<BlogShow />} />
                <Route path="/blog/create" element={<BlogCreate />} />
                <Route path="/blog/:editid" element={<BlogEdit />} />
                <Route path="/blogimage" element={<BlogImageShow />} />
                <Route path="/blogimage/create" element={<BlogImageCreate />} />
                <Route path="/blogimage/:editid" element={<BlogImageEdit />} />
                <Route path="/newblogimage" element={<NewBlogImageShow />} />
                <Route path="/newblogimage/create" element={<NewBlogImageCreate />} />
                <Route path="/newblogimage/:editid" element={<NewBlogImageEdit />} />

                {/* NEW BLOGS (BLOQLAR) */}
                <Route path="/newblogs" element={<NewBlogShow />} />
                <Route path="/newblogs/create" element={<NewBlogCreate />} />
                <Route path="/newblogs/:editid" element={<NewBlogEdit />} />
                {/* CONTACT */}
                <Route path="/contact" element={<ContactShow />} />
                <Route path="/contact/create" element={<ContactCreate />} />
                <Route path="/contact/:editid" element={<ContactEdit />} />
                {/* SOCIALS */}
                <Route path="/socials" element={<SocialShow />} />
                <Route path="/socials/create" element={<SocialCreate />} />
                <Route path="/socials/:editid" element={<SocialEdit />} />
                {/* LOGO */}
                <Route path="/logo" element={<LogoShow />} />
                <Route path="/logo/create" element={<LogoCreate />} />
                <Route path="/logo/:editid" element={<LogoEdit />} />
                {/* TRANSLATES */}
                <Route path="/translates" element={<TranslatesShow />} />
                <Route path="/translates/create" element={<TranslatesCreate />} />
                <Route path="/translates/:editid" element={<TranslatesEdit />} />
                {/* WHO ARE WE ? */}
                <Route path="/whoarewe" element={<WhoareweShow />} />
                <Route path="/whoarewe/create" element={<WhoareweCreate />} />
                <Route path="/whoarewe/:editid" element={<WhoareweEdit />} />
                {/* MANAGEMENT */}
                <Route path="/management" element={<ManagementShow />} />
                <Route path="/management/create" element={<ManagementCreate />} />
                <Route path="/management/:editid" element={<ManagementEdit />} />
                {/* STRUCTURES */}
                {/* <Route path="/departments" element={<StructureShow />} /> */}
                {/* <Route path="/departments/create" element={<StructureCreate />} /> */}
                {/* <Route path="/departments/:editid" element={<StructureEdit />} /> */}
                <Route path="/structure" element={<StructureShow />} />
                <Route path="/structure/create" element={<StructureCreate />} />
                <Route path="/structure/:editid" element={<StructureEdit />} />
                {/* LISANSLAR */}
                <Route path="/lisanse" element={<LisanseShow />} />
                <Route path="/lisanse/create" element={<LisanseCreate />} />
                <Route path="/lisanse/:editid" element={<LisanseEdit />} />
                {/* PARTNERS */}
                <Route path="/partners" element={<PartnersShow />} />
                <Route path="/partners/create" element={<PartnersCreate />} />
                <Route path="/partners/:editid" element={<PartnersEdit />} />
                {/* GALLERYDROPDOWN */}
                <Route path="/gallerydropdown" element={<GalleryDropdownShow />} />
                <Route path="/gallerydropdown/create" element={<GalleryDropdownCreate />} />
                <Route path="/gallerydropdown/:editid" element={<GalleryDropdownEdit />} />
                {/* GALLERY PAGE - IMAGES */}
                <Route path="/imagespage" element={<ImagespageShow />} />
                <Route path="/imagespage/create" element={<ImagespageCreate />} />
                <Route path="/imagespage/:editid" element={<ImagespageEdit />} />
                {/* OUR WORKS INNER */}
                <Route path="/ourworksinner" element={<OurworksinnerShow />} />
                <Route path="/ourworksinner/create" element={<OurworksinnerCreate />} />
                <Route path="/ourworksinner/:editid" element={<OurworksinnerEdit />} />
                <Route path="/ourworksimages" element={<OurWorksInnerImagesShow />} />
                <Route path="/ourworksimages/create" element={<OurWorksInnerImageCreate />} />
                <Route path="/ourworksimages/:editid" element={<OurWorksInnerImagesEdit />} />
                {/* COB (CAREER OPPORTUNITIES BACKGROUND AND TITLE SECTION) */}
                <Route path="/careerOpportunitiesBackground" element={<CobShow />} />
                <Route path="/careerOpportunitiesBackground/create" element={<CobCreate />} />
                <Route path="/careerOpportunitiesBackground/:editid" element={<CobEdit />} />
                {/* WHY ECOL ? (CAREER OPPORTUNITIES PAGE) */}
                <Route path="/whyecol" element={<WhyEcolShow />} />
                <Route path="/whyecol/create" element={<WhyEcolCreate />} />
                <Route path="/whyecol/:editid" element={<WhyEcolEdit />} />
                {/* RECRUITMENT PROCESS (CAREER OPPORTUNITIES PAGE) */}
                <Route path="/recruitmentprocess" element={<RecruitmentShow />} />
                <Route path="/recruitmentprocess/create" element={<RecruitmentCreate />} />
                <Route path="/recruitmentprocess/:editid" element={<RecruitmentEdit />} />
                {/* VACATIONS (SHARING) */}
                <Route path="/vacations" element={<VacationsShow />} />
                <Route path="/vacations/create" element={<VacationsCreate />} />
                <Route path="/vacations/:editid" element={<VacationsEdit />} />
                {/* VACATIONS (APPLY) */}
                <Route path="/applyvacations" element={<ApplyVacationShow />} />
                <Route path="/applyvacations/:innerid" element={<ApplyVacationInner />} />
                {/* EQUIPMENTS */}
                <Route path="/equipments" element={<EquipmentsShow />} />
                <Route path="/equipments/create" element={<EquipmentsCreate />} />
                <Route path="/equipments/:editid" element={<EquipmentsEdit />} />
                {/* SERVICES PAGE */}
                <Route path="/servicespage" element={<ServicesPageShow />} />
                <Route path="/servicespage/create" element={<ServicesPageCreate />} />
                <Route path="/servicespage/:editid" element={<ServicesPageEdit />} />
                {/* SOCIAL LIFE (CAROUSEL) */}
                <Route path="/sociallifecarousel" element={<SocialLifeCarouselShow />} />
                <Route path="/sociallifecarousel/create" element={<SocialLifeCarouselCreate />} />
                <Route path="/sociallifecarousel/:editid" element={<SocialLifeCarouselEdit />} />
                {/* SOCIAL LIFE (MAIN DESCRIPTIONS) */}
                <Route path="/sociallife" element={<SocialLifeShow />} />
                <Route path="/sociallife/create" element={<SocialLifeCreate />} />
                <Route path="/sociallife/:editid" element={<SocialLifeEdit />} />
                {/* PURCHASE */}
                <Route path="/purchase" element={<PurchaseShow />} />
                <Route path="/purchase/create" element={<PurchaseCreate />} />
                <Route path="/purchase/:editid" element={<PurchaseEdit />} />
                {/* PURCHASE ANNOUNCEMENTS (NEW FEATURE) */}
                <Route path="/purchaseannouncement" element={<PurchAnnShow />} />
                <Route path="/purchaseannouncement/create" element={<PurchAnnCreate />} />
                <Route path="/purchaseannouncement/:editid" element={<PurchAnnEdit />} />
                {/* PURCHASE RULES (NEW FEATURE) */}
                <Route path="/purchaserules" element={<PurchRuleShow />} />
                <Route path="/purchaserules/create" element={<PurchRuleCreate />} />
                <Route path="/purchaserules/:editid" element={<PurchRuleEdit />} />
                {/* PURCHASE CONTACT (NEW FEATURE) */}
                <Route path="/purchasecontact" element={<PurchaseContact />} />
                <Route path="/purchaseAddCountries" element={<PurchaseAddCountries />} />

                {/* CERTIFICATES */}
                <Route path="/certificates" element={<CertificatesShow />} />
                <Route path="/certificates/create" element={<CertificatesCreate />} />
                <Route path="/certificates/:editid" element={<CertificatesEdit />} />
                {/* LISENZIYALAR (PAGE) */}
                <Route path="/lisansepage" element={<LisansePageShow />} />
                <Route path="/lisansepage/create" element={<LisansePageCreate />} />
                <Route path="/lisansepage/:editid" element={<LisansePageEdit />} />
                {/* LOCATİONS (CONTACT PAGE) */}
                <Route path="/location" element={<LocationShow />} />
                <Route path="/location/create" element={<LocationCreate />} />
                <Route path="/location/:editid" element={<LocationEdit />} />
                {/* APPEALS (CONTACT PAGE) */}
                <Route path="/appeals" element={<AppealsShow />} />
                <Route path="/appeals/:inneridappeals" element={<AppealsInner />} />
                {/* VIDEOS (VIDEOS PAGE) */}
                <Route path="/videos" element={<VideosShow />} />
                <Route path="/videos/create" element={<VideosCreate />} />
                <Route path="/videos/:editid" element={<VideosEdit />} />
                {/* VIDEOS (VIDEOS PAGE) */}
                <Route path="/emails" element={<EmailsShow />} />

                {/* CALCULATIONS */}
                <Route path="/calculations" element={<CalculationsShow />} />
                <Route path="/calculations/create" element={<CalculationsCreate />} />
                <Route path="/calculations/:editid" element={<CalculationsEdit />} />

                {/* YEARLY CALCULATIONS */}
                <Route path="/yearly_calculations" element={<YearlyCalculationsShow />} />
                <Route path="/yearly_calculations/create" element={<YearlyCalculationsCreate />} />
                <Route path="/yearly_calculations/:editid" element={<YearlyCalculationsEdit />} />
                <Route path="/dynamic-category" element={<DynamicCategoryShow />} />
                <Route path="/dynamic-category/create" element={<DynamicCategoryCreate />} />
                <Route path="/dynamic-category/:editid" element={<DynamicCategoryEdit />} />

                <Route path="/dynamic-category-content" element={<DynamicCategoryContentShow />} />
                <Route path="/dynamic-category-content/create" element={<DynamicCategoryContentCreate />} />
                <Route path="/dynamic-category-content/:editid" element={<DynamicCategoryContentEdit />} />

                {/* structure categories */}
                {/* <Route path="/departmentscategories" element={<StructureCategoriesShow />} /> */}
                {/* <Route path="/departmentscategories/create" element={<StructureCategoriesCreate />} /> */}
                {/* <Route path="/departmentscategories/:editid" element={<StructureCategoriesEdit />} /> */}

                {/* equipments description */}
                <Route path="/toolsinner" element={<ToolsInnerShow />} />
                <Route path="/toolsinner/create" element={<ToolsInnerCreate />} />
                <Route path="/toolsinner/:editid" element={<ToolsInnerEdit />} />
                <Route path="/toolsinnerimages" element={<ToolsInnerImagesShow />} />
                <Route path="/toolsinnerimages/create" element={<ToolsInnerImagesCreate />} />
                <Route path="/toolsinnerimages/:editid" element={<ToolsInnerImagesEdit />} />
                {/* Show - hidden */}
                <Route path="/hidden-rehberlik" element={<HiddenRehberlik />} />
                <Route path="/hidden-social" element={<HiddenSocial />} />
                <Route path="/hidden-purchase" element={<HiddenPurchase />} />
                <Route path="/hidden-carier" element={<HiddenCarier />} />
                <Route path="/hidden-hero" element={<HiddenHero />} />
                <Route path="/hidden-ourworkshome" element={<HiddenOurWorksHome />} />
                <Route path="/hidden-about" element={<HiddenAbout />} />
                <Route path="/hidden-activity" element={<HiddenActivity />} />
                <Route path="/hidden-media" element={<HiddenMedia />} />
                <Route path="/hidden-contact" element={<HiddenContact />} />

                {/* SEO */}
                <Route path='/seo-optimizations' element={<MainPage />} />
                <Route path='/seo-optimizations-meta-tags' element={<MetaTags />} />
                <Route path='/seo-optimizations-favicon' element={<AddFavicon />} />

                {/* DYNAMIC PAGES */}
                <Route path="/page" element={<PageShow />} />
                <Route path="/page/create" element={<PageCreate />} />
                <Route path="/page/:editid" element={<PageEdit />} />

                {/* ROUTES FOR PERMISSIONS, ROLES AND USERS */}
                <Route path="/create_user" element={<CreateUser />} />
                <Route path="/create_role" element={<CreateRole />} />
                <Route path="/create_permission" element={<CreatePermission />} />

                <Route path="/addEnterprise" element={<AddEnterPrise />} />
                <Route path="/addStage" element={<AddStage />} />

                <Route path='/procedure' element={<ProcedureShow />} />
                <Route path='/procedure/create' element={<ProcedureCreate />} />
                <Route path='/procedure/:editid' element={<ProcedureEdit />} />

                <Route path='/smtp-config' element={<SmtpCreate />} />

                <Route path='/icon-add' element={<AddFooterIconShow />} />
                <Route path='/icon-add/create' element={<AddIcons />} />
                <Route path='/icon-add/edit/:id' element={<AddFooterIconEdit />} />
                <Route path='/icon-add-map/edit/:id' element={<AddMapIconEdit />} />


            </Routes>
        </main>
    );
};

export default Content;
