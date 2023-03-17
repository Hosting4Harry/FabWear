import React, { useContext, useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const Navbar = () => {
  const { cart, wishlist } = useContext(DataContext)
  const [inputValue, setInputValue] = useState('');
  const search_animal = () => {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('animals');
    console.log("first")
    for (let i = 0; i < x.length; i++) {
      if (inputValue === "") {
        x[i].style.display = "none";
      }
      else if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
      }
      else {
        x[i].style.display = "list-item";
      }
    }
  }

  const submit = (e) => {
    e.preventDefault();
    setInputValue('');
  };
  // useEffect(() => {
  // }, [inputValue])
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
              <form onSubmit={submit}>
                <div className='d-flex form-group '>
                  <input type='text' size={30} onKeyUp={search_animal} id='searchbar' placeholder="Search for products, brands and more" className='form-control form-group-sm' defaultValue={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
                  <button type='submit' className='btn btn-primary m-0' style={{ padding: "5px 15px", borderRadius: "3px" }}> <i className="fa fa-search"></i></button>
                </div>
              </form>
            </li>
            <li><NavLink to="/Products">Products</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/wishlist" className="cart-box">Wishlist <span>{wishlist.length}</span></NavLink></li>
            <li><NavLink to="/cart" className="cart-box">Cart <span>{cart.length}</span> </NavLink></li>
            <li><NavLink to="/myaccount" >User </NavLink></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar
