import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import axios from 'axios'

const Navbar = () => {
  const { cart, wishlist, setWishlist } = useContext(DataContext);
  const [option, setOption] = useState([])
  const getOptionFromAPI = () => {
    axios.get(`http://localhost:8000/product/getOption`)
      .then((res) => {
        debugger
        for (let i = 0; i < res.data.length; i++) {
          option.push(res.data[i].name)
        }
        setOption(option)
      }).catch((err) => {
        console.log(err);
      })
    console.log(option);
    debugger
  }
  const submit = (e) => {
    e.preventDefault();
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
  // useEffect(() => {
  // }, [inputValue])
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
            <div className='d-flex form-group '>
              <input type='text' size={30} id='searchbar' placeholder="Search for products, brands and more" className='form-control form-group-sm' defaultValue={option} onChange={getOptionFromAPI} />
              <button type='submit' className='btn btn-primary m-0' style={{ padding: "5px 15px", borderRadius: "5px" }}> <i className="fa fa-search"></i></button>
            </div>
          </form>

        </li>
        <li><NavLink to="/Products" className=" position-relative me-3 ms-2">Products</NavLink></li>
        <li>
          <NavLink to="/wishlist" className="position-relative me-3">Wishlist
            {wishlist.length > 0 &&
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ overflowY: "hidden" }}>
                {wishlist.length}
              </span>
            }
          </NavLink>
        </li>
        <li className=''>
          <NavLink to="/cart" className=" position-relative badgeCss me-3">Cart
            {cart.length > 0 &&
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ overflowY: "hidden" }}>
                {cart.length}
              </span>
            }
          </NavLink>
        </li>
        <li><NavLink to="/contact" className=" position-relative me-3">Contact</NavLink></li>
        <li><NavLink to="/myaccount" className=" position-relative me-3" >User </NavLink></li>
      </ul>
    </nav>
  </div>
  )
}

export default Navbar;
