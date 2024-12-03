import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import { Option, toastMsg } from "../../App";

const LogoShow: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();

  // COLUMNS
  const columns: GridColDef[] = [
    { field: "logo", headerName: "Logo", width: 350 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="buttons-grid">
          <button
            className="edit"
            onClick={() => navigate(`/logo/${params.row.id}`)} // Navigating to the edit page with the row's id
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
      const deleteitem = await axios.delete(`${URL}/logo/${id}`, Option());
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
    try {
      const response = await axios.get(`${URL}/logo`, Option());
      const rowsWithId = response.data.map((item: any) => ({
        id: item._id,
        logo: item.logo,
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
      <Title description="Əlavə et, dəyişdir, sil." title="Loqo" to="/logo/create" />
      <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default LogoShow;
