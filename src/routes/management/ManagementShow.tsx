import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Title from '../../uitils/Title';
import axios from 'axios';
import { URL } from '../../Base';
import { useNavigate } from 'react-router-dom';
import { Option, toastMsg } from '../../App';

const ManagementShow: React.FC = () => {
 const [rows, setRows] = useState<any[]>([]);

 const navigate = useNavigate();
 const [statusActive, setStatusActive] = useState<{ [key: string]: boolean }>({});
 const toggleStatus = async (id: string | number) => {
  const newStatus = !statusActive[id];
  setStatusActive((prevStatus) => ({
   ...prevStatus,
   [id]: newStatus,
  }));

  try {
   await axios.put(`${URL}/management/status/${id}`, { statusActive: newStatus });
  } catch (error) {
   console.error('Status güncellenirken hata oluştu:', error);
   setStatusActive((prevStatus) => ({
    ...prevStatus,
    [id]: !newStatus,
   }));
  }
 };
 // COLUMNS
 const columns: GridColDef[] = [
  { field: 'nameSurname_az', headerName: 'Ad-Soyad (AZ)', width: 150 },
  { field: 'nameSurname_en', headerName: 'Ad-Soyad (EN)', width: 150 },
  { field: 'nameSurname_ru', headerName: 'Ad-Soyad (RU)', width: 150 },
  { field: 'job_az', headerName: 'Vəzifə (AZ)', width: 200 },
  { field: 'job_en', headerName: 'Vəzifə (EN)', width: 200 },
  { field: 'job_ru', headerName: 'Vəzifə (RU)', width: 200 },
  { field: 'education_az', headerName: 'Təhsil (AZ)', width: 200 },
  { field: 'education_en', headerName: 'Təhsil (EN)', width: 200 },
  { field: 'education_ru', headerName: 'Təhsil (RU)', width: 200 },
  { field: 'description_az', headerName: 'Açıqlama (AZ)', width: 200 },
  { field: 'description_en', headerName: 'Açıqlama (EN)', width: 200 },
  { field: 'description_ru', headerName: 'Açıqlama (RU)', width: 200 },
  {
   field: 'actions',
   headerName: 'Actions',
   width: 300,
   renderCell: (params) => (
    <div className="buttons-grid">
     <button
      className="edit"
      onClick={() => navigate(`/management/${params.row.id}`)} // Navigating to the edit page with the row's id
     >
      Düzəliş
     </button>
     <button
      className="delete"
      onClick={() => handleDelete(params.row.id)} // Handle the delete operation
     >
      Sil
     </button>
     <div className="toggle-status" onClick={() => toggleStatus(params?.row?.id)}>
      <span>{statusActive[params?.row?.id] ? 'Deaktiv et' : 'Aktiv et'}</span>
     </div>
    </div>
   ),
  },
 ];

 // DELETE
 const handleDelete = async (id: any) => {
  try {
   const deleteitem = await axios.delete(`${URL}/management/${id}`, Option());
   if (deleteitem.data) {
    fetchData();
   } else {
    console.log(deleteitem.status);
   }
  } catch (error) {
   toastMsg();
   console.log(error);
  }
 };

 // GET DATA
 const fetchData = async () => {
  try {
   const response = await axios.get(`${URL}/management`, Option());
   const rowsWithId = response.data.map((item: any) => ({
    id: item._id,
    nameSurname_az: item.nameSurname?.az || '',
    nameSurname_en: item.nameSurname?.en || '',
    nameSurname_ru: item.nameSurname?.ru || '',
    job_az: item.job?.az || '',
    job_en: item.job?.en || '',
    job_ru: item.job?.ru || '',
    education_az: item.education?.az || '',
    education_en: item.education?.en || '',
    education_ru: item.education?.ru || '',
    description_az: item.description?.az || '',
    description_en: item.description?.en || '',
    description_ru: item.description?.ru || '',
    statusActive: item.statusActive || '',
   }));
   setRows(rowsWithId);

   const initialStatusActive: { [key: string]: boolean } = {};
   response.data.forEach((item: any) => {
    initialStatusActive[item._id] = item.statusActive;
   });
   setStatusActive(initialStatusActive);
  } catch (error) {
   console.error('Error fetching data:', error);
  }
 };
 useEffect(() => {
  fetchData();
 }, []);

 return (
  <div className="show-component">
   <Title description="Əlavə et, dəyişdir, sil." title="Rəhbərlik" to="/management/create" />
   <div style={{ height: '100%', width: '100%', marginTop: '24px' }}>
    <DataGrid columns={columns} rows={rows} />
   </div>
  </div>
 );
};

export default ManagementShow;
