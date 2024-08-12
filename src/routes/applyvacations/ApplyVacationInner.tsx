import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApplyVacationTypes } from "./ApplyVacationShow";
import { URL } from "../../Base";
import Title from "../../uitils/Title";

const ApplyVacationInner: React.FC = () => {
  const { innerid } = useParams<{ innerid: string }>();

  const navigate = useNavigate();

  // fetch appeals
  const [applyVacations, setApplyVacations] = React.useState<ApplyVacationTypes[]>([]);
  const [innerApply, setInnerApply] = React.useState<ApplyVacationTypes>();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/applyvacation`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setApplyVacations(response.data?.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (innerid && applyVacations && applyVacations.length > 0) {
      const inner = applyVacations.find((item: ApplyVacationTypes) => {
        return item._id.toString() === innerid.toString();
      });

      setInnerApply(inner);
    }
  }, [applyVacations]);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="inner-vacation-apply">
      <button className="go-back" onClick={() => navigate("/applyvacations")}>Geri qayıt</button>
      <Title
        description="Müraciət edən şəxsin müraciətinin tam forması və göndərdiyi məlumatları aşağıdan ətraflı şəkildə analiz edə bilərsiniz."
        title="Müraciətin tam forması:"
        to=""
      />

      <div className="show-inner-area">
        <div className="apply-vac-name">
          <div className="field-area">
            <label>
              Müraciət olunan <strong>Vakansiya Adı:</strong>
            </label>
            <span>{innerApply?.apply_vacation_name}</span>
          </div>
        </div>
        <div className="grid-fields">
          <div className="field-area">
            <label>
              Müraciət edənin <strong>Adı:</strong>
            </label>
            <span>{innerApply?.name}</span>
          </div>
          <div className="field-area">
            <label>
              Müraciət edənin <strong>Soyadı:</strong>
            </label>
            <span>{innerApply?.surname}</span>
          </div>
          <div className="field-area">
            <label>
              Müraciət edənin <strong>Email Adresi:</strong>
            </label>
            <span>{innerApply?.email}</span>
          </div>
          <div className="field-area">
            <label>
              Müraciət edənin <strong>Telefon Nömrəsi:</strong>
            </label>
            <span>{innerApply?.telephone}</span>
          </div>

          <div className="field-area">
            <label>
              Müraciət edənin <strong>CV FORMASI:</strong>
            </label>
            <a
              className="show-cv-button"
              href={innerApply && innerApply.cv ? `https://ekol-server.onrender.com${innerApply.cv}` : "#"}
              target="_blank"
              rel="noopener noreferrer">
              {innerApply?.cv ? "CV Formasına Bax" : "CV Tapılmadı"}
            </a>
          </div>

          <div className="field-area">
            <label>
              Müraciət edənin <strong>Profili:</strong>
            </label>
            <a
              className="show-cv-button"
              href={innerApply && innerApply.profile ? `https://ekol-server.onrender.com${innerApply.profile}` : "#"}
              target="_blank"
              rel="noopener noreferrer">
              {innerApply?.cv ? "Profilə Bax" : "Profil Tapılmadı"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyVacationInner;
