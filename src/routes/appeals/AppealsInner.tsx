import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppealsInterface } from "./AppealsShow";
import { URL } from "../../Base";
import Title from "../../uitils/Title";

const AppealsInner: React.FC = () => {
  const { inneridappeals } = useParams<{ inneridappeals: string }>();

  const navigate = useNavigate();

  // fetch appeals
  const [appealsdata, setAppeals] = React.useState<AppealsInterface[]>([]);
  const [innerAppeals, setInnerAppeals] = React.useState<AppealsInterface>();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/appealsfront`);

      if (response.data) {
        setAppeals(response.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (inneridappeals && appealsdata && appealsdata.length > 0) {
      const inner = appealsdata.find((item: AppealsInterface) => {
        return item._id.toString() === inneridappeals.toString();
      });

      setInnerAppeals(inner);
    }
  }, [appealsdata]);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="inner-vacation-apply">
      <button className="go-back" onClick={() => navigate("/appeals")}>
        Geri qayıt
      </button>
      <Title
        description="Müraciət edən şəxsin müraciətinin tam forması və göndərdiyi məlumatları aşağıdan ətraflı şəkildə analiz edə bilərsiniz."
        title="Müraciətin tam forması:"
        to=""
      />

      <div className="show-inner-area">
        <div className="apply-vac-name">
          <div className="field-area">
            <label>
              Müraciət edən <strong>Şəxsin Ad / Soyad:</strong>
            </label>
            <span>{innerAppeals?.name_surname}</span>
          </div>
        </div>
        <div className="grid-fields">
          <div className="field-area">
            <label>
              Müraciət edənin <strong>Email:</strong>
            </label>
            <span>{innerAppeals?.email}</span>
          </div>
          <div className="field-area">
            <label>
              Müraciət edənin <strong>Telefon Nömrəsi:</strong>
            </label>
            <span>
              {innerAppeals?.prefix}-{innerAppeals?.telephone}
            </span>
          </div>
          <div className="field-area">
            <label>
              Müraciət edənin <strong>Göndərdiyi Mesaj:</strong>
            </label>
            <p>{innerAppeals?.record}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppealsInner;
