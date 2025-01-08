import axios from "axios";
import React from "react";
import { URL } from "../../Base";
import { toast, ToastContainer } from "react-toastify";
import { Option, toastMsg } from "../../App";

const HiddenOurWorksHome: React.FC = () => {
    const [showOurworkshome, setShowOurworkshome] = React.useState<boolean>(false);

    const handleShow = async () => {
        const newShowState = !showOurworkshome;
        setShowOurworkshome(newShowState);

        try {
            const res = await axios.post(`${URL}/hidden-ourworkshome`, { show: newShowState });
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
            const res = await axios.get(`${URL}/hidden-ourworkshome-front`, Option());
            if (res.data) {
                setShowOurworkshome(res.data.showed);
                console.log("Güncel show durumu:", res.data.showed);
            } else {
                console.log(res.status);
            }
        } catch (error) {
            toastMsg();
            console.log(error);
        }
    };

    React.useEffect(() => {
        handleCheck();
    }, []);

    return (
        <div className="hidden-show-container">
            <ToastContainer />
            <h2>Ana səhifədəki Gördüyümüz işlər bölməsini gizlət və ya göstər</h2>
            <div className="input-field-area">
                <h1>Gördüyümüz işlər ana səhifə</h1>
                <button className="show-hidden-btn" onClick={handleShow}>
                    {showOurworkshome ? "Gizlət" : "Göstər"}
                </button>
            </div>
        </div>
    );
};

export default HiddenOurWorksHome;
