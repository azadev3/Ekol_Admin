import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import { LoadingState } from "../hero/HeroShow";
import { useRecoilState } from "recoil";
import Loader from "../../Loader";

const BlogShow: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
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
      width: 350,
      renderCell: (params) => (
        <div className="buttons-grid">
          <button
            className="edit"
            onClick={() => navigate(`/blog/${params.row.id}`)} // Navigating to the edit page with the row's id
          >
            Düzəliş
          </button>
          <button
            className="delete"
            onClick={() => handleDelete(params.row.id)} // Handle the delete operation
          >
            Sil
          </button>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox" className="switch">
            Start
            <svg className="slider" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"></path>
            </svg>
          </label>
        </div>
      ),
    },
  ];

  // DELETE
  const handleDelete = async (id: any) => {
    try {
      const deleteitem = await axios.delete(`${URL}/blog/${id}`);
      if (deleteitem.data) {
        // Refresh data after deletion
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
      const response = await axios.get(`${URL}/blog`);
      const rowsWithId = response.data.map((item: any) => ({
        id: item._id,
        title_az: item.title?.az || "",
        title_en: item.title?.en || "",
        title_ru: item.title?.ru || "",
        description_az: item.description?.az || "",
        description_en: item.description?.en || "",
        description_ru: item.description?.ru || "",
      }));

      // Sort the rows by creation date or id, assuming latest entries have the highest id
      rowsWithId.sort((a: any, b: any) => b.id.localeCompare(a.id)); // or use a creation date field if available

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
          <Title description="Əlavə et, dəyişdir, sil." title="Xəbərlər" to="/blog/create" />
          <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default BlogShow;
