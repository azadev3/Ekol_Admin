import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Title from '../../uitils/Title';
import axios from 'axios';
import { URL } from '../../Base';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
import { atom, useRecoilState } from 'recoil';
import { Option, toastMsg } from '../../App';
import ImageResizeInformation from '../../ImageResizeInformation';

export const LoadingState = atom<boolean>({
 key: 'loadingStateKey',
 default: false,
});

const HeroShow: React.FC = () => {
 const [loading, setLoading] = useRecoilState(LoadingState);

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
   await axios.put(`${URL}/hero/status/${id}`, { statusActive: newStatus });
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
  { field: 'title_az', headerName: 'Title AZ', width: 150 },
  { field: 'title_en', headerName: 'Title EN', width: 150 },
  { field: 'title_ru', headerName: 'Title RU', width: 150 },
  { field: 'description_az', headerName: 'Description AZ', width: 200 },
  { field: 'description_en', headerName: 'Description EN', width: 200 },
  { field: 'description_ru', headerName: 'Description RU', width: 200 },
  { field: 'status', headerName: 'Status', width: 80 },
  {
   field: 'actions',
   headerName: 'Actions',
   width: 300,
   renderCell: (params) => (
    <div className="buttons-grid">
     <button
      className="edit"
      onClick={() => navigate(`/hero/${params.row.id}`)} // Navigating to the edit page with the row's id
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
   const deleteitem = await axios.delete(`${URL}/hero/${id}`, Option());
   if (deleteitem.data) {
    fetchData();
   } else {
    console.log(deleteitem.status);
   }
  } catch (error) {
   console.log(error);
   toastMsg();
  }
 };

 // GET DATA
 const fetchData = async () => {
  setLoading(true);
  try {
   const response = await axios.get(`${URL}/hero`, Option());
   const rowsWithId = response.data.map((item: any) => ({
    id: item._id,
    title_az: item.title?.az || '',
    title_en: item.title?.en || '',
    title_ru: item.title?.ru || '',
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
  } finally {
   const timeout = setTimeout(() => {
    setLoading(false);
   }, 500);
   return () => clearTimeout(timeout);
  }
 };

 useEffect(() => {
  fetchData();
 }, []);

 return (
  <div className="show-component">
  <ImageResizeInformation routeTitle='Hero' sizeTitle='1440 x 600' />
  <ImageResizeInformation routeTitle='Mobil hero' sizeTitle='500 x 500 və ya 400 x 400' />
   {loading ? (
    <Loader />
   ) : (
    <React.Fragment>
     <Title description="Əlavə et, dəyişdir, sil." title="Hero" to="/hero/create" />
     <div style={{ height: '100%', width: '100%', marginTop: '24px' }}>
      <DataGrid columns={columns} rows={rows} />
     </div>
    </React.Fragment>
   )}
  </div>
 );
};

export default HeroShow;
