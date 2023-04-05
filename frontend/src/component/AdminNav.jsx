import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import axios from 'axios'

const AdminNav = () => {
    const navigate = useNavigate();
    const { setCart, setWishlist, searchResult, setSearchResult } = useContext(DataContext);
    const [searchValue, setSearchValue] = useState("");

    const submit = (e) => {
        e.preventDefault();
        navigate('/searchProduct/' + searchValue);
        setSearchValue('');
    };
    const submitForm = async (e) => {
        setSearchValue(e.target.value);
        if (e.target.value === " ") return;
        await axios.get('http://localhost:8000/product/searchProduct/' + e.target.value)
            .then(response => {
                setSearchResult(response.data);
                document.getElementById("searchList").style.display = "list-item";
            }).catch(error => {
                if (error)
                    setSearchResult([]);
                setSearchValue('');
            });
    };
    const hideList = () => {
        document.getElementById("searchList").style.display = "none";
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
            <label className='searchBar'>
                <form onSubmit={submit} className="searchForm">
                    <div className=' form-group '>
                        <div className='d-flex'>
                            <input type='text' size={30} id='searchbar' placeholder='Search for products, brands and more' defaultValue={searchValue} onChange={(e) => submitForm(e)} className='form-control form-group-sm' />
                            <button type='submit' className='btn btn-primary m-0' style={{ padding: "5px 15px", borderRadius: "5px" }}> <i className="fa fa-search"></i></button>
                        </div>
                        {searchResult.length > 0 &&
                            <div className='search_list' id='searchList' onMouseLeave={hideList} style={{ width: '320px', position: 'absolute', zIndex: 9999, display: 'block' }}>
                                <ul className="list-group" style={{}}>
                                    {searchResult.map((item, i) => {
                                        return <li className="list-group-item" key={i}>
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
            </label>
            <ul className='flex' id='sideBar'>
                <li>
                    <NavLink to="/Products" className=" position-relative me-3 ms-2">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/addproduct" className=" position-relative me-3" >Add Product </NavLink>
                </li>
                <li>
                    <NavLink to="/myaccount" className=" position-relative me-3" >User </NavLink>
                </li>
            </ul>
        </nav>
    </div>
    )
}

export default AdminNav;