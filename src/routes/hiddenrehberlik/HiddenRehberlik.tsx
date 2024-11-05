import axios from "axios";
import React from "react";

const HiddenRehberlik: React.FC = () => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleShow = async () => {
    setShow((prev) => !prev);

    try {
      await axios.post("http://localhost:5000/hidden-rehberlik", { show: !show });
    } catch (error) {
      console.error("Veri gönderilirken bir hata oluştu:", error);
    }
  };

  return (
    <div className="hidden-show-container">
      <h2>Saytdakı Rəhbərlik bölməsini gizlət və ya göstər</h2>
      <div className="input-field-area">
        <h1>Rəhbərlik</h1>
        <button className="show-hidden-btn" onClick={handleShow}>
          {show ? "Gizlət" : "Göstər"}
        </button>
      </div>
    </div>
  );
};

export default HiddenRehberlik;
