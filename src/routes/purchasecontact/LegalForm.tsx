import axios from "axios";
import React from "react";
import { URL } from "../../Base";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Loader from "../../Loader";

interface RequestData {
  _id: string;
  company: string;
  voen: string;
  name: string;
  surname: string;
  mobtel: string;
  worktel: string;
  email: string;
  other: string;
  country: string;
  job: string;
  location: string;
  enterprisename: string;
  enterpriseNameOrTel: string;
  enterprisepart: string;
  typeofrequest: string;
  requestpdf: string;
  message: string;
  isResponsible: string;
  namesecond: string;
  surnamesecond: string;
  mobtelsecond: string;
  worktelsecond: string;
  emailsecond: string;
  othersecond: string;
  __v: number;
}

const LegalForm: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = React.useState<{ [key: string]: boolean }>({});

  const [showModal, setShowModal] = React.useState<string | null>(null);
  const handleModal = (id: string | null) => {
    setShowModal(id);
  };

  const [data, setData] = React.useState<RequestData[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/legalformfront`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setData(response?.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoadingDelete((prev) => ({
      ...prev,
      [id]: true,
    }));
    try {
      const response = await axios.delete(`${URL}/deleteItem/${id}`);
      if (response.data) {
        console.log(response.data);
        fetchData();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDelete((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="legal-form">
      {data && data?.length > 0 ? (
        data?.map((data: RequestData) => (
          <article className="form-item-mini" key={data?._id}>
            <div className="left">
              <div className="profile">
                <img src="/pr.svg" alt="pr" />
              </div>
              <div className="name-area">
                <span className="name">{data?.name}</span>
                <span className="name">{data?.surname}</span>
                <span className="company">Şirkət adı: {data?.company}</span>
              </div>
            </div>
            <div className="right">
              <button onClick={() => handleModal(data?._id)}>Tam formada gör</button>
              <button onClick={() => handleDelete(data?._id)}>
                {loadingDelete[data?._id] ? "Silinir..." : "Müraciəti sil"}
              </button>
            </div>
          </article>
        ))
      ) : loading ? (
        <Loader />
      ) : (
        ""
      )}

      {/* show modal */}
      {data &&
        data?.length > 0 &&
        data?.map((data: RequestData) => {
          if (showModal === data._id) {
            return (
              <div className="modal-for-all-data" key={data?._id}>
                <div className="modal-content">
                  <IoClose className="close" onClick={() => setShowModal("")} />
                  <h2>
                    <span>{data?._id}</span> nömrəli formun doldurulan məlumatları:
                  </h2>
                  <div className="informations">
                    <section className="field">
                      <div className="input-field">
                        <label>Şirkətin adı</label>
                        <input type="text" readOnly value={data?.company} />
                      </div>
                      <div className="input-field">
                        <label>VÖEN</label>
                        <input type="text" readOnly value={data?.voen} />
                      </div>
                    </section>
                    <section className="field">
                      <div className="input-field">
                        <label>Müraciət edənin adı</label>
                        <input type="text" readOnly value={data?.name} />
                      </div>
                      <div className="input-field">
                        <label>Müraciət edənin soyadı</label>
                        <input type="text" readOnly value={data?.surname} />
                      </div>
                    </section>

                    <section className="field">
                      <div className="input-field">
                        <label>Mobil telefon nömrəsi </label>
                        <input type="text" readOnly value={data?.mobtel} />
                      </div>
                      <div className="input-field">
                        <label>İş telefon nömrəsi</label>
                        <input type="text" readOnly value={data?.worktel} />
                      </div>
                    </section>

                    <section className="field">
                      <div className="input-field">
                        <label>E-Poçt </label>
                        <input type="text" readOnly value={data?.email} />
                      </div>
                      <div className="input-field">
                        <label>Digər</label>
                        <input type="text" readOnly value={data?.other} />
                      </div>
                    </section>

                    <section className="field">
                      <div className="input-field">
                        <label>Ölkə</label>
                        <input type="text" readOnly value={data?.country} />
                      </div>
                      <div className="input-field">
                        <label>Vəzifə</label>
                        <input type="text" readOnly value={data?.job} />
                      </div>
                    </section>

                    <section className="field">
                      <div className="input-field">
                        <label>Ünvan</label>
                        <input type="text" readOnly value={data?.location} />
                      </div>
                    </section>

                    <section className="field">
                      <div className="input-field">
                        <label>Şirkət adına ikinci məsul şəxs ???</label>
                        <input
                          type="text"
                          readOnly
                          value={data?.isResponsible === "false" ? "Qeyd olunmayıb" : "Bəli"}
                        />
                      </div>
                    </section>

                    <section className="field">
                      <div className="input-field">
                        <label>Müəssisə</label>
                        <input type="text" readOnly value={data?.enterprisename} />
                      </div>
                      <div className="input-field">
                        <label>Müsabiqənin adı və ya nömrəsi</label>
                        <input type="text" readOnly value={data?.enterpriseNameOrTel} />
                      </div>
                    </section>

                    <section className="field">
                      <div className="input-field">
                        <label>Müsabiqə mərhələsi</label>
                        <input type="text" readOnly value={data?.enterprisepart} />
                      </div>
                      <div className="input-field">
                        <label>Müraciətin növü</label>
                        <input type="text" readOnly value={data?.typeofrequest} />
                      </div>
                      <div className="input-field">
                        <label>Müraciətlə bağlı sənəd</label>
                        <Link
                          style={{ fontSize: "18px", textWrap: "nowrap" }}
                          target="_blank"
                          to={`${URL.split("/api").join("")}${data?.requestpdf}`}>
                          {data?.requestpdf}
                        </Link>
                      </div>
                    </section>

                    <section className="field" style={{ height: "auto" }}>
                      <div className="input-field" style={{ height: "auto" }}>
                        <label>Mesaj</label>
                        <textarea style={{ height: "auto" }} readOnly value={data?.message}></textarea>
                      </div>
                    </section>

                    {data.isResponsible ? (
                      <div className="m-person">
                        <span>Məsul şəxsin məlumatları:</span>
                        <section className="field">
                          <div className="input-field">
                            <label>Məsul şəxs ad:</label>
                            <input type="text" readOnly value={data?.namesecond} />
                          </div>
                          <div className="input-field">
                            <label>Məsul şəxs soyad:</label>
                            <input type="text" readOnly value={data?.surnamesecond} />
                          </div>
                          <div className="input-field">
                            <label>Mobil telefon:</label>
                            <input type="text" readOnly value={data?.mobtelsecond} />
                          </div>
                          <div className="input-field">
                            <label>İş telefon:</label>
                            <input type="text" readOnly value={data?.worktelsecond} />
                          </div>
                          <div className="input-field">
                            <label>E-Poçt:</label>
                            <input type="text" readOnly value={data?.emailsecond} />
                          </div>
                          <div className="input-field">
                            <label>Digər:</label>
                            <input type="text" readOnly value={data?.othersecond} />
                          </div>
                        </section>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default LegalForm;
