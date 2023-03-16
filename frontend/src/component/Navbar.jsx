import React, { useContext } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import { FcSearch } from "react-icons/fc";
const Navbar = () => {
  const { cart } = useContext(DataContext)

  return (
    <>
      <div className="code-nav flex">
        <nav className='right-nav flex'>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fa fa-bars"></i>
          </label>
          <label className="logo">
            <img style={{ width: "50px" }} src="../img/T4.png" alt="box" className="img-fluid" /><NavLink to="/home">Cart.Com</NavLink>
          </label>
          <ul className='flex'>
            <label className='searchicon'>
              <input placeholder="Search for products, brands and more" className='searchbar ' value="" />
              <button className='btn-sm border border-dark ' > <FcSearch /></button>
            </label>
            <li><NavLink to="/home"  >Home</NavLink></li>
            <li><NavLink to="/Products">Products</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/cart" className="cart-box">Cart <span>{cart.length}</span> </NavLink></li>
            <li><NavLink to="/myaccount" >User </NavLink></li>
          </ul>

        </nav>
      </div>

    </>
  )
}

export default Navbar
