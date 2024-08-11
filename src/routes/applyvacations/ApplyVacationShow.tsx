import React from "react";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";

export interface ApplyVacationTypes {
  _id: string;
  cv: string;
  email: string;
  name: string;
  profile: string;
  surname: string;
  telephone: string;
  apply_vacation_name: string;
  applyDate: string;
}

const ApplyVacationShow: React.FC = () => {
  // fetch appeals
  const [applyVacations, setApplyVacations] = React.useState<ApplyVacationTypes[]>([]);
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
    fetchData();
  }, []);

  const navigate = useNavigate();

  //delete apply vacation
  const [alert, setAlert] = React.useState<string>("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const handleDeleteModal = (_id: string) => {
    setSelectedId(_id);
    setAlert("opened");
  };

  //if click yes delete vacation apply
  const handleDelete = async () => {
    if (selectedId) {
      try {
        const response = await axios.delete(`${URL}/applyvacation/${selectedId}`);
        if (response.data) {
          setApplyVacations(applyVacations.filter((item) => item._id !== selectedId));
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
      setAlert("");
      setSelectedId(null);
    }
  };

  //close modal if outside clicked
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setAlert("");
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => document.removeEventListener("mousedown", outsideClicked);
  }, []);

  return (
    <div className="apply-vacation-show">
      <div className={`alert-overlay ${alert ? "active" : ""}`}>
        <div ref={modalRef} className="alert-modal">
          <span>Müraciəti silmək istədiyinizə əminsiniz?</span>
          <div className="buttons-for">
            <button onClick={handleDelete}>Müraciəti sil</button>
            <button onClick={() => setAlert("")}>Vazkeç</button>
          </div>
        </div>
      </div>
      <Title
        description="Saytda paylaşdığınız vakansiyalara daxil olan müraciətlərə baxa, silə yaxud müraciət edən şəxslə əlaqə saxlaya bilərsiniz."
        title="Vakansiyalarınıza daxil olan müraciətlər"
        to=""
      />

      <div className="container-showed">
        {applyVacations && applyVacations.length > 0
          ? applyVacations.map((item: ApplyVacationTypes) => (
              <div key={item._id} className="card-apply-vacation">
                <div className="left">
                  <div className="profile">
                    <img
                      src={item.profile ? `http://localhost:3000${item.profile}` : ""}
                      alt="userprofile"
                      title="Profil"
                    />
                  </div>
                  <div className="user-information">
                    <h3 title="Ad">
                      {item.name} {item.surname}
                    </h3>
                    <span title="Email" className="email">
                      {item.email}
                    </span>
                    <div className="texts">
                      <p>Müraciətin edildiyi tarix:</p>
                      <span className="date">{item.applyDate.split("-").join(".")}</span>
                    </div>
                  </div>
                </div>

                <div className="right">
                  <div className="buttons">
                    <button className="show-apply" onClick={() => navigate(`/applyvacations/${item._id.toString()}`)}>
                      Müraciəti görüntülə
                    </button>
                    <button className="remove-apply" onClick={() => handleDeleteModal(item._id)}>
                      Müraciəti sil
                    </button>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default ApplyVacationShow;
