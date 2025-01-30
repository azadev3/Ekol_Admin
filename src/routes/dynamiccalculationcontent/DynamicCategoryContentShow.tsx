import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { atom, useRecoilState } from "recoil";
import { Option, toastMsg } from "../../App";

export const LoadingState = atom<boolean>({
    key: 'loadingStateKey',
    default: false,
});

const DynamicCategoryContentShow: React.FC = () => {

    const [content, setContent] = useState<[]>([]);

    const [loading, setLoading] = useRecoilState(LoadingState);

    const [rows, setRows] = useState<any[]>([]);

    const navigate = useNavigate();


    const getCategoryCalc = async () => {
        const response = await axios.get(`${URL}/dynamic-category-front`, {
            headers: {
                "Accept-Language": "az",
            },
        });
        if (response.data) {
            console.log(response.data, 'secilen data');
            setContent(response.data);
        }
    };

    useEffect(() => {
        getCategoryCalc();
    }, []);

    // COLUMNS
    const columns: GridColDef[] = [
        { field: "title_az", headerName: "Title AZ", width: 150 },
        { field: "title_en", headerName: "Title EN", width: 150 },
        { field: "title_ru", headerName: "Title RU", width: 150 },
        { field: "pdfaz", headerName: "PDF AZ", width: 200 },
        { field: "pdfen", headerName: "PDF EN", width: 200 },
        { field: "pdfru", headerName: "PDF RU", width: 200 },
        {
            field: "selected_category",
            headerName: "Seçilən hesabat kateqoriyası:",
            width: 950,
            renderCell: (params) => {
                const contents: any = content.find((content: any) => content._id === params.row.selected_category);
                return <span>{contents ? contents.title : "Kateqoriya tapilmadi"}</span>;
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
                        onClick={() => navigate(`/dynamic-category-content/${params.row.id}`)} // Navigating to the edit page with the row's id
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
            const deleteitem = await axios.delete(`${URL}/dynamic-category-content/${id}`, Option());
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
            const response = await axios.get(`${URL}/dynamic-category-content`, Option());
            const rowsWithId = response.data.map((item: any) => ({
                id: item._id,
                title_az: item.title?.az || "",
                title_en: item.title?.en || "",
                title_ru: item.title?.ru || "",
                pdfaz: item.pdf?.az || "",
                pdfen: item.pdf?.en || "",
                pdfru: item.pdf?.ru || "",
                selected_category: item.selected_category || "",
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
                    <Title description="Əlavə et, dəyişdir, sil." title="Hesabatlar" to="/dynamic-category-content/create" />
                    <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
                        <DataGrid columns={columns} rows={rows} />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default DynamicCategoryContentShow;
