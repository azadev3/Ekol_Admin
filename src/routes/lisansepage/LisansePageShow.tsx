import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";

const LisansePageShow: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();

  // COLUMNS
  const columns: GridColDef[] = [
    { field: "title_az", headerName: "Title AZ", width: 150 },
    { field: "title_en", headerName: "Title EN", width: 150 },
    { field: "title_ru", headerName: "Title RU", width: 150 },
    { field: "description_az", headerName: "Description AZ", width: 200 },
    { field: "description_en", headerName: "Description EN", width: 200 },
    { field: "description_ru", headerName: "Description RU", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="buttons-grid">
          <button
            className="edit"
            onClick={() => navigate(`/lisansepage/${params.row.id}`)} // Navigating to the edit page with the row's id
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
      const deleteitem = await axios.delete(`${URL}/lisansepage/${id}`);
      if (deleteitem.data) {
        console.log(deleteitem.data);
        window.location.reload();
      } else {
        console.log(deleteitem.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/lisansepage`);
        const rowsWithId = response.data.map((item: any) => ({
          id: item._id,
          title_az: item.title?.az || "",
          title_en: item.title?.en || "",
          title_ru: item.title?.ru || "",
          description_az: item.description?.az || "",
          description_en: item.description?.en || "",
          description_ru: item.description?.ru || "",
        }));
        setRows(rowsWithId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="show-component">
      <Title description="Əlavə et, dəyişdir, sil." title="Lisenziyalar" to="/lisansepage/create" />
      <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default LisansePageShow;
