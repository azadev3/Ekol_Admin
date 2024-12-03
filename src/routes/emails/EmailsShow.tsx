import React from "react";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { Option, toastMsg } from "../../App";

export interface EmailsInterface {
  _id: string;
  email: string;
}

const EmailsShow: React.FC = () => {
  // fetch appeals
  const [emailsdata, setEmails] = React.useState<EmailsInterface[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/emails`, Option());

      if (response.data) {
        setEmails(response.data?.emails);
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
    console.log(emailsdata);
  }, []);

  return (
    <div className="apply-vacation-show">
      <Title title="Abunəlik üçün Emaillər" description="" to="" />

      <div className="container-showed">
        {emailsdata && emailsdata?.length > 0
          ? emailsdata?.map((emails: EmailsInterface, i: number) => (
              <div
                key={emails?._id}
                className="email-content"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "12px",
                  backgroundColor: "#FAFAFA",
                  width: "100%",
                  padding: "16px 12px"
                }}>
                <div
                  className="list"
                  style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "6px" }}>
                  <li style={{ listStyleType: "none", fontSize: "18px", fontWeight: "600", padding: "0px 5px" }}>
                    {i + 1}
                  </li>
                  <span
                    style={{
                      color: "#303030",
                      fontSize: "18px",
                      fontWeight: "500",
                      borderLeft: "6px solid orange",
                      paddingLeft: "12px",
                    }}>
                    {emails?.email}
                  </span>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default EmailsShow;
