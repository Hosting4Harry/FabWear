import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext';

const AdminNav = () => {
    const { loading } = useContext(DataContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const btn = document.getElementById('button');
    window.onscroll = () => {
        if (window.scrollY <= 150) {
            document.getElementById('logo').style.color = 'inherit';
            document.getElementById('sideBar').style.display = 'block';
            document.querySelector('nav > label > i').style.display = 'initial';
            document.getElementById('nav').style.backgroundColor = '#012946';
        } else {
            document.getElementById('sideBar').style.display = 'none';
            document.getElementById('logo').style.color = '#08c3f1';
            document.getElementById('nav').style.backgroundColor = 'transparent';
            document.querySelector('nav > label > i').style.display = 'none';
        }
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }
    const scrollTop = () => {
        window.scrollTo(0, 0);
    }
    return (<>
        <div className="code-nav flex">
            <nav id="nav" className='right-nav flex'>
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="checkbtn">
                    <i className="fa fa-bars"></i>
                </label>
                <label className="logo">
                    <NavLink id="logo" to="/dashboard">Fab Wear</NavLink>
                </label>
                <ul className='flex' id='sideBar'>
                    <li>
                        <NavLink to="/admin/products" className=" position-relative me-3 ms-2">Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/addproduct" className=" position-relative me-3" >Add Product </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myaccount" className=" position-relative me-3" >User </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
        <i id='button' onClick={scrollTop}></i>
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
    </>
    )
}

export default AdminNav;
