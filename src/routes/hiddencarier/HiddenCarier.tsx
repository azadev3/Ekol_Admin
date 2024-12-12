import axios from 'axios';
import React from 'react';
import { URL } from '../../Base';
import { toast, ToastContainer } from 'react-toastify';
import { Option, toastMsg } from '../../App';

const HiddenCarier: React.FC = () => {
 const [showCarier, setShowCarier] = React.useState<boolean>(false);

 const handleShow = async () => {
  const newShowState = !showCarier;
  setShowCarier(newShowState);

  try {
   const res = await axios.post(`${URL}/hidden-carier`, { show: newShowState });
   if (res.data) {
    console.log(res.data);
    toast.success('Məlumat müvəffəqiyyətlə yeniləndi', {
     position: 'top-center',
    });
   } else {
    toast.error('Məlumat sırasında bir xəta oldu', {
     position: 'top-center',
    });
   }
  } catch (error) {
   console.error('Veri gönderilirken bir hata oluştu:', error);
   toast.error('Məlumat sırasında bir xəta oldu', {
    position: 'top-center',
   });
  }
 };

 const handleCheck = async () => {
  try {
   const res = await axios.get(`${URL}/hidden-carier-front`, Option());
   if (res.data) {
    setShowCarier(res.data.showed);
    console.log('Güncel show durumu:', res.data.showed);
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
   <h2>Saytdakı Karyera imkanları bölməsini gizlət və ya göstər</h2>
   <div className="input-field-area">
    <h1>Karyera imkanları</h1>
    <button className="show-hidden-btn" onClick={handleShow}>
     {showCarier ? 'Gizlət' : 'Göstər'}
    </button>
   </div>
  </div>
 );
};

export default HiddenCarier;
