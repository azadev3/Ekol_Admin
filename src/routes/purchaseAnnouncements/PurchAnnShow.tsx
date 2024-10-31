import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useRecoilState } from "recoil";
import { LoadingState } from "../hero/HeroShow";
import Loader from "../../Loader";

const PurchAnnShow: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();

  const [statusActive, setStatusActive] = React.useState<{ [key: string]: boolean }>({});

  const toggleStatus = async (id: string | number) => {
    const newStatus = !statusActive[id];
    setStatusActive((prevStatus) => ({
      ...prevStatus,
      [id]: newStatus,
    }));

    try {
      await axios.put(`${URL}/purch/status/${id}`, { statusActive: newStatus });
    } catch (error) {
      console.error("Status güncellenirken hata oluştu:", error);
      setStatusActive((prevStatus) => ({
        ...prevStatus,
        [id]: !newStatus,
      }));
    }
  };

  // COLUMNS
  const columns: GridColDef[] = [
    { field: "title_az", headerName: "Title AZ", width: 100 },
    { field: "title_en", headerName: "Title EN", width: 100 },
    { field: "title_ru", headerName: "Title RU", width: 100 },
    { field: "description_az", headerName: "Description AZ", width: 150 },
    { field: "description_en", headerName: "Description EN", width: 150 },
    { field: "description_ru", headerName: "Description RU", width: 150 },
    { field: "predmet_az", headerName: "Predmet AZ", width: 150 },
    { field: "predmet_en", headerName: "Predmet EN", width: 150 },
    { field: "predmet_ru", headerName: "Predmet RU", width: 150 },
    { field: "createdAt", headerName: "Dərc edilmə", width: 80 },
    { field: "end_date", headerName: "Bitiş tarixi", width: 80 },
    { field: "status", headerName: "Status", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div className="buttons-grid">
          <button
            className="edit"
            onClick={() => navigate(`/purchaseannouncement/${params.row.id}`)} // Navigating to the edit page with the row's id
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
            <span>{statusActive[params?.row?.id] ? "Deaktiv et" : "Aktiv et"}</span>
          </div>
        </div>
      ),
    },
  ];

  // DELETE
  const handleDelete = async (id: any) => {
    try {
      const deleteitem = await axios.delete(`${URL}/purchaseannouncement/${id}`);
      if (deleteitem.data) {
        fetchData();
      } else {
        console.log(deleteitem.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET DATA
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/purchaseannouncement`);
      const rowsWithId = response.data.map((item: any) => ({
        id: item._id,
        title_az: item.title?.az || "",
        title_en: item.title?.en || "",
        title_ru: item.title?.ru || "",
        description_az: item.description?.az || "",
        description_en: item.description?.en || "",
        description_ru: item.description?.ru || "",
        predmet_az: item.predmet?.az || "",
        predmet_en: item.predmet?.en || "",
        predmet_ru: item.predmet?.ru || "",
        end_date: item.end_date || "",
        createdAt: moment(item.createdAt).format("LLL") || "",
        status: item.status || "",
        statusActive: item.statusActive || "",
      }));
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
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Title description="Əlavə et, dəyişdir, sil." title="Satınalma Elanları" to="/purchaseannouncement/create" />
          <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PurchAnnShow;
