import axios from 'axios';
import React, { ChangeEvent } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { URL } from '../../Base';

const AddStage: React.FC = () => {
 const [stages, setStages] = React.useState<{ name: string }[]>([]);
 const [inputField, setInputField] = React.useState<boolean>(false);
 const [inputValue, setInputValue] = React.useState<string>('');

 const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
 };

 const handleAdd = () => {
  const someValue = stages?.some((data) => data.name.includes(inputValue));
  if (inputValue.trim() !== '' && !someValue) {
   setStages((prevStages) => [...prevStages, { name: inputValue }]);
   setInputValue('');
   setInputField(true);
  } else if (someValue) {
   return alert('Bu müəssisə artıq əlavə olunub');
  }
 };

 const deleteAdded = (index: any) => {
  const filteredItems = stages?.filter((_, i) => {
   return i !== index;
  });

  setStages(filteredItems);
 };

 type StageDb = {
  _id: string;
  name: [
   {
    _id: string;
    value: string;
   }
  ];
 };
 const [stageOnDb, setStageOnDb] = React.useState<StageDb>();
 const handleGetStages = async () => {
  try {
   const res = await axios.get(`${URL}/add-stage`, {
    headers: {
     'Content-Type': 'application/json',
    },
   });

   if (res.data) {
    setStageOnDb(res.data[0]);
   } else {
    console.log(res.status);
   }
  } catch (error) {
   console.log(error);
  }
 };

 const sendDatabase = async () => {
  try {
   const data = JSON.stringify(stages);
   const res = await axios.post(`${URL}/add-stage`, { data });
   if (res.data) {
    handleGetStages();
    setStages([]);
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
   const res = await axios.delete(`${URL}/add-stage/${name}`, {
    headers: {
     'Content-Type': 'application/json',
    },
   });
   if (res.data) {
    toast.success('Uğurla silindi', {
     position: 'top-center',
    });
    handleGetStages();
   }
  } catch (error) {
   console.log(error);
  }
 };

 React.useEffect(() => {
  handleGetStages();
 }, []);

 return (
  <div className="add-enterprise">
   <button className="addenterprise" onClick={() => setInputField((prevField) => !prevField)}>
    Mərhələ əlavə et
   </button>
   <div className="enterprise-area">
    {stages?.map((data, index) => (
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
     placeholder="Mərhələnin adını əlavə et"
     name="enterprise_name"
    />
    <button type="button" className="add-btn" onClick={handleAdd}>
     Əlavə et
    </button>
   </div>

   {stages?.length > 0 && (
    <button type="button" onClick={sendDatabase} className="send-btn">
     Göndər
    </button>
   )}

   <div className="existing-enterprises" style={{ display: stageOnDb && stageOnDb?.name?.length > 0 ? 'flex' : 'none' }}>
    <h2>Mövcud mərhələ adları:</h2>
    {stageOnDb && stageOnDb?.name?.length > 0
     ? stageOnDb?.name?.map((names, i: number) => (
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

export default AddStage;
