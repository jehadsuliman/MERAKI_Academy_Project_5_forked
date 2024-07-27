import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCategories,updateCategoriesById,deleteCategoriesById } from "../../Service/api/redux/reducers/categories/categories";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button';

const CategoriesList = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => {
    return {
      categories: state.categories.categories,
    };
  });
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
  const updateCategory = (id) => {
    axios
      .put(`http://localhost:5000/categories/${id}`,)
      .then((result) => {
        dispatch(updateCategoriesById({id}));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:5000/categories/${id}`)
      .then((result) => {
        dispatch(deleteCategoriesById(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Categories List</h1>
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
            <tr key={i}>
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
                {" "}
                <Button variant="danger" onClick={()=>deleteCategory(category.id)} >Delete</Button>
              </td>
              <td>
                {" "}
                <Button variant="success" onClick={()=>{updateCategory();}}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoriesList;
