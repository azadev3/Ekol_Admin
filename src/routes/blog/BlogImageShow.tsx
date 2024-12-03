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

const BlogImageShow: React.FC = () => {
  const [blogs, setBlogs] = useState<[]>([]);
  const [_, setBlogImages] = useState<[]>([]);
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    const response = await axios.get(`${URL}/blogfront`, {
      headers: {
        "Accept-Language": "az",
      },
    });
    if (response.data) {
      setBlogs(response.data);
    }
  };

  const getBlogImages = async () => {
    const response = await axios.get(`${URL}/blogimagefront`, {
      headers: {
        "Accept-Language": "az",
      },
    });
    if (response.data) {
      setBlogImages(response.data);
    }
  };

  useEffect(() => {
    getBlogs();
    getBlogImages();
  }, []);

  // COLUMNS
  const columns: GridColDef[] = [
    {
      field: "selected_blog",
      headerName: "Seçilən xəbər:",
      width: 950,
      renderCell: (params) => {
        const blog:any = blogs.find((blog: any) => blog._id === params.row.selected_blog);
        return <span>{blog ? blog.title : "Blog tapilmadi"}</span>;
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
            onClick={() => navigate(`/blogimage/${params.row.id}`)}
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

  // DELETE
  const handleDelete = async (id: any) => {
    try {
      const deleteitem = await axios.delete(`${URL}/blogimage/${id}`, Option());
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
      const response = await axios.get(`${URL}/blogimage`, Option());
      const rowsWithId = response.data.map((item: any) => ({
        id: item._id,
        selected_blog: item.selected_blog, // Directly using the ID
        imgback: item.imgback,
      }));

      // Sort the rows by ID (or another creation date field if available)
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
  }, [blogs]); // Dependency array updated to re-fetch when blogs change

  return (
    <div className="show-component">
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Title description="Əlavə et, dəyişdir, sil." title="Xəbərlər" to="/blogimage/create" />
          <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default BlogImageShow;
