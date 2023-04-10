import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./ProductsAdminSide.css"

function ProductsAdminSide() {
  const [getProducts, setProducts] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    const res = await axios.get('http://localhost:8000/product/getdataall')
    setProducts(res.data);
  }
  const handelChange = async (e) => {
    const res = await axios.get('http://localhost:8000/product/searchProduct/' + e.target.value);
    setProducts(res.data);
  }
  const deleteProduct = async (id) => {
    await axios.post("http://localhost:8000/product/deleteProduct" + id)
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-12 col-xl-10">
          <div className="card">
            <div className="card-header p-3">
              <h5 className="mb-0"><i className="fas fa-tasks me-2"></i>product List</h5>
            </div>
            <div className="d-flex justify-content-end align-items-center  pt-2 pb-3 pr-5">
              <p className="small mb-0 me-2 text-muted">Filter</p>
              <select className="select" onChange={handelChange} >
                <option value="1">All</option>
                <option value="men">Men</option>
                <option value="women">women</option>
                <option value="hat">Hat</option>
                <option value="jackets">jackets</option>
                <option value="kurta">kurta</option>
                <option value="pant">pant</option>
                <option value="perfume">perfume</option>
                <option value="sneakers">sneakers</option>
                <option value="tees">tees</option>
              </select>&nbsp; &nbsp;
              <button className="btn btn-primary" onClick={() => navigate('/addproduct')}>Add Product</button>

            </div>
            <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "50rem" }}>

              <table className="table mb-0">
                <thead>
                  <tr>
                    <th >Product</th>
                    <th >price</th>
                    <th >Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className='scrollbar'>
                  {getProducts.map((val, ind) => {
                    return (
                      <tr kay={ind} className="fw-normal">
                        <td><img src={`../img/${val.product_image}`} alt={`../img/${val.product_image}`} className="img-fluid t-img" />{val.name}</td>
                        <td>{val.price}</td>
                        <td>120</td>
                        <td>&nbsp; <span className="fas fa-trash-alt text-danger" onClick={() => deleteProduct(val.id)}></span>&nbsp;&nbsp;&nbsp;
                          <span className="fa fa-edit text-primery" onClick={() => navigate("/addproduct/edit/" + val.id)}></span></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default ProductsAdminSide;
