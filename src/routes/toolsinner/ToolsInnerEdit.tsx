import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert, Typography } from "@mui/material";
import axios from "axios";
import { URL } from "../../Base";
import Title from "../../uitils/Title";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ToolsInnerEdit: React.FC = () => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "align",
    "clean",
  ];
  const { editid } = useParams();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [title_az, setTitleAz] = useState("");
  const [title_en, setTitleEn] = useState("");
  const [title_ru, setTitleRu] = useState("");
  const [description_az, setDescriptionAz] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ru, setDescriptionRu] = useState("");

  // Fetch data
  useEffect(() => {
    if (editid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}/toolsinner/${editid}`);
          const data = response.data;
          console.log(data, "salam");
          setTitleAz(data.title.az || "");
          setTitleEn(data.title.en || "");
          setTitleRu(data.title.ru || "");
          setDescriptionAz(data.description.az || "");
          setDescriptionEn(data.description.en || "");
          setDescriptionRu(data.description.ru || "");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [editid]);

  // UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editid) return;

    const formData = new FormData();
    formData.append("title_az", title_az);
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("description_az", description_az);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    try {
      const response = await axios.put(`${URL}/toolsinner/${editid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setSnackbarMessage("Düzəliş uğurludur!");
      setOpenSnackbar(true);
      navigate("/toolsinner");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Düzəlişdə bir xəta oldu yenidən yoxlayın");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const [editorValue, setEditorValue] = useState<string>("");
  const [editorValueEn, setEditorValueEn] = useState<string>("");
  const [editorValueRu, setEditorValueRu] = useState<string>("");
  const quillRef = React.useRef<any>(null);
  const quillRefEn = React.useRef<any>(null);
  const quillRefRu = React.useRef<any>(null);

  const getEditorContent = () => {
    if (quillRef.current) {
      return quillRef.current.getEditor().root.innerHTML;
    }
    return "";
  };

  const getEditorContentEn = () => {
    if (quillRefEn.current) {
      return quillRefEn.current.getEditor().root.innerHTML;
    }
    return "";
  };

  const getEditorContentRu = () => {
    if (quillRefRu.current) {
      return quillRefRu.current.getEditor().root.innerHTML;
    }
    return "";
  };

  const handleAddContent = (content: string) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();

    if (range) {
      quill.clipboard.dangerouslyPasteHTML(range.index, content);
    } else {
      quill.root.innerHTML += content;
    }

    setEditorValue(getEditorContent());
  };

  const handleAddContentEn = (content: string) => {
    const quill = quillRefEn.current.getEditor();
    const range = quill.getSelection();

    if (range) {
      quill.clipboard.dangerouslyPasteHTML(range.index, content);
    } else {
      quill.root.innerHTML += content;
    }

    setEditorValue(getEditorContentEn());
  };

  const handleAddContentRu = (content: string) => {
    const quill = quillRefRu.current.getEditor();
    const range = quill.getSelection();

    if (range) {
      quill.clipboard.dangerouslyPasteHTML(range.index, content);
    } else {
      quill.root.innerHTML += content;
    }

    setEditorValue(getEditorContentRu());
  };

  const handleClick = (value: string) => {
    let content = "";
    switch (value) {
      case "m1":
        content = "m<sup>¹</sup>";
        break;
      case "m2":
        content = "m<sup>²</sup>";
        break;
      case "m3":
        content = "m<sup>³</sup>";
        break;
      case "CO2":
        content = "CO<sub>²</sub>";
        break;
      case "H2O":
        content = "H<sub>²</sub>O";
        break;
      case "NaCl":
        content = "NaCl";
        break;
      case "π":
        content = "π";
        break;
      default:
        content = "";
    }
    handleAddContent(content);
  };
  const handleClickEn = (value: string) => {
    let content = "";
    switch (value) {
      case "m1":
        content = "m<sup>¹</sup>";
        break;
      case "m2":
        content = "m<sup>²</sup>";
        break;
      case "m3":
        content = "m<sup>³</sup>";
        break;
      case "CO2":
        content = "CO<sub>²</sub>";
        break;
      case "H2O":
        content = "H<sub>²</sub>O";
        break;
      case "NaCl":
        content = "NaCl";
        break;
      case "π":
        content = "π";
        break;
      default:
        content = "";
    }
    handleAddContentEn(content);
  };
  const handleClickRu = (value: string) => {
    let content = "";
    switch (value) {
      case "m1":
        content = "m<sup>¹</sup>";
        break;
      case "m2":
        content = "m<sup>²</sup>";
        break;
      case "m3":
        content = "m<sup>³</sup>";
        break;
      case "CO2":
        content = "CO<sub>²</sub>";
        break;
      case "H2O":
        content = "H<sub>²</sub>O";
        break;
      case "NaCl":
        content = "NaCl";
        break;
      case "π":
        content = "π";
        break;
      default:
        content = "";
    }
    handleAddContentRu(content);
  };

  React.useEffect(() => {
    setDescriptionAz(editorValue); // Azerbaijani description
  }, [editorValue]);

  React.useEffect(() => {
    setDescriptionEn(editorValueEn); // English description
  }, [editorValueEn]);

  React.useEffect(() => {
    setDescriptionRu(editorValueRu); // Russian description
  }, [editorValueRu]);

  return (
    <div className="component-edit">
      <Title description="Dəyişiklik et" title="Avadanliqlar (daxili)" to="" />

      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
        <TextField
          required
          label="Başlıq(AZ)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title_az}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
          name="title_az"
        />

        <TextField
          required
          label="Başlıq(EN)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title_en}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
          name="title_en"
        />

        <TextField
          required
          label="Başlıq(RU)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title_ru}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
          name="title_ru"
        />

        <div className="math-process">
          <span className="custom-ql" onClick={() => handleClick("m1")}>
            m1
          </span>
          <span className="custom-ql" onClick={() => handleClick("m2")}>
            m2
          </span>
          <span className="custom-ql" onClick={() => handleClick("m3")}>
            m3
          </span>
          <span className="custom-ql" onClick={() => handleClick("CO2")}>
            CO2
          </span>
          <span className="custom-ql" onClick={() => handleClick("H2O")}>
            H2O
          </span>
          <span className="custom-ql" onClick={() => handleClick("NaCl")}>
            NaCl
          </span>
          <span className="custom-ql" onClick={() => handleClick("π")}>
            π
          </span>
        </div>
        <Typography variant="h6" gutterBottom>
          Açıqlama(AZ)
        </Typography>
        <ReactQuill value={editorValue || description_az} onChange={setEditorValue} ref={quillRef} modules={modules} formats={formats} />

        <div className="math-process">
          <span className="custom-ql" onClick={() => handleClickEn("m1")}>
            m1
          </span>
          <span className="custom-ql" onClick={() => handleClickEn("m2")}>
            m2
          </span>
          <span className="custom-ql" onClick={() => handleClickEn("m3")}>
            m3
          </span>
          <span className="custom-ql" onClick={() => handleClickEn("CO2")}>
            CO2
          </span>
          <span className="custom-ql" onClick={() => handleClickEn("H2O")}>
            H2O
          </span>
          <span className="custom-ql" onClick={() => handleClickEn("NaCl")}>
            NaCl
          </span>
          <span className="custom-ql" onClick={() => handleClickEn("π")}>
            π
          </span>
        </div>
        <Typography variant="h6" gutterBottom>
          Açıqlama(EN)
        </Typography>
        <ReactQuill
          value={editorValueEn || description_en}
          onChange={setEditorValueEn}
          ref={quillRefEn}
          modules={modules}
          formats={formats}
        />

        <div className="math-process">
          <span className="custom-ql" onClick={() => handleClickRu("m1")}>
            m1
          </span>
          <span className="custom-ql" onClick={() => handleClickRu("m2")}>
            m2
          </span>
          <span className="custom-ql" onClick={() => handleClickRu("m3")}>
            m3
          </span>
          <span className="custom-ql" onClick={() => handleClickRu("CO2")}>
            CO2
          </span>
          <span className="custom-ql" onClick={() => handleClickRu("H2O")}>
            H2O
          </span>
          <span className="custom-ql" onClick={() => handleClickRu("NaCl")}>
            NaCl
          </span>
          <span className="custom-ql" onClick={() => handleClickRu("π")}>
            π
          </span>
        </div>
        <Typography variant="h6" gutterBottom>
          Açıqlama(RU)
        </Typography>
        <ReactQuill
          value={editorValueRu || description_ru}
          ref={quillRefRu}
          onChange={setEditorValueRu}
          modules={modules}
          formats={formats}
        />

        <Button type="submit" variant="contained" color="success" style={{ marginTop: "16px", marginLeft: "24px" }}>
          Düzəliş et
        </Button>
      </form>

      {/* Snackbar for displaying messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: "100%", height: "50px" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ToolsInnerEdit;
