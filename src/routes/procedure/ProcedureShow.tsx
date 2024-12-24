import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Title from "../../uitils/Title";
import axios from "axios";
import { URL } from "../../Base";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoadingState } from "../hero/HeroShow";
import Loader from "../../Loader";
import { Option, toastMsg } from "../../App";

const ProcedureShow: React.FC = () => {
    const [loading, setLoading] = useRecoilState(LoadingState);
    const [rows, setRows] = useState<any[]>([]);
    const navigate = useNavigate();
    const [statusActive, setStatusActive] = useState<{ [key: string]: boolean }>({});

    const toggleStatus = async (id: string | number) => {
        const newStatus = !statusActive[id];
        setStatusActive((prevStatus) => ({
            ...prevStatus,
            [id]: newStatus,
        }));

        try {
            await axios.put(`${URL}/procedure/status/${id}`, { statusActive: newStatus });
        } catch (error) {
            console.error("Status güncellenirken hata oluştu:", error);
            setStatusActive((prevStatus) => ({
                ...prevStatus,
                [id]: !newStatus,
            }));
        }
    };

    // COLUMNS
    const columns: GridColDef[] = [
        { field: "status", headerName: "Status", width: 80 },
        { field: "pdf", headerName: "PDF", width: 200 },
    {
            field: "actions",
            headerName: "Actions",
            width: 300,
            renderCell: (params) => (
                <div className="buttons-grid">
                    <button
                        className="edit"
                        onClick={() => navigate(`/procedure/${params.row.id}`)}
                    >
                        Düzəliş
                    </button>
                    <button
                        className="delete"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Sil
                    </button>
                    <div className="toggle-status" onClick={() => toggleStatus(params?.row?.id)}>
                        <span>{statusActive[params?.row?.id] ? "Deaktiv et" : "Aktiv et"}</span>
                    </div>
                </div>
            ),
        },
    ];

    // DELETE
    const handleDelete = async (id: any) => {
        try {
            const deleteitem = await axios.delete(`${URL}/procedure/${id}`, Option());
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
    // GET DATA
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${URL}/procedure`, Option());
            const rowsWithId = response.data
                .reverse()
                .map((item: any) => ({
                    id: item._id,
                    status: item.status || "",
                    pdf: item?.pdf,
                }));
            setRows(rowsWithId);

            const initialStatusActive: { [key: string]: boolean } = {};
            response.data.forEach((item: any) => {
                initialStatusActive[item._id] = item.statusActive;
            });
            setStatusActive(initialStatusActive);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
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
                    <Title description="Əlavə et, dəyişdir, sil." title="Şikayətlər proseduru" to="/procedure/create" />
                    <div style={{ height: "100%", width: "100%", marginTop: "24px" }}>
                        <DataGrid columns={columns} rows={rows} />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default ProcedureShow;
