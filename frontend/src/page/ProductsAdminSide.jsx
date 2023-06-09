import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./ProductsAdminSide.css";
import DataTable from 'react-data-table-component';
function ProductsAdminSide() {
  const [getProducts, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
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
  const colums = [
    {
      name: <h4>Image</h4>,
      selector: (row) => <img className='img-fluid t-img' src={`../img/${row.product_image}`} alt="" />
    },
    {
      name: <h4>Name</h4>,
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: <h4>Price</h4>,
      selector: (row) => row.price
    },
    {
      name: <h4>Available</h4>,
      selector: (row) => row.id
    },
    {
      name: <h4>Action</h4>,
      // selector: (row) => row.id
      // &nbsp; <span className="fas fa-trash-alt text-danger" onClick={() => deleteProduct(val.id)}></span>&nbsp;&nbsp;&nbsp;
      // <span className="fa fa-edit text-primery" onClick={() => navigate("/addproduct/edit/" + val.id)}></span>
      cell: row => <h4> &nbsp;&nbsp;&nbsp;<span className='fas fa-trash-alt text-danger' onClick={() => deleteProduct(row.id)}></span> &nbsp; &nbsp;&nbsp;<span className="fa fa-edit text-primery" onClick={() => navigate("/addproduct/edit/" + row.id)}></span></h4>,

    },
  ]
  const deleteProduct = async (id) => {
    const deleteProduct = window.confirm("Do you want to delete the product?");
    if (deleteProduct) {
      await axios.post("http://localhost:8000/product/deleteProduct/" + id);
      window.location.reload(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="row">

        <div className='col-3' style={{ "position": "relative" }}>
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
            </div>
            <button className="btn btn-light" onClick={() => navigate('/admin/addproduct')}>Add Product</button>
          </div>
        </div>
        <div className="col-9 datatable" style={{}}>
          <DataTable columns={colums} data={getProducts} pagination PaginationPageAction fixedHeader fixedHeaderScrollHeight='500px' highlightOnHover allowOverflow />
          {/* <table className="table mb-0">
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
                        <Link to={`/addproduct/edit/${val.id}`}>
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
                        <Link to={`/addproduct/edit/${val.id}`}>
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
                        <Link to={`/addproduct/edit/${val.id}`}>
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
                        <Link to={`/addproduct/edit/${val.id}`}>
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
                        <Link to={`/addproduct/edit/${val.id}`}>
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
          </table> */}

        </div>
      </div>
    </>
  )
}

export default ProductsAdminSide;
