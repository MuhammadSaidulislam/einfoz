import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table } from "react-bootstrap"
import { addCategory, addSubCategory, getCategoryList, getSubCategoryList } from '../../../api/admin';
import { v4 as uuidv4 } from 'uuid';
import { showNotifications } from '../../../Function/toaster';
import { ToastContainer } from 'react-toastify';
import AdminNav from '../../../Component/AdminNav/AdminNav';

const AddOption = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [count, setCount] = useState(0);


  const categoryAdd = () => {
    let categoryInfo = {
      "id": uuidv4(),
      "category_name": category,
      "created_at": new Date()
    }
    addCategory(categoryInfo).then((data) => {
      setCategory("")
      showNotifications('success', data.message);
      setCount(count + 1)
    })
  }

  const subCategoryAdd = () => {
    let categoryInfo = {
      "id": uuidv4(),
      "sub_category": subCategory,
      "created_at": new Date()
    }
    addSubCategory(categoryInfo).then((data) => {
      setSubCategory("")
      showNotifications('success', data.message);
      setCount(count + 1)
    })
  }

  useEffect(() => {
    getCategoryList().then((data) => {
      setCategoryList(data);
    })
    getSubCategoryList().then((data) => {
      setSubCategoryList(data);
    })
  }, [count])

  return (
    <div>
    <AdminNav/>
      <ToastContainer />
      <Container>
        <Row>
          <Col md={6}>
            <h1>Category list</h1>
            <div class="input-group mb-3">
              <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" class="form-control" placeholder="Category" />
              <div class="input-group-append">
                <button class="btn btn-info" type="button" onClick={categoryAdd}>Add</button>
              </div>
            </div>
            <div className='categoriesList'>
               <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {categoryList.map((category,i) =>
                  <tr>
                    <td>{i+1}</td>
                    <td>{category.category}</td>
                    <td>X</td>
                  </tr>
                )}
                </tbody>
              </Table>
            </div>

          </Col>
          <Col md={6}>
            <h1>Sub-Category list</h1>
            <div class="input-group mb-3">
              <input value={subCategory} onChange={(e) => setSubCategory(e.target.value)} type="text" class="form-control" placeholder="Category" />
              <div class="input-group-append">
                <button class="btn btn-info" type="button" onClick={subCategoryAdd}>Add</button>
              </div>
            </div>
            <div className='categoriesList'>
            <Table striped bordered hover size="sm">
             <thead>
               <tr>
                 <th>#</th>
                 <th>Category Name</th>
                 <th>Action</th>
               </tr>
             </thead>
             <tbody>
             {SubCategoryList.map((category,i) =>
               <tr>
                 <td>{i+1}</td>
                 <td>{category.sub_category}</td>
                 <td>X</td>
               </tr>
             )}
             </tbody>
           </Table>
         </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddOption