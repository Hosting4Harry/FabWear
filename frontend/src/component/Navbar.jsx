import React, { useContext } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import { BiSearch } from "react-icons/bi";
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
            <NavLink to="/home">Cart.Com</NavLink>
          </label>

          <ul className='flex'>
            <label className='searchicon'><BiSearch /> <input placeholder="Search for products, brands and more" className='searchbar' value="" /></label>
            <li></li>
            <li></li>
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
