import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreatUpload = () => {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");

  //create product:
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/upload/create-upload`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="">
      <h1>Create Uploads</h1>
      <div className="m-1 w-75">
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>

        <div className="mb-3">
          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt={photo.name}
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={name}
            placeholder="write a name "
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleCreate}>
            CREATE UPLOAD
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatUpload;
