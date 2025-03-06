import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import { LoadingState } from "../hero/HeroShow";
import { useRecoilState } from "recoil";
import Loader from "../../Loader";
import { Option, toastMsg } from "../../App";
import ImageResizeInformation from "../../ImageResizeInformation";

const NewBlogShow: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();


  const [status, setStatus] = React.useState<{ [key: string]: boolean }>({});

  const toggleStatus = async (id: string | number) => {
    const newStatus = !status[id];
    setStatus((prevStatus) => ({
      ...prevStatus,
      [id]: newStatus,
    }));

    try {
      await axios.put(`${URL}/newblog/status/${id}`, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error("Status güncellenirken hata oluştu:", error);
      setStatus((prevStatus) => ({
        ...prevStatus,
        [id]: !newStatus,
      }));
    }
  };

  // COLUMNS
  const columns: GridColDef[] = [
    { field: "title_az", headerName: "Title AZ", width: 150 },
    { field: "title_en", headerName: "Title EN", width: 150 },
    { field: "title_ru", headerName: "Title RU", width: 150 },
    { field: "description_az", headerName: "Description AZ", width: 200 },
    { field: "description_en", headerName: "Description EN", width: 200 },
    { field: "description_ru", headerName: "Description RU", width: 200 },
    { field: "slogan_az", headerName: "Slogan AZ", width: 200 },
    { field: "slogan_en", headerName: "Slogan EN", width: 200 },
    { field: "slogan_ru", headerName: "Slogan RU", width: 200 },
    { field: "created_at", headerName: "Yaranma tarixi", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div className="buttons-grid">
          <button
            className="edit"
            onClick={() => navigate(`/newblogs/${params.row.id}`)} // Navigating to the edit page with the row's id
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
            <span>{status[params.row.id] ? "Deaktiv et" : "Aktiv et"}</span>
          </div>
        </div>
      ),
    },
  ];

  // DELETE
  const handleDelete = async (id: any) => {
    try {
      const deleteitem = await axios.delete(`${URL}/newblogs/${id}`, Option());
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
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/newblogs`, Option());
      const rowsWithId = response.data.map((item: any) => ({
        id: item._id,
        title_az: item.title?.az || "",
        title_en: item.title?.en || "",
        title_ru: item.title?.ru || "",
        description_az: item.description?.az || "",
        description_en: item.description?.en || "",
        description_ru: item.description?.ru || "",
        slogan_az: item.slogan.az || "",
        slogan_en: item.slogan.en || "",
        slogan_ru: item.slogan.ru || "",
        created_at: item.created_at || "",
        status: item.status,
      }));

      const statusMap: any = {};
      rowsWithId.forEach((row: any) => {
        statusMap[row.id] = row.status;
      });
      setStatus(statusMap);

      rowsWithId.sort((a: any, b: any) => b.id.localeCompare(a.id));
      setRows(rowsWithId);

    } catch (error) {
      console.error("Error fetching data:", error);
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
      <ImageResizeInformation routeTitle='Bloqlar' sizeTitle='854 x 450' />
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Title description="Əlavə et, dəyişdir, sil." title="Bloqlar" to="/newblogs/create" />
          <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default NewBlogShow;
