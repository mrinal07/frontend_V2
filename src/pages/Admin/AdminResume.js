import { Form, message } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ReloadData, showLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminResume() {
  //   const dispatch = useDispatch();
  const BASE_URL = `${process.env.REACT_APP_BASE_URL2}`;

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadFileName, setDownloadFileName] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", file);

    console.log(file);
    console.log(formData);

    try {
      const res = await axios.post(
        BASE_URL + "api/portfolio/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);

      setMessage("File uploaded successfully");
      setDownloadFileName(res.data.file.filename);
    } catch (error) {
      console.error(error);
      setMessage("File upload failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <br></br>
        <button type="submit">Upload PDF</button>
      </form>
      <br></br>
      <br></br>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminResume;
