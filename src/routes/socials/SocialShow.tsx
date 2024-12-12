import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Title from '../../uitils/Title';
import axios from 'axios';
import { URL } from '../../Base';
import { useNavigate } from 'react-router-dom';
import { Option, toastMsg } from '../../App';

const SocialShow: React.FC = () => {
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
   await axios.put(`${URL}/socials/status/${id}`, { statusActive: newStatus });
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
  { field: 'link', headerName: 'URL', width: 800 },
  {
   field: 'actions',
   headerName: 'Actions',
   width: 300,
   renderCell: (params) => (
    <div className="buttons-grid">
     <button
      className="edit"
      onClick={() => navigate(`/socials/${params.row.id}`)} // Navigating to the edit page with the row's id
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
   const deleteitem = await axios.delete(`${URL}/socials/${id}`, Option());
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
   const response = await axios.get(`${URL}/socials`, Option());
   const rowsWithId = response.data.map((item: any) => ({
    id: item._id,
    link: item.link,
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
   <Title description="Əlavə et, dəyişdir, sil." title="Sosial Media" to="/socials/create" />
   <div style={{ height: '100%', width: '100%', marginTop: '24px' }}>
    <DataGrid columns={columns} rows={rows} />
   </div>
  </div>
 );
};

export default SocialShow;
