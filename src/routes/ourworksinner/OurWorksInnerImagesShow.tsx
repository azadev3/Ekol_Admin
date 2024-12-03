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

const OurWorksInnerImagesShow: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();

  const [ourworks, setOurworks] = useState<[]>([]);
  const [_, setImgs] = useState<[]>([]);

  const getOurworks = async () => {
    const response = await axios.get(`${URL}/ourworksinnerfront`, {
      headers: {
        "Accept-Language": "az",
      },
    });
    if (response.data) {
      setOurworks(response.data);
    }
  };

  const getImgs = async () => {
    const response = await axios.get(`${URL}/ourworksimagesfront`, {
      headers: {
        "Accept-Language": "az",
      },
    });
    if (response.data) {
      setImgs(response.data);
    }
  };

  useEffect(() => {
    getImgs();
    getOurworks();
  }, []);

  // COLUMNS
  const columns: GridColDef[] = [
    {
      field: "selected_ourworks",
      headerName: "Seçilən:",
      width: 950,
      renderCell: (params) => {
        const img: any = ourworks.find((img: any) => img._id === params.row.selected_ourworks);
        return <span>{img ? img.title : "Tapilmadi"}</span>;
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
            onClick={() => navigate(`/ourworksimages/${params.row.id}`)} // Navigating to the edit page with the row's id
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
      const deleteitem = await axios.delete(`${URL}/ourworksimages/${id}`, Option());
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
      const response = await axios.get(`${URL}/ourworksimages`, Option());
      const rowsWithId = response.data.map((item: any) => ({
        id: item._id,
        selected_ourworks: item.selected_ourworks,
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
          <Title description="Əlavə et, dəyişdir, sil." title="Gördüyümüz işlər şəkil yüklə" to="/ourworksimages/create" />
          <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default OurWorksInnerImagesShow;
