import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
import '../page/AddOn/Loader.css'
import '../page/AddOn/BackToTop.css'

const Navbar = () => {
  const navigate = useNavigate();
  const { cart, setCart, wishlist, setWishlist, searchResult, setSearchResult, loading } = useContext(DataContext);
  const [searchValue, setSearchValue] = useState("");
  const btn = document.getElementById('button');
  window.onscroll = () => {
    if (window.scrollY <= 150) {
      document.getElementById('logo').style.color = 'inherit';
      document.getElementById('sideBar').style.display = 'block';
      document.getElementById('nav').style.backgroundColor = '#012946';
      document.querySelector('nav > label > form').style.display = 'block';
      document.querySelector('nav > label > i').style.display = 'initial';
    } else {
      document.getElementById('sideBar').style.display = 'none';
      document.getElementById('logo').style.color = '#08c3f1';
      document.getElementById('nav').style.backgroundColor = 'transparent';
      document.querySelector('nav > label > form').style.display = 'none';
      document.querySelector('nav > label > i').style.display = 'none';
    }
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }
  const scrollTop = () => {
    window.scrollTo(0, 0)
  }


  const submit = (e) => {
    e.preventDefault();
    navigate('/searchProduct/' + searchValue);
  };
  const submitForm = async (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === " ") return;
    await axios.get('http://localhost:8000/product/searchProduct/' + e.target.value)
      .then(response => {
        setSearchResult(response.data);
        document.getElementById("searchList").style.display = "list-item";
        document.getElementById("wrapper").style.display = "block";

      }).catch(error => {
        if (error)
          setSearchResult([]);
        setSearchValue('')
      })
  };
  const hideList = () => {
    document.getElementById("searchList").style.display = "none";
    document.getElementById("wrapper").style.display = "none";
  }
  const userId = localStorage.getItem("EcomUserId");
  const cartItems = async () => {
    const res = await axios.get('http://localhost:8000/cart/' + userId);
    setCart(res.data);
  }
  const getData = async () => {
    const res = await axios.get('http://localhost:8000/wishlist/' + userId);
    setWishlist(res.data);
  }
  useEffect(() => {
    getData();
    cartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (<>
    <div className="code-nav flex ">
      <nav id='nav' className='right-nav flex'>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fa fa-bars"></i>
        </label>
        <label className="logo">
          <NavLink id='logo' to="/home">Fab Wear</NavLink>
        </label>
        <label className='searchBar' id='searchBar' style={{ marginLeft: "50px" }}>
          <form onSubmit={submit} className="searchForm">
            <div className=' form-group '>
              <div className='d-flex'>
                <input type='text' size={30} id='searchbar' placeholder='Search for products, brands and more' defaultValue={searchValue} onChange={(e) => submitForm(e)} className='form-control form-group-sm' />
                <button type='submit' className='btn btn-primary m-0' style={{ padding: "5px 15px", borderRadius: "5px" }}> <i className="fa fa-search"></i></button>
              </div>
              {searchResult.length > 0 && <>
                <div className='search_wrapper' id='wrapper' onClick={hideList}>

                </div>
                <div className='search_list' id='searchList' style={{ width: '320px', position: 'absolute', zIndex: 9999, display: 'none' }}>
                  <ul className="list-group" style={{}}>
                    {searchResult.map((item, i) => {
                      return <li className="list-group-item" key={i}>
                        <Link to={'/details/' + item.id} onClick={hideList} style={{ position: 'static', zIndex: 123 }}>
                          {item.name}
                        </Link>
                      </li>
                    })}
                  </ul>
                </div>
              </>
              }
            </div>
          </form>
        </label>
        <ul className='flex' id='sideBar'>
          <li>
            <NavLink to="/Products" className=" position-relative me-3 ms-2">Products</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" className="position-relative me-3">Wishlist
              {wishlist.length > 0 &&
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ overflowY: "hidden" }}>
                  {wishlist.length}
                </span>
              }
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className=" position-relative badgeCss me-3">Cart
              {cart.length > 0 &&
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ overflowY: "hidden" }}>
                  {cart.length}
                </span>
              }
            </NavLink>
          </li>
          <li >
            {userId ? <NavLink to="/myaccount" className=" position-relative me-3" >User </NavLink> : <NavLink to="/" className=" position-relative me-3" >Login </NavLink>}
          </li>
        </ul>
      </nav>
    </div>
    {loading &&
      <div className=" wrapper wrapper-spin ">
        <figure>
          <div className="dot white"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </figure>
        <div className='text text-light'></div>
      </div>
    }
    <i id='button' onClick={scrollTop}></i>

  </>
  )
}


export default Navbar;
