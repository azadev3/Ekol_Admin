import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { atom, useRecoilState } from "recoil";

export const LoadingState = atom<boolean>({
  key: 'loadingStateKey', 
  default: false,
});

const YearlyCalculationsShow: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();

  // COLUMNS
  const columns: GridColDef[] = [
    { field: "title_az", headerName: "Title AZ", width: 150 },
    { field: "title_en", headerName: "Title EN", width: 150 },
    { field: "title_ru", headerName: "Title RU", width: 150 },
    { field: "pdf", headerName: "PDF", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="buttons-grid">
          <button
            className="edit"
            onClick={() => navigate(`/yearly_calculations/${params.row.id}`)} // Navigating to the edit page with the row's id
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
      const deleteitem = await axios.delete(`${URL}/yearly_calculations/${id}`);
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
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/yearly_calculations`);
        const rowsWithId = response.data.map((item: any) => ({
          id: item._id,
          title_az: item.title?.az || "",
          title_en: item.title?.en || "",
          title_ru: item.title?.ru || "",
          pdf: item.pdf || "",
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

    fetchData();
  }, []);

  return (
    <div className="show-component">
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Title description="Əlavə et, dəyişdir, sil." title="İllik Hesabatlar" to="/yearly_calculations/create" />
          <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default YearlyCalculationsShow;
