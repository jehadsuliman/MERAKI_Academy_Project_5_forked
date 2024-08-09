import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCategories, updateCategoriesById, deleteCategoriesById } from "../../Service/api/redux/reducers/categories/categories";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button';
import { Modal, Form, Input, Upload, message, Card, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [form] = Form.useForm();
  
  const { categories } = useSelector((state) => ({
    categories: state.categories.categories,
  }));

  const getAllCategories = () => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => {
        dispatch(setCategories(result.data.categories));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCategory = async (values) => {
    const { name, image } = values;
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) {
        formData.append('image', image.file.originFileObj);
      }
      
      await axios.put(`http://localhost:5000/categories/${currentCategory.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      dispatch(updateCategoriesById({
        id: currentCategory.id,
        name: name,
        image: image?.file?.response?.url || currentCategory.image, // Adjust based on your response structure
      }));
      setShowModal(false);
      message.success('Category updated successfully');
    } catch (err) {
      console.log(err);
      message.error('Failed to update category');
    }
  };

  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:5000/categories/${id}`)
      .then(() => {
        dispatch(deleteCategoriesById(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowModal = (category) => {
    setCurrentCategory(category);
    form.setFieldsValue({
      name: category.name,
      image: null
    });
    setShowModal(true);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const uploadProps = {
    name: "file",
    multiple: false,
    action: "https://api.cloudinary.com/v1_1/das0e3reo/image/upload",
    data: {
      upload_preset: "khaledOdehCloud",
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        form.setFieldsValue({ image: info.file });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="container mt-3">
      <h3 className="mb-4">Categories List</h3>
      <Table responsive className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">Category Image</th>
            <th scope="col">Category Name</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, i) => (
            <tr key={category.id}>
              <th scope="row">{i + 1}</th>
              <td>
                <Image
                  src={category.image}
                  className="img-fluid"
                  alt="category image"
                  rounded
                  style={{ width: "75px", height: "auto" }}
                />
              </td>
              <td>{category.name}</td>
              <td>
                <Button variant="danger" onClick={() => deleteCategory(category.id)}>Delete</Button>
              </td>
              <td>
                <Button variant="success" onClick={() => handleShowModal(category)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        title="Update Category"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={updateCategory}
        >
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please enter the category name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Category Image"
            valuePropName="file"
          >
            <Upload.Dragger {...uploadProps} listType="picture" showUploadList={false}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
              </p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesList;
