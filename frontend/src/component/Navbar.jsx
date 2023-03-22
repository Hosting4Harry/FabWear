import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import axios from 'axios'

const Navbar = () => {
  const { cart, wishlist, setWishlist } = useContext(DataContext);
  const [inputValue, setInputValue] = useState('');
  const submit = (e) => {
    e.preventDefault();
    setInputValue('');
  };
  const onSearch = (searchTerm) => {
    console.log("@@@", searchTerm);
    // setInputValue(searchTerm);
  }


  useEffect(() => {
    const id = localStorage.getItem("EcomUserId");
    axios.get('http://localhost:8000/wishlist/' + id)
      .then((response) => {
        setWishlist(response.data);
      }).catch((err) => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              <input type='text' size={30} id='searchbar' placeholder="Search for products, brands and more" className='form-control form-group-sm' defaultValue={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
              <button type='submit' onClick={() => onSearch(inputValue)} className='btn btn-primary m-0' style={{ padding: "5px 15px", borderRadius: "5px" }}> <i className="fa fa-search"></i></button>
            </div>
            <div className='dropdown'>
              {/* read the data using map */}

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
