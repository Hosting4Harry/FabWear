import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const Navbar = () => {
  const { cart } = useContext(DataContext)
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
                  <div className=''>
                    <div className=''>
                      <input type='text' size={30} onKeyUp={search_animal} id='searchbar' placeholder="Search for products, brands and more" className='form-control form-group-sm' defaultValue={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
                    </div>
                    <div className='bg-dark'>
                      <ol id='list overlay'>
                        <li className="animals" style={{ display: 'none' }}>Cat</li>
                        <li className="animals" style={{ display: 'none' }}>Dog</li>
                        <li className="animals" style={{ display: 'none' }}>Elephant</li>
                        <li className="animals" style={{ display: 'none' }}>Fish</li>
                        <li className="animals" style={{ display: 'none' }}>Gorilla</li>
                        <li className="animals" style={{ display: 'none' }}>Monkey</li>
                        <li className="animals" style={{ display: 'none' }}>Turtle</li>
                        <li className="animals" style={{ display: 'none' }}>Whale</li>
                        <li className="animals" style={{ display: 'none' }}>Aligator</li>
                        <li className="animals" style={{ display: 'none' }}>Donkey</li>
                        <li className="animals" style={{ display: 'none' }}>Horse</li>
                      </ol>
                    </div>
                  </div>
                  <div className=''>
                    <button type='submit' className='btn btn-primary m-0' style={{ padding: "5px 15px", borderRadius: "3px" }}> <i className="fa fa-search"></i></button>
                  </div>
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
