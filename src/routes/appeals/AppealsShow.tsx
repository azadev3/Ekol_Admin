import React from "react";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import { Option, OptionWithFormData, toastMsg } from "../../App";

export interface AppealsInterface {
  _id: string;
  email: string;
  name_surname: string,
  telephone: string,
  prefix: string,
  record: string,
}

const AppealsShow: React.FC = () => {
  // fetch appeals
  const [appealsdata, setAppeals] = React.useState<AppealsInterface[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/appealsfront`, OptionWithFormData());

      if (response.data) {
        setAppeals(response.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      toastMsg();
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
        const response = await axios.delete(`${URL}/appeals/${selectedId}`, Option());
        if (response.data) {
          console.log(response.data, 'muracietler')
          setAppeals(appealsdata.filter((item) => item._id !== selectedId));
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
        toastMsg();
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
        title="Müraciət edən şəxslər (Əlaqə səhifəsi)"
        description="Əlaqə səhifəsindən sizinlə əlaqə üçün müraciət edən şəxslərin siyahısını görüntüləyir"
        to=""
      />

      <div className="container-showed">
        {appealsdata && appealsdata.length > 0
          ? appealsdata.map((item: AppealsInterface) => (
              <div key={item._id} className="card-apply-vacation">
                <div className="left">
                  <div className="profile">
                    <img
                      src="/profileuser.svg"
                      alt="userprofile"
                      title="Profil"
                    />
                  </div>
                  <div className="user-information">
                    <h3 title="Ad və Soyad">
                      {item?.name_surname}
                    </h3>
                    <span title="Email" className="email">
                      {item?.email}
                    </span>
                    <div className="texts">
                         <span>Mesaj: </span>
                      <p>{item?.record}</p>
                    </div>
                  </div>
                </div>

                <div className="right">
                  <div className="buttons">
                    <button className="show-apply" onClick={() => navigate(`/appeals/${item._id.toString()}`)}>
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

export default AppealsShow;
