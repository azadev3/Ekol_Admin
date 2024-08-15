import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

type PartType = {
  id: string;
  partName: string;
  partDescription: string;
  partStatus: string;
  to: string;
};

const PartData: PartType[] = [
  {
    id: uuidv4(),
    partName: "Hero",
    partDescription: "Əsas səhifənizdəki karusel, başlıq, slider kimi parçaların yer aldığı hissə",
    partStatus: "Aktiv",
    to: "/hero",
  },
  {
    id: uuidv4(),
    partName: "Statistikalar",
    partDescription: "Sizin Statistikalar bölməniz",
    partStatus: "Aktiv",
    to: "/statistics",
  },
  {
    id: uuidv4(),
    partName: "Xidmətlər Ana Səhifə",
    partDescription: "Sizin Ana Səhifədəki Xidmətlər bölməniz",
    partStatus: "Aktiv",
    to: "/services",
  },
  {
    id: uuidv4(),
    partName: "Xidmətlər Daxili",
    partDescription: "Sizin Daxili Xidmətlər bölməniz",
    partStatus: "Aktiv",
    to: "/servicespage",
  },
  {
    id: uuidv4(),
    partName: "Bloqlar",
    partDescription: "Sizin Bloq bölməniz",
    partStatus: "Aktiv",
    to: "/blog",
  },
  {
    id: uuidv4(),
    partName: "Əlaqə",
    partDescription: "Ana Səhifədəki Əlaqə bölməniz",
    partStatus: "Aktiv",
    to: "/contact",
  },
  {
    id: uuidv4(),
    partName: "Sosial Medialar",
    partDescription: "Sizin Sosial Medialar bölməniz",
    partStatus: "Aktiv",
    to: "/socials",
  },
  {
    id: uuidv4(),
    partName: "Loqo",
    partDescription: "Saytın Loqo bölməsinin API interfeysi",
    partStatus: "Aktiv",
    to: "/logo",
  },
  {
    id: uuidv4(),
    partName: "Tərcümələr",
    partDescription: "Saytın bütün dinamik tərcümələrinin idarə olunduğu hissə",
    partStatus: "Aktiv",
    to: "/translates",
  },
  {
    id: uuidv4(),
    partName: "Haqqımızda (Biz Kimik)",
    partDescription: "Biz Kimik bölməsi",
    partStatus: "Aktiv",
    to: "/whoarewe",
  },
  {
    id: uuidv4(),
    partName: "Haqqımızda (Rəhbərlik)",
    partDescription: "Rəhbərlik bölməsi",
    partStatus: "Aktiv",
    to: "/management",
  },
  {
    id: uuidv4(),
    partName: "Haqqımızda (Struktur)",
    partDescription: "Struktur bölməsi",
    partStatus: "Aktiv",
    to: "/departments",
  },
  {
    id: uuidv4(),
    partName: "Haqqımızda (Lisenziyalar)",
    partDescription: "Lisenziyalar bölməsi",
    partStatus: "Aktiv",
    to: "/lisanse",
  },
  {
    id: uuidv4(),
    partName: "Haqqımızda (Partnyorlar)",
    partDescription: "Partnyorlar bölməsi",
    partStatus: "Aktiv",
    to: "/partners",
  },
  {
    id: uuidv4(),
    partName: "Haqqımızda (Sertifikatlar)",
    partDescription: "Sertifikatlar bölməsi",
    partStatus: "Aktiv",
    to: "/certificates",
  },
  {
    id: uuidv4(),
    partName: "Haqqımızda (Gördüyümüz işlər)",
    partDescription: "Gördüyümüz işlər ana səhifə",
    partStatus: "Aktiv",
    to: "/ourworks",
  },
  {
    id: uuidv4(),
    partName: "Haqqımızda (Gördüyümüz işlər - Daxili)",
    partDescription: "Gördüyümüz işlər daxili bölməsi",
    partStatus: "Aktiv",
    to: "/ourworksinner",
  },
  {
    id: uuidv4(),
    partName: "Karyera İmkanları (Arxa fon və başlıq)",
    partDescription: "Karyera imkanlarındakı ilkin hissə, arxa fon və başlıq bölməsi",
    partStatus: "Aktiv",
    to: "/careerOpportunitiesBackground",
  },
  {
    id: uuidv4(),
    partName: "Karyera İmkanları (İşə qəbul prosesi)",
    partDescription: "Karyera imkanlarındakı İşə qəbul prosesi bölməsi",
    partStatus: "Aktiv",
    to: "/recruitmentprocess",
  },
  {
    id: uuidv4(),
    partName: "Karyera İmkanları (Niyə ekol)",
    partDescription: "Karyera imkanlarındakı 'Niyə Ekol?' bölməsi",
    partStatus: "Aktiv",
    to: "/whyecol",
  },
  {
    id: uuidv4(),
    partName: "Karyera İmkanları (Vakansiyalar)",
    partDescription: "Karyera imkanlarındakı Vakansiyalar bölməsi",
    partStatus: "Aktiv",
    to: "/vacations",
  },
  {
    id: uuidv4(),
    partName: "Karyera İmkanları (Vakansiya Müraciətləri)",
    partDescription: "Karyera imkanlarındakı paylaşdığınız vakansiyalara gələn müraciətlərin bölməsi",
    partStatus: "Aktiv",
    to: "/applyvacations",
  },
  {
    id: uuidv4(),
    partName: "Qalereya (Əsas səhifə)",
    partDescription: "Qalereya səhifəsindəki ilkin görünən bölmə",
    partStatus: "Aktiv",
    to: "/gallerydropdown",
  },
  {
    id: uuidv4(),
    partName: "Qalereya (Şəkillər və Kateqoriyalar)",
    partDescription: "Qalereya səhifəsindəki şəkillər və onların kateqoriyaları",
    partStatus: "Aktiv",
    to: "/imagespage",
  },
  {
    id: uuidv4(),
    partName: "Qalereya (Videolar)",
    partDescription: "Qalereya səhifəsindəki Videolar bölməsi",
    partStatus: "Aktiv",
    to: "/videos",
  },
  {
    id: uuidv4(),
    partName: "Fəaliyyət (Avadanlıqlar)",
    partDescription: "Fəaliyyət səhifəsindəki Avadanlıqlar bölməsi",
    partStatus: "Aktiv",
    to: "/equipments",
  },
  {
    id: uuidv4(),
    partName: "Fəaliyyət (Sosial həyat)",
    partDescription: "Fəaliyyət səhifəsindəki Sosial Həyat bölməsi",
    partStatus: "Aktiv",
    to: "/sociallife",
  },
  {
    id: uuidv4(),
    partName: "Fəaliyyət (Sosial həyat - Karusel)",
    partDescription: "Fəaliyyət səhifəsindəki Sosial həyat - Karusel olan hissə",
    partStatus: "Aktiv",
    to: "/sociallifecarousel",
  },
  {
    id: uuidv4(),
    partName: "Satınalmalar",
    partDescription: "Satınalma səhifəsinin bölməsi",
    partStatus: "Aktiv",
    to: "/purchase",
  },
  {
    id: uuidv4(),
    partName: "Əlaqə Səhifəsi (Ünvanlar)",
    partDescription: "Əlaqə səhifəsindəki dinamik lokasyonlar (ünvanlar) bölməsi",
    partStatus: "Aktiv",
    to: "/location",
  },
  {
    id: uuidv4(),
    partName: "Müraciətlər",
    partDescription: "Əlaqə səhifəsindən sizə müraciət edən şəxslərin tablo görüntüləri",
    partStatus: "Aktiv",
    to: "/appeals",
  },
];

const Hero: React.FC = () => {
  return (
    <section className="part">
      <div className="wrapper-contain">
        <Swiper
          breakpoints={{
            268: {
              spaceBetween: 12,
              slidesPerView: 1.3,
            },
            468: {
              slidesPerView: 1.7,
            },
            768: {
              slidesPerView: 2.2,
            },
            968: {
              slidesPerView: 3,
              spaceBetween: 30,
            }
          }}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper">
          {PartData.map((item: PartType) => (
            <SwiperSlide key={item.id}>
              <span className="status">
                Status: <strong>{item?.partStatus}</strong>
              </span>
              <div className="contain">
                <div className="title">
                  <h2>{item.partName}</h2>
                  <p>{item.partDescription}</p>
                </div>
                <div className="button">
                  <Link to={item.to ? item.to : ""}>Detallara get</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
