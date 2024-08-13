import axios from "axios";
import { URL } from "./Base";

export function imageHandler(this: any) { 
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("richImg", file);

      try {
        const uploadResponse = await axios.post(`${URL}/uploadForEditor`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const savedData = uploadResponse.data.data;

        const urlResponse = await axios.get(`${URL}/getImageUrl`, {
          params: { id: savedData._id },
        });

        const imageUrl = urlResponse.data.data.find((item:any) => item._id === savedData._id)?.url;

        const quill = this.quill;
        if (quill && imageUrl) {
          const range = quill.getSelection();
          if (range) {
            quill.insertEmbed(range.index, "image", `https://ekol-server-1.onrender.com${imageUrl}`);
          }
        }
      } catch (error) {
        console.error("Image dont upload :PPP", error);
      }
    }
  };
}
