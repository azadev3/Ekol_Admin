import axios from "axios";
import React from "react";
import { URL } from "../../Base";
import { toast, ToastContainer } from "react-toastify";
import { Option, toastMsg } from "../../App";

const HiddenMedia: React.FC = () => {
    const [showMedia, setShowMedia] = React.useState<boolean>(false);

    const handleShow = async () => {
        const newShowState = !showMedia;
        setShowMedia(newShowState);

        try {
            const res = await axios.post(`${URL}/hidden-media`, { show: newShowState });
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
            const res = await axios.get(`${URL}/hidden-media-front`, Option());
            if (res.data) {
                setShowMedia(res.data.showed);
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
            <h2>Saytdakı Media bölməsini gizlət və ya göstər</h2>
            <div className="input-field-area">
                <h1>Media</h1>
                <button className="show-hidden-btn" onClick={handleShow}>
                    {showMedia ? "Gizlət" : "Göstər"}
                </button>
            </div>
        </div>
    );
};

export default HiddenMedia;
