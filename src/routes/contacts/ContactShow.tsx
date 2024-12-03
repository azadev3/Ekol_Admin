import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import Title from "../../uitils/Title";
import { useRecoilState } from "recoil";
import { LoadingState } from "../hero/HeroShow";
import Loader from "../../Loader";
import { Option, toastMsg } from "../../App";

const ContactShow: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();

  // COLUMNS
  const columns: GridColDef[] = [
    { field: "location_title_az", headerName: "Location Title AZ", width: 100 },
    { field: "location_title_en", headerName: "Location Title EN", width: 100 },
    { field: "location_title_ru", headerName: "Location Title RU", width: 100 },
    { field: "location_value", headerName: "Location Value", width: 100 },
    { field: "email_title_az", headerName: "Email Title AZ", width: 100 },
    { field: "email_title_en", headerName: "Email Title EN", width: 100 },
    { field: "email_title_ru", headerName: "Email Title RU", width: 100 },
    { field: "email_value", headerName: "Email Value", width: 50 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="buttons-grid">
          <button
            className="edit"
            onClick={() => navigate(`/contact/${params.row.id}`)} // Navigating to the edit page with the row's id
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
      const deleteitem = await axios.delete(`${URL}/contact/${id}`, Option());
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
      const response = await axios.get(`${URL}/contact`, Option());
      const rowsWithId = response.data.map((item: any) => ({
        id: item._id,
        location_title_az: item.location?.title?.az || "",
        location_title_en: item.location?.title?.en || "",
        location_title_ru: item.location?.title?.ru || "",
        location_value: item.location?.value || "",
        email_title_az: item.email?.title?.az || "",
        email_title_en: item.email?.title?.en || "",
        email_title_ru: item.email?.title?.ru || "",
        email_value: item.email?.value || "",
        iframe: item.iframe || "",
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
          <Title description="Əlavə et, dəyişdir, sil." title="Əlaqə Məlumatları" to="/contact/create" />
          <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ContactShow;
