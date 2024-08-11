import React from "react";
import SidebarLinkWithDropdown from "./SidebarLinkWithDropdown";
import { NavLink } from "react-router-dom";
import { HiChartPie } from "react-icons/hi";
import { PiCaretLeftFill, PiNewspaperClipping } from "react-icons/pi";
import { atom, useRecoilState } from "recoil";
import { SiApacherocketmq } from "react-icons/si";
import { BiPulse } from "react-icons/bi";
import { MdOutlineMiscellaneousServices, MdOutlineTranslate } from "react-icons/md";
import { BsTelephoneForward } from "react-icons/bs";
import { LuShare2 } from "react-icons/lu";
import { IoLogoElectron, IoImages } from "react-icons/io5";
import { GoInfo } from "react-icons/go";
import { AiOutlineRise } from "react-icons/ai";
import { GiMovementSensor, GiReceiveMoney } from "react-icons/gi";

export const SidebarLinkLengthState = atom<string>({
  key: "lengthStateKeySidebarLink",
  default: "",
});

export const ToggleSidebarState = atom<boolean>({
  key: "togglesideStateKey",
  default: false,
});

export const TooltipForLinkState = atom<{ [key: string]: boolean }>({
  key: "forLinktooltipKey",
  default: {},
});

const Sidebarr: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useRecoilState(ToggleSidebarState);

  //give the sidebar link length values
  const sidebarRef = React.useRef<HTMLDivElement | null>(null);
  const [_, setLinkLength] = useRecoilState(SidebarLinkLengthState);

  React.useEffect(() => {
    if (sidebarRef && sidebarRef.current) {
      const sidebarLinks = sidebarRef.current.querySelectorAll(".link-area");
      setLinkLength(sidebarLinks.length.toString());
    }
  }, []);

  return (
    <aside className={`sidebar ${toggleSidebar ? "collapsed" : ""}`} ref={sidebarRef}>
      <section className="top-area">
        <img src="/166.svg" alt="" />
        <PiCaretLeftFill
          className={`toggle-sidebar-icon ${toggleSidebar ? "collapsedicon" : ""}`}
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
      <SidebarLinkWithDropdown to="/hero" linkTitle="Hero" linkIcon={<SiApacherocketmq />} />
      <SidebarLinkWithDropdown to="/statistics" linkTitle="Statistikalar" linkIcon={<BiPulse />} />
      <SidebarLinkWithDropdown
        to=""
        linkIcon={<MdOutlineMiscellaneousServices />}
        linkTitle="Xidmətlər"
        isDropdown={true}
        dropdownItem={[
          { title: "Xidmətlər (Ana səhifə)", to: "/services" },
          { title: "Xidmətlər (daxili)", to: "/servicespage" },
        ]}
      />
      <SidebarLinkWithDropdown to="/blog" linkTitle="Bloqlar" linkIcon={<PiNewspaperClipping />} />
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
          { title: "Biz kimik?", to: "/whoarewe" },
          { title: "Rəhbərlik", to: "/management" },
          { title: "Struktur", to: "/departments" },
          { title: "Lisenziyalar", to: "/lisansepage" },
          { title: "Partnyorlar", to: "/partners" },
          { title: "Sertifikatlar", to: "/certificates" },
          { title: "Gördüyümüz işlər (Ana səhifə)", to: "/ourworks" },
          { title: "Gördüyümüz işlər (Daxili)", to: "/ourworksinner" },
        ]}
      />
      <SidebarLinkWithDropdown
        to=""
        linkIcon={<AiOutlineRise />}
        linkTitle="Karyera İmkanları"
        isDropdown={true}
        dropdownItem={[
          { title: "Arxa fon və Başlıq", to: "/careerOpportunitiesBackground" },
          { title: "İşə Qəbul Prosesi", to: "/recruitmentprocess" },
          { title: "Niyə Ekol?", to: "/whyecol" },
          { title: "Vakansiyalar", to: "/vacations" },
          { title: "Vakansiya Müraciətləri", to: "/applyvacations" },
        ]}
      />
      <SidebarLinkWithDropdown
        to=""
        linkTitle="Qalereya"
        linkIcon={<IoImages />}
        isDropdown={true}
        dropdownItem={[
          { title: "Əsas səhifə", to: "/gallerydropdown" },
          { title: "Şəkillər və Kateqoriyalar", to: "/imagespage" },
          { title: "Videolar", to: "/videos" },
        ]}
      />
      <SidebarLinkWithDropdown
        to=""
        linkIcon={<GiMovementSensor />}
        linkTitle="Fəaliyyət"
        isDropdown={true}
        dropdownItem={[
          { title: "Avadanlıqlar", to: "/equipments" },
          { title: "Sosial Həyat", to: "/sociallife" },
          { title: "Sosial Həyat (Karusel)", to: "/sociallifecarousel" },
        ]}
      />
      <SidebarLinkWithDropdown to="/purchase" linkTitle="Satınalmalar" linkIcon={<GiReceiveMoney />} />
      <SidebarLinkWithDropdown
        to=""
        linkIcon={<BsTelephoneForward />}
        linkTitle="Əlaqə Səhifəsi"
        isDropdown={true}
        dropdownItem={[
          { title: "Ünvanlar", to: "/location" },
          { title: "Müraciətlər", to: "/appeals" },
        ]}
      />
    </aside>
  );
};

export default Sidebarr;
