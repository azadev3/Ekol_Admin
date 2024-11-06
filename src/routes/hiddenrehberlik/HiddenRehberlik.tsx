import axios from "axios";
import React from "react";
import { URL } from "../../Base";
import { toast, ToastContainer } from "react-toastify";

const HiddenRehberlik: React.FC = () => {
  const [showRehberlik, setShowRehberlik] = React.useState<boolean>(false);

  const handleShow = async () => {
    const newShowState = !showRehberlik;
    setShowRehberlik(newShowState);

    try {
      const res = await axios.post(`${URL}/hidden-rehberlik`, { show: newShowState });
      if (res.data) {
        console.log(res.data);
        toast.success("Məlumat müvəffəqiyyətlə yeniləndi", {
          position: "top-center",
        });
      } else {
        toast.error("Məlumat sırasında bir xəta oldu", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Veri gönderilirken bir hata oluştu:", error);
      toast.error("Məlumat sırasında bir xəta oldu", {
        position: "top-center",
      });
    }
  };

  const handleCheck = async () => {
    try {
      const res = await axios.get(`${URL}/hidden-rehberlik-front`);
      if (res.data) {
        setShowRehberlik(res.data.showed);
        console.log("Güncel show durumu:", res.data.showed);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleCheck();
  }, []);

  return (
    <div className="hidden-show-container">
      <ToastContainer />
      <h2>Saytdakı Rəhbərlik bölməsini gizlət və ya göstər</h2>
      <div className="input-field-area">
        <h1>Rəhbərlik</h1>
        <button className="show-hidden-btn" onClick={handleShow}>
          {showRehberlik ? "Gizlət" : "Göstər"}
        </button>
      </div>
    </div>
  );
};

export default HiddenRehberlik;
