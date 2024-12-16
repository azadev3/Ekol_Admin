import axios from 'axios';
import React, { ChangeEvent } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { URL } from '../../Base';

const AddEnterPrise: React.FC = () => {
 const [enterprises, setEnterprises] = React.useState<{ name: string }[]>([]);
 const [inputField, setInputField] = React.useState<boolean>(false);
 const [inputValue, setInputValue] = React.useState<string>('');

 const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
 };

 const handleAdd = () => {
  const someValue = enterprises?.some((data) => data.name.includes(inputValue));
  if (inputValue.trim() !== '' && !someValue) {
   setEnterprises((prevEnterprises) => [...prevEnterprises, { name: inputValue }]);
   setInputValue('');
   setInputField(true);
  } else if (someValue) {
   return alert('Bu müəssisə artıq əlavə olunub');
  }
 };

 const deleteAdded = (index: any) => {
  const filteredItems = enterprises?.filter((_, i) => {
   return i !== index;
  });

  setEnterprises(filteredItems);
 };

 type EnterpriseDB = {
  _id: string;
  name: [
   {
    _id: string;
    value: string;
   }
  ];
 };
 const [enterPriseOnDb, setEnterPriseOnDb] = React.useState<EnterpriseDB>();
 const handleGetEnterprises = async () => {
  try {
   const res = await axios.get(`${URL}/add-enterprise`, {
    headers: {
     'Content-Type': 'application/json',
    },
   });

   if (res.data) {
    setEnterPriseOnDb(res.data[0]);
   } else {
    console.log(res.status);
   }
  } catch (error) {
   console.log(error);
  }
 };

 const sendDatabase = async () => {
  try {
   const data = JSON.stringify(enterprises);
   const res = await axios.post(`${URL}/add-enterprise`, { data });
   if (res.data) {
    handleGetEnterprises();
    setEnterprises([]);
    toast.success('Müəssisələr əlavə olundu!', {
     position: 'top-center',
    });
   } else {
    console.log(res.status);
   }
  } catch (error) {
   console.log(error);
  }
 };

 const deleteOnDb = async (name: string) => {
  try {
   const res = await axios.delete(`${URL}/add-enterprise/${name}`, {
    headers: {
     'Content-Type': 'application/json',
    },
   });
   if (res.data) {
    toast.success('Uğurla silindi', {
     position: 'top-center',
    });
    handleGetEnterprises();
   }
  } catch (error) {
   console.log(error);
  }
 };

 React.useEffect(() => {
  handleGetEnterprises();
 }, []);

 return (
  <div className="add-enterprise">
   <button className="addenterprise" onClick={() => setInputField((prevField) => !prevField)}>
    Müəssisə adı əlavə et
   </button>
   <div className="enterprise-area">
    {enterprises?.map((data, index) => (
     <div className="data-field" key={index}>
      <p>{data.name}</p>
      <FaDeleteLeft className="del-icon" onClick={() => deleteAdded(index)} />
     </div>
    ))}
   </div>
   <div className={`input-area ${inputField ? 'actived' : ''}`}>
    <input
     value={inputValue}
     onChange={handleInputChange}
     type="text"
     placeholder="Müəssisənin adını əlavə et"
     name="enterprise_name"
    />
    <button type="button" className="add-btn" onClick={handleAdd}>
     Əlavə et
    </button>
   </div>

   {enterprises?.length > 0 && (
    <button type="button" onClick={sendDatabase} className="send-btn">
     Göndər
    </button>
   )}

   <div
    className="existing-enterprises"
    style={{ display: enterPriseOnDb && enterPriseOnDb?.name?.length > 0 ? 'flex' : 'none' }}>
    <h2>Mövcud müəssisə adları:</h2>
    {enterPriseOnDb && enterPriseOnDb?.name?.length > 0
     ? enterPriseOnDb?.name?.map((names, i: number) => (
        <div key={i} className="item">
         <p>{names?.value || ''}</p>
         <MdOutlineDelete className="delete-icon-db" onClick={() => deleteOnDb(names?._id)} />
        </div>
       ))
     : null}
   </div>
  </div>
 );
};

export default AddEnterPrise;
