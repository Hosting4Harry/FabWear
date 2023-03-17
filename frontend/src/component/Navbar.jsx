import React, { useContext, useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const Navbar = () => {
  const { cart } = useContext(DataContext)
  const [inputValue, setInputValue] = useState('');
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
            <li>
              <form onSubmit=''>
                <div className='d-flex form-group '>
                  <input size={30} placeholder="Search for products, brands and more" className='form-control form-group-sm' defaultValue={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
                  <button type='submit' className='btn btn-primary' style={{ padding: "5px 15px", borderRadius: "3px" }}> <i class="fa fa-search"></i></button>
                </div>
              </form>
            </li>
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
