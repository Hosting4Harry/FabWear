import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./ProductsAdminSide.css";
import configData from '../environments/config.json'
import DataTable from 'react-data-table-component';
function ProductsAdminSide() {
  const [getProducts, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('all');
  const navigate = useNavigate();
  const getData = async () => {
    const res = await axios.get(`${configData.baseUrl}/product/getdataall`)
    setProducts(res.data);
  }
  const handelChange = async (e) => {

    if (e.target.value === "all") {

      setSearch('all');
      getData();
    } else {
      setSearch(e.target.value);
      const res = await axios.get(`${configData.baseUrl}/product/searchProduct/` + e.target.value);
      setProducts(res.data);
    }
    localStorage.setItem('dropdownValue', e.target.value);
  }
  const mantainPreviousData = async () => {

    const data = localStorage.getItem('dropdownValue')
    if (data && data !== 'all') {

      setSearch(data);
      const res = await axios.get(`${configData.baseUrl}/product/searchProduct/` + data);
      setProducts(res.data);
    } else {
      getData();
    }
  }
  const colums = [
    {
      name: <h4>#</h4>,
      selector: (row, index) => index + 1
    },
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
      selector: (row) => row.price, sortable: true
    },
    {
      name: <h4>Available</h4>,
      selector: (row) => row.id, sortable: true
    },
    {
      name: <h3>Action</h3>,
      cell: row => <p>
        &nbsp;&nbsp;&nbsp;
        <span className='fas fa-trash-alt text-danger' onClick={() => deleteProduct(row.id)}></span>
        &nbsp;&nbsp;&nbsp;
        <span className="fa fa-edit text-primery" onClick={() => navigate("/addproduct/edit/" + row.id)}></span>
      </p>,

    }
  ]

  const deleteProduct = async (id) => {
    const deleteProduct = window.confirm("Do you want to delete the product?");
    if (deleteProduct) {
      await axios.post(`${configData.baseUrl}/product/deleteProduct/` + id);
      window.location.reload(true);
    }
  }


  useEffect(() => {
    mantainPreviousData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="">

        <div className='' style={{ "position": "relative" }}>
          <div className="card-header row d-flex p-3">
            <div className='d-flex col-6'>
              <i className="fas fa-tasks me-2"></i> <h5>product List</h5>
            </div>
            <div className="d-flex col-6 justify-content-end align-items-center  " style={{ position: 'absolute', right: "0px" }}>
              <p className="small mb-0 me-2 text-muted">Filter</p>
              <select className="select rounded pe-3 me-3" value={search} onChange={handelChange} >
                <option value="all">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="tees">Tees</option>
                <option value="hat">Hat</option>
                <option value="jackets">Jackets</option>
                <option value="kurta">Kurta</option>
                <option value="pant">Pant</option>
                <option value="perfume">Perfume</option>
                <option value="sneakers">Sneakers</option>
                <option value="shirt">Shirt</option>
              </select>&nbsp; &nbsp;
              {/* <button className="btn btn-light" onClick={() => navigate('/admin/addproduct')}>Add Product</button> */}
            </div>
          </div>
        </div>
        <div className="container datatable" style={{}}>

          <DataTable columns={colums} data={getProducts} pagination PaginationPageAction fixedHeader fixedHeaderScrollHeight='600px' highlightOnHover allowOverflow />
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
                        <Link to={`/ addproduct / edit / ${ val.id }`}>
                          <img src={`../ img / ${ val.product_image }`} alt={`../ img / ${ val.product_image }`} className="img-fluid t-img" />
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
                        <Link to={`/ addproduct / edit / ${ val.id }`}>
                          <img src={`../ img / ${ val.product_image }`} alt={`../ img / ${ val.product_image }`} className="img-fluid t-img" />
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
                        <Link to={`/ addproduct / edit / ${ val.id }`}>
                          <img src={`../ img / ${ val.product_image }`} alt={`../ img / ${ val.product_image }`} className="img-fluid t-img" />
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
                        <Link to={`/ addproduct / edit / ${ val.id }`}>
                          <img src={`../ img / ${ val.product_image }`} alt={`../ img / ${ val.product_image }`} className="img-fluid t-img" />
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
                        <Link to={`/ addproduct / edit / ${ val.id }`}>
                          <img src={`../ img / ${ val.product_image }`} alt={`../ img / ${ val.product_image }`} className="img-fluid t-img" />
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
