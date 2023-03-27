import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
import PermissionCheck from '../context/PermissionCheck'

const Navbar = () => {
  const navigate = useNavigate();
  const { cart, wishlist, setWishlist, searchResult, setSearchResult } = useContext(DataContext);
  const [searchValue, setSearchValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    navigate('/searchProduct/' + searchValue)
    setSearchValue('')
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    await axios.get('http://localhost:8000/product/searchProduct/' + e.target.value)
      .then(response => {
        setSearchResult(response.data);
      }).catch(error => {
        if (error)
          setSearchResult([]);
        setSearchValue('')
      })
  };

  const getData = async () => {
    const userId = localStorage.getItem("EcomUserId");
    const res = await axios.get('http://localhost:8000/wishlist/' + userId);
    setWishlist(res.data);
  }
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (<div className="code-nav flex">
    <nav className='right-nav flex'>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fa fa-bars"></i>
      </label>
      <label className="logo">
        <img style={{ width: "50px" }} src="../img/T4.png" alt="box" className="img-fluid" /><NavLink to="/home">Cart.Com</NavLink>
      </label>
      <ul className='flex'>
        <li>
          <form onSubmit={submit} className="searchForm">
            <div className=' form-group '>
              {/* <div className='container'> */}
              <div className='d-flex'>
                <input type='text' size={30} id='searchbar' placeholder='Search for products, brands and more' defaultValue={searchValue} onInput={(e) => submitForm(e)} className='form-control form-group-sm' />
                <button type='submit' className='btn btn-primary m-0' style={{ padding: "5px 15px", borderRadius: "5px" }}> <i className="fa fa-search"></i></button>
              </div>
              {searchResult.length > 0 &&
                <div className='' style={{ width: '320px', position: 'absolute', zIndex: 9999 }}>
                  <ul className="list-group" >
                    {searchResult.map((item, i) => {
                      return <li className="list-group-item" key={i} >
                        <Link to={'/details/' + item.id} style={{ position: 'static', zIndex: 123 }}>
                          {item.name}
                        </Link>
                      </li>
                    })}
                  </ul>
                </div>
              }
            </div>
          </form>
        </li>
        <li>
          <PermissionCheck claims={4}>
            <NavLink to="/Products" className=" position-relative me-3 ms-2">Products</NavLink>
          </PermissionCheck>
        </li>
        <li>
          <PermissionCheck claims={5}>
            <NavLink to="/wishlist" className="position-relative me-3">Wishlist
              {wishlist.length > 0 &&
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ overflowY: "hidden" }}>
                  {wishlist.length}
                </span>
              }
            </NavLink>
          </PermissionCheck>
        </li>
        <li>
          <PermissionCheck claims={6}>
            <NavLink to="/cart" className=" position-relative badgeCss me-3">Cart
              {cart.length > 0 &&
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ overflowY: "hidden" }}>
                  {cart.length}
                </span>
              }
            </NavLink>
          </PermissionCheck>
        </li>
        <li>
          <PermissionCheck claims={7}>
            <NavLink to="/contact" className=" position-relative me-3">Contact</NavLink>
          </PermissionCheck>
        </li>
        <li>
          <PermissionCheck claims={1}>
            <NavLink to="/addproduct" className=" position-relative me-3" >Add Product </NavLink>
          </PermissionCheck>
        </li>
        <li>
          <NavLink to="/myaccount" className=" position-relative me-3" >User </NavLink>
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default Navbar;
