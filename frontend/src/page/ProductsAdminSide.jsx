import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./ProductsAdminSide.css"

function ProductsAdminSide() {
  const [getProducts, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const getData = async () => {
    const res = await axios.get('http://localhost:8000/product/getdataall')
    setProducts(res.data);
  }
  const handelChange = async (e) => {
    if (e.target.value === "all") {
      setSearch('all');
      getData();
    } else {
      setSearch(e.target.value);
      const res = await axios.get('http://localhost:8000/product/searchProduct/' + e.target.value);
      setProducts(res.data);
    }
  }
  const deleteProduct = async (id) => {
    const deleteProduct = window.confirm("Do you want to delete the product?");
    if (deleteProduct) {
      await axios.post("http://localhost:8000/product/deleteProduct/" + id);
      window.location.reload(true)
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="card">
        <div className="card-header row d-flex p-3">
          <div className='d-flex col-6'>
            <i className="fas fa-tasks me-2"></i> <h5>product List</h5>
          </div>
          <div className="d-flex col-6 justify-content-end align-items-center  " style={{ position: 'absolute', right: "0px" }}>
            <p className="small mb-0 me-2 text-muted">Filter</p>
            <select className="select" onChange={handelChange} >
              <option value="all">All</option>
              <option value="men">Men</option>
              <option value="women">women</option>
              <option value="kids">Kids</option>
              <option value="hat">Hat</option>
              <option value="jackets">jackets</option>
              <option value="kurta">kurta</option>
              <option value="pant">pant</option>
              <option value="perfume">perfume</option>
              <option value="sneakers">sneakers</option>
              <option value="tees">tees</option>
            </select>&nbsp; &nbsp;
            <button className="btn btn-light" onClick={() => navigate('/addproduct')}>Add Product</button>
          </div>
        </div>
        <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "50rem" }}>
          <table className="table mb-0">
            <thead>
              <tr>
                <th >Product Image</th>
                <th >Name</th>
                <th >price</th>
                <th >Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='scrollbar'>
              {getProducts.map((val, ind) => {
                if ('all' === search.toLocaleLowerCase()) {
                  return (
                    <tr kay={ind} className="fw-normal">
                      <td>
                        <Link to={`/details/${val.id}`}>
                          <img src={`../img/${val.product_image}`} alt={`../img/${val.product_image}`} className="img-fluid t-img" />
                        </Link>
                      </td>
                      <td>{val.name}</td>
                      <td>{val.price}</td>
                      <td>120</td>
                      <td>&nbsp; <span className="fas fa-trash-alt text-danger" onClick={() => deleteProduct(val.id)}></span>&nbsp;&nbsp;&nbsp;
                        <span className="fa fa-edit text-primery" onClick={() => navigate("/addproduct/edit/" + val.id)}></span></td>
                    </tr>
                  )
                } else if (val.product_image.split('/')[0] === search.toLocaleLowerCase()) {
                  return (
                    <tr kay={ind} className="fw-normal">
                      <td>
                        <Link to={`/details/${val.id}`}>
                          <img src={`../img/${val.product_image}`} alt={`../img/${val.product_image}`} className="img-fluid t-img" />
                        </Link>
                      </td>
                      <td>{val.name}</td>
                      <td>{val.price}</td>
                      <td>120</td>
                      <td>&nbsp; <span className="fas fa-trash-alt text-danger" onClick={() => deleteProduct(val.id)}></span>&nbsp;&nbsp;&nbsp;
                        <span className="fa fa-edit text-primery" onClick={() => navigate("/addproduct/edit/" + val.id)}></span></td>
                    </tr>
                  )
                } else if (val.product_image.split('/')[1] === search.toLocaleLowerCase()) {
                  return (
                    <tr kay={ind} className="fw-normal">
                      <td>
                        <Link to={`/details/${val.id}`}>
                          <img src={`../img/${val.product_image}`} alt={`../img/${val.product_image}`} className="img-fluid t-img" />
                        </Link>
                      </td>
                      <td>{val.name}</td>
                      <td>{val.price}</td>
                      <td>120</td>
                      <td>&nbsp; <span className="fas fa-trash-alt text-danger" onClick={() => deleteProduct(val.id)}></span>&nbsp;&nbsp;&nbsp;
                        <span className="fa fa-edit text-primery" onClick={() => navigate("/addproduct/edit/" + val.id)}></span></td>
                    </tr>
                  )
                } else if (val.product_image.split('/')[2] === search.toLocaleLowerCase()) {
                  return (
                    <tr kay={ind} className="fw-normal">
                      <td>
                        <Link to={`/details/${val.id}`}>
                          <img src={`../img/${val.product_image}`} alt={`../img/${val.product_image}`} className="img-fluid t-img" />
                        </Link>
                      </td>
                      <td>{val.name}</td>
                      <td>{val.price}</td>
                      <td>120</td>
                      <td>&nbsp; <span className="fas fa-trash-alt text-danger" onClick={() => deleteProduct(val.id)}></span>&nbsp;&nbsp;&nbsp;
                        <span className="fa fa-edit text-primery" onClick={() => navigate("/addproduct/edit/" + val.id)}></span></td>
                    </tr>
                  )
                } else if (val.product_image.split('/')[3] === search.toLocaleLowerCase()) {
                  return (
                    <tr kay={ind} className="fw-normal">
                      <td>
                        <Link to={`/details/${val.id}`}>
                          <img src={`../img/${val.product_image}`} alt={`../img/${val.product_image}`} className="img-fluid t-img" />
                        </Link>
                      </td>
                      <td>{val.name}</td>
                      <td>{val.price}</td>
                      <td>120</td>
                      <td>&nbsp; <span className="fas fa-trash-alt text-danger" onClick={() => deleteProduct(val.id)}></span>&nbsp;&nbsp;&nbsp;
                        <span className="fa fa-edit text-primery" onClick={() => navigate("/addproduct/edit/" + val.id)}></span></td>
                    </tr>
                  )
                }
                else {
                  return <></>
                }
              })
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ProductsAdminSide;
