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

const ToolsInnerImagesShow: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    const response = await axios.get(`${URL}/toolsinnerfront`, {
      headers: {
        "Accept-Language": "az",
      },
    });
    if (response.data) {
      setBlogs(response.data);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "selected_tools",
      headerName: "Seçilən avadanlıq:",
      width: 900,
      renderCell: (params) => {
        const blog = blogs.find((blog: any) => blog._id === params.row.selected_tools);
        return <span>{blog ? blog.title : "Avadanlıq tapılmadı"}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="buttons-grid">
          <button
            className="edit"
            onClick={() => navigate(`/toolsinnerimages/${params.row.id}`)}
          >
            Düzəliş
          </button>
          <button
            className="delete"
            onClick={() => handleDelete(params.row.id)}
          >
            Sil
          </button>
        </div>
      ),
    },
  ];

  // DELETE FONKSİYONU
  const handleDelete = async (id: any) => {
    try {
      const deleteitem = await axios.delete(`${URL}/toolsinnerimages/${id}`, Option());
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

  // DATA FETCH
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/toolsinnerimages`, Option());
      const rowsWithId = response.data.map((item: any) => ({
        ...item,
        id: item._id,
      }));
      setRows(rowsWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    getBlogs();
  }, []);

  return (
    <div className="show-component">
      <ImageResizeInformation routeTitle='Avadanliqlar' sizeTitle='376 x 272' />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Title
            description="Əlavə et, dəyişdir, sil."
            title="Avadanlıqlar şəkil yüklə"
            to="/toolsinnerimages/create"
          />
          <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </>
      )}
    </div>
  );
};

export default ToolsInnerImagesShow;
