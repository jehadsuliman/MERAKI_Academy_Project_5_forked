import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Card, Space, Input, Button } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const { token, userId } = useSelector((state) => {
    return {
      token: state.userAuth.token,
      userId: state.userAuth.userId,
    };
  });
  const { Dragger } = Upload;
  const uploadPreset = "khaledOdehCloud";
  const props = {
    name: "file",
    multiple: false,
    action: "https://api.cloudinary.com/v1_1/das0e3reo/image/upload",
    data: {
      upload_preset: uploadPreset,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setImage(info.file.response.url);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const addNewCategory = () => {
    const categoryData = { name, image, user_id: userId };
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    axios
      .post(`http://localhost:5000/categories`, categoryData, header)
      .then((result) => {
        message.success("Category added successfully!");
      })
      .catch((err) => {
        message.error("Failed to add category.");
        console.log(err);
      });
  };

  return (
    <div className="container mt-3">
      <h3 className="mb-4">Add Category</h3>
      <Space direction="vertical" size={16}>
        <Card >
          <Input
            showCount
            maxLength={20}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Dragger {...props} style={{ marginTop: "16px" }} >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
          <Button
            type="primary"
            onClick={()=>{addNewCategory()}}
            disabled={!name || !image}
            style={{ marginTop: "16px" }}
          >
            Add Category
          </Button>
        </Card>{" "}
      </Space>
    </div>
  );
};

export default AddCategory;
