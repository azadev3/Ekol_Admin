import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import { Option, toastMsg } from "../../App";

const VacationsShow: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();

  // COLUMNS
  const columns: GridColDef[] = [
    { field: "title_az", headerName: "Title AZ", width: 100 },
    { field: "title_en", headerName: "Title EN", width: 100 },
    { field: "title_ru", headerName: "Title RU", width: 100 },
    { field: "description_az", headerName: "Description AZ", width: 150 },
    { field: "description_en", headerName: "Description EN", width: 150 },
    { field: "description_ru", headerName: "Description RU", width: 150 },
    { field: "location_az", headerName: "Lokasyon AZ", width: 150 },
    { field: "location_en", headerName: "Lokasyon EN", width: 150 },
    { field: "location_ru", headerName: "Lokasyon RU", width: 150 },
    { field: "workRegime_az", headerName: "İş Rejimi AZ", width: 150 },
    { field: "workRegime_en", headerName: "İş Rejimi EN", width: 150 },
    { field: "workRegime_ru", headerName: "İş Rejimi RU", width: 150 },
    { field: "start_date", headerName: "Başlanğıc Tarixi", width: 150 },
    { field: "end_date", headerName: "Bitiş Tarixi", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="buttons-grid">
          <button
            className="edit"
            onClick={() => navigate(`/vacations/${params.row.id}`)} // Navigating to the edit page with the row's id
          >
            Düzəliş
          </button>
          <button
            className="delete"
            onClick={() => handleDelete(params.row.id)} // Handle the delete operation
          >
            Sil
          </button>
        </div>
      ),
    },
  ];

  // DELETE
  const handleDelete = async (id: any) => {
    try {
      const deleteitem = await axios.delete(`${URL}/vacations/${id}`, Option());
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
      const response = await axios.get(`${URL}/vacations`, Option());
      const rowsWithId = response.data.map((item: any) => ({
        id: item._id,
        title_az: item.title?.az || "",
        title_en: item.title?.en || "",
        title_ru: item.title?.ru || "",
        description_az: item.description?.az || "",
        description_en: item.description?.en || "",
        description_ru: item.description?.ru || "",
        location_az: item.location?.az || "",
        location_en: item.location?.en || "",
        location_ru: item.location?.ru || "",
        workRegime_az: item.workRegime?.az || "",
        workRegime_en: item.workRegime?.en || "",
        workRegime_ru: item.workRegime?.ru || "",
        start_date: item.startDate || "",
        end_date: item.endDate || "",
      }));
      setRows(rowsWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="show-component">
      <Title description="Əlavə et, dəyişdir, sil." title="Vakansiyalar" to="/vacations/create" />
      <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default VacationsShow;
