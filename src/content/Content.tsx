import React from "react";
import { Route, Routes } from "react-router-dom";
import HeroShow from "../routes/hero/HeroShow";
import HeroCreate from "../routes/hero/HeroCreate";
import HeroEdit from "../routes/hero/HeroEdit";
import OurworksShow from "../routes/ourworks/OurworksShow";
import OurworksCreate from "../routes/ourworks/OurworksCreate";
import OurworksEdit from "../routes/ourworks/OurworksEdit";
import StatisticsShow from "../routes/statistics/StatisticsShow";
import StatisticsCreate from "../routes/statistics/StatisticsCreate";
import StatisticsEdit from "../routes/statistics/StatisticsEdit";
import ServicesShow from "../routes/services/ServicesShow";
import ServicesCreate from "../routes/services/ServicesCreate";
import ServicesEdit from "../routes/services/ServicesEdit";
import BlogShow from "../routes/blog/BlogShow";
import BlogCreate from "../routes/blog/BlogCreate";
import BlogEdit from "../routes/blog/BlogEdit";
import ContactShow from "../routes/contacts/ContactShow";
import ContactCreate from "../routes/contacts/ContactCreate";
import ContactEdit from "../routes/contacts/ContactEdit";
import SocialShow from "../routes/socials/SocialShow";
import SocialCreate from "../routes/socials/SocialCreate";
import SocialEdit from "../routes/socials/SocialEdit";
import LogoShow from "../routes/logo/LogoShow";
import LogoCreate from "../routes/logo/LogoCreate";
import LogoEdit from "../routes/logo/LogoEdit";
import TranslatesShow from "../routes/translates/TranslatesShow";
import TranslatesCreate from "../routes/translates/TranslatesCreate";
import TranslatesEdit from "../routes/translates/TranslatesEdit";
import WhoareweShow from "../routes/whoarewe/WhoareweShow";
import WhoareweCreate from "../routes/whoarewe/WhoareweCreate";
import WhoareweEdit from "../routes/whoarewe/WhoareweEdit";
import ManagementShow from "../routes/management/ManagementShow";
import ManagementCreate from "../routes/management/ManagementCreate";
import ManagementEdit from "../routes/management/ManagementEdit";
import StructureCreate from "../routes/structures/StructureCreate";
import StructureEdit from "../routes/structures/StructureEdit";
import StructureShow from "../routes/structures/StructureShow";
import LisanseShow from "../routes/lisanse/LisanseShow";
import LisanseCreate from "../routes/lisanse/LisanseCreate";
import LisanseEdit from "../routes/lisanse/LisanseEdit";
import PartnersShow from "../routes/partners/PartnersShow";
import PartnersCreate from "../routes/partners/PartnersCreate";
import PartnersEdit from "../routes/partners/PartnersEdit";
import GalleryDropdownShow from "../routes/gallerydropdown/GalleryDropdownShow";
import GalleryDropdownCreate from "../routes/gallerydropdown/GalleryDropdownCreate";
import GalleryDropdownEdit from "../routes/gallerydropdown/GalleryDropdownEdit";
import ImagespageCreate from "../routes/imagespage/ImagespageCreate";
import ImagespageEdit from "../routes/imagespage/ImagespageEdit";
import ImagespageShow from "../routes/imagespage/ImagespageShow";
import OurworksinnerShow from "../routes/ourworksinner/OurworksinnerShow";
import OurworksinnerCreate from "../routes/ourworksinner/OurworksinnerCreate";
import OurworksinnerEdit from "../routes/ourworksinner/OurworksinnerEdit";
import CobShow from "../routes/careerOpportunitiesBackground/CobShow";
import CobCreate from "../routes/careerOpportunitiesBackground/CobCreate";
import CobEdit from "../routes/careerOpportunitiesBackground/CobEdi";
import WhyEcolShow from "../routes/whyecol/WhyEcolShow";
import WhyEcolCreate from "../routes/whyecol/WhyEcolCreate";
import WhyEcolEdit from "../routes/whyecol/WhyEcolEdit";
import RecruitmentShow from "../routes/recruitmentProcess/RecruitmentShow";
import RecruitmentCreate from "../routes/recruitmentProcess/RecruitmentCreate";
import RecruitmentEdit from "../routes/recruitmentProcess/RecruitmentEdit";
import VacationsShow from "../routes/vacations/VacationsShow";
import VacationsCreate from "../routes/vacations/VacationsCreate";
import VacationsEdit from "../routes/vacations/VacationsEdit";
import ApplyVacationShow from "../routes/applyvacations/ApplyVacationShow";
import ApplyVacationInner from "../routes/applyvacations/ApplyVacationInner";
import EquipmentsShow from "../routes/equipments/EquipmentsShow";
import EquipmentsCreate from "../routes/equipments/EquipmentsCreate";
import EquipmentsEdit from "../routes/equipments/EquipmentsEdit";
import ServicesPageShow from "../routes/servicespage/ServicesPageShow";
import ServicesPageCreate from "../routes/servicespage/ServicesPageCreate";
import ServicesPageEdit from "../routes/servicespage/ServicesPageEdit";
import SocialLifeCarouselShow from "../routes/sociallifecarousel/SocialLifeCarouselShow";
import SocialLifeCarouselCreate from "../routes/sociallifecarousel/SocialLifeCarouselCreate";
import SocialLifeCarouselEdit from "../routes/sociallifecarousel/SocialLifeCarouselEdit";
import SocialLifeShow from "../routes/sociallife/SocialLifeShow";
import SocialLifeCreate from "../routes/sociallife/SocialLifeCreate";
import SocialLifeEdit from "../routes/sociallife/SocialLifeEdit";
import PurchaseShow from "../routes/purchase/PurchaseShow";
import PurchaseCreate from "../routes/purchase/PurchaseCreate";
import PurchaseEdit from "../routes/purchase/PurchaseEdit";
import CertificatesEdit from "../routes/certificates/CertificatesEdit";
import CertificatesCreate from "../routes/certificates/CertificatesCreate";
import CertificatesShow from "../routes/certificates/CertificatesShow";
import LisansePageShow from "../routes/lisansepage/LisansePageShow";
import LisansePageCreate from "../routes/lisansepage/LisansePageCreate";
import LisansePageEdit from "../routes/lisansepage/LisansePageEdit";
import LocationShow from "../routes/location/LocationShow";
import LocationCreate from "../routes/location/LocationCreate";
import LocationEdit from "../routes/location/LocationEdit";
import AppealsShow from "../routes/appeals/AppealsShow";
import AppealsInner from "../routes/appeals/AppealsInner";
import VideosShow from "../routes/videos/VideosShow";
import VideosCreate from "../routes/videos/VideosCreate";
import VideosEdit from "../routes/videos/VideosEdit";
import { useRecoilState, useRecoilValue } from "recoil";
import { ToggleSidebarState } from "../sidebar/Sidebar";
import { FaRegHandPointRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import Overview from "./Overview";
import { IoMoon } from "react-icons/io5";
import { DarkModeState } from "../App";
import { IoSunnyOutline } from "react-icons/io5";
import EmailsShow from "../routes/emails/EmailsShow";
import NewBlogShow from "../routes/newblog/NewBlogShow";
import NewBlogCreate from "../routes/newblog/NewBlogCreate";
import NewBlogEdit from "../routes/newblog/NewBlogEdit";
import PurchAnnShow from "../routes/purchaseAnnouncements/PurchAnnShow";
import PurchAnnCreate from "../routes/purchaseAnnouncements/PurchAnnCreate";
import PurchAnnEdit from "../routes/purchaseAnnouncements/PurchAnnEdit";
import PurchRuleCreate from "../routes/purchaserules/PurchRuleCreate";
import PurchRuleShow from "../routes/purchaserules/PurchRuleShow";
import PurchaseContact from "../routes/purchasecontact/PurchaseContact";
import PurchaseAddCountries from "../routes/PurchaseAddCountries";
import YearlyCalculationsCreate from "../routes/yearlycalculations/YearlyCalculationsCreate";
import YearlyCalculationsShow from "../routes/yearlycalculations/YearlyCalculationsShow";
import YearlyCalculationsEdit from "../routes/yearlycalculations/YearlyCalculationsEdit";
import CalculationsShow from "../routes/calculations/CalculationsShow";
import CalculationsCreate from "../routes/calculations/CalculationsCreate";
import CalculationsEdit from "../routes/calculations/CalculationsEdit";
import BlogImageCreate from "../routes/blog/BlogImageCreate";
import BlogImageShow from "../routes/blog/BlogImageShow";
import OurWorksInnerImagesShow from "../routes/ourworksinner/OurWorksInnerImagesShow";
import OurWorksInnerImageCreate from "../routes/ourworksinner/OurWorksInnerImagesCreate";
import OurWorksInnerImagesEdit from "../routes/ourworksinner/OurWorksInnerImagesEdit";

const Content: React.FC = () => {
  const toggleSidebar = useRecoilValue(ToggleSidebarState);

  const email = localStorage.getItem("usermailforadmin");

  const [darkmode, setDarkmode] = useRecoilState(DarkModeState);

  return (
    <main className="content" style={{ width: toggleSidebar ? "95%" : "" }}>
      <header className="header">
        <div className="left-logo">
          <FaRegHandPointRight className="right" />
          <h1 className="project-name">Ekol</h1>
        </div>

        <div className="right-user">
          <div className="name-and-surname">
            <span>{email ? email : "example@gmail.com"}</span>
          </div>
          <div className="profile">
            <FaRegUser className="user" />
          </div>
          <div
            className="mode"
            onClick={() => {
              setDarkmode((prevMode) => !prevMode);
            }}>
            {darkmode ? <IoSunnyOutline className={`sun ${darkmode ? "active" : ""}`} /> : <IoMoon className="moon" />}
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
        <Route path="/departments" element={<StructureShow />} />
        <Route path="/departments/create" element={<StructureCreate />} />
        <Route path="/departments/:editid" element={<StructureEdit />} />
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
      </Routes>
    </main>
  );
};

export default Content;
