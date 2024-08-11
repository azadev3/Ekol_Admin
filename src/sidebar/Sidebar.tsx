import React from "react";
import SidebarLink from "./SidebarLink";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <section className="head">
        <div className="logo">
          <img src="/166.svg" alt="166Tech" title="166Tech" />
        </div>
      </section>

      <nav className="navbar">
        <SidebarLink to="/hero" title="Hero" className="sidebar-link" />
        <SidebarLink to="/ourworks" title="Gördüyümüz İşlər" className="sidebar-link" />
        <SidebarLink to="/statistics" title="Statistikalar" className="sidebar-link" />
        <SidebarLink to="/services" title="Xidmətlər" className="sidebar-link" />
        <SidebarLink to="/blog" title="Bloqlar" className="sidebar-link" />
        <SidebarLink to="/contact" title="Əlaqə" className="sidebar-link" />
        <SidebarLink to="/socials" title="Sosial Medialar" className="sidebar-link" />
        <SidebarLink to="/logo" title="Loqo" className="sidebar-link" />
        <SidebarLink to="/translates" title="Tərcümələr" className="sidebar-link" />
        <SidebarLink to="/whoarewe" title="Biz kimik?" className="sidebar-link" />
        <SidebarLink to="/management" title="Rəhbərlik" className="sidebar-link" />
        <SidebarLink to="/departments" title="Strukturlar (Department)" className="sidebar-link" />
        <SidebarLink to="/lisanse" title="Lisanslar" className="sidebar-link" />
        <SidebarLink to="/partners" title="Partnyorlar" className="sidebar-link" />
        <SidebarLink to="/gallerydropdown" title="Qalereya Səhifəsi" className="sidebar-link" />
        <SidebarLink to="/imagespage" title="Qalereya Səhifəsi - Şəkillər və Kateqoriyalar" className="sidebar-link" />
        <SidebarLink to="/ourworksinner" title="Gördüyümüz İşlər (Daxili)" className="sidebar-link" />
        <SidebarLink
          to="/careerOpportunitiesBackground"
          title="Karyera İmkanları - Arxa fon və Başlıq"
          className="sidebar-link"
        />
        <SidebarLink to="/whyecol" title="Karyera İmkanları - Niyə Ekol?" className="sidebar-link" />
        <SidebarLink to="/recruitmentprocess" title="Karyera İmkanları - İşə qəbul prosesi" className="sidebar-link" />
        <SidebarLink to="/vacations" title="Vakansiyalar" className="sidebar-link" />
        <SidebarLink to="/applyvacations" title="Vakansiyaya Müraciətlər" className="sidebar-link" />
        <SidebarLink to="/equipments" title="Avadanlıqlar" className="sidebar-link" />
        <SidebarLink to="/servicespage" title="Xidmətlər (Fəaliyyət)" className="sidebar-link" />
        <SidebarLink to="/sociallifecarousel" title="Sosial Həyat (Karusel hissə)" className="sidebar-link" />
        <SidebarLink to="/sociallife" title="Sosial Həyat" className="sidebar-link" />
        <SidebarLink to="/purchase" title="Satınalmalar" className="sidebar-link" />
        <SidebarLink to="/certificates" title="Sertifikatlar" className="sidebar-link" />
        <SidebarLink to="/lisansepage" title="Lisenziyalar" className="sidebar-link" />
        <SidebarLink to="/location" title="Ünvanlar (Əlaqə səhifəsi)" className="sidebar-link" />
        <SidebarLink to="/appeals" title="Müraciətlər (Əlaqə səhifəsi)" className="sidebar-link" />
        <SidebarLink to="/videos" title="Videolar (Qalereya səhifəsi)" className="sidebar-link" />
      </nav>
    </aside>
  );
};

export default Sidebar;
