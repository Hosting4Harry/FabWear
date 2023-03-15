import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'
const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mx-auto mb-3 text-center p-3">
                            <h2>NavLinks</h2>
                            <hr />
                            <ul>
                                <li className="foot-link">
                                    <NavLink to="/home">Home</NavLink>
                                </li>
                                <li className="foot-link">
                                    <NavLink to="/products">Products</NavLink>
                                </li>
                                <li className="foot-link">
                                    <NavLink to="/contact">Contact</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-12 mx-auto mb-3 bg-secondary rounded-circle">
                            <img src="../img/d4.svg" alt="box" className="img-fluid foot-img" />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center col-md-6 col-12 mx-auto mb-3 text-light'>
                        all rights reserved @{new Date().getFullYear()} <NavLink to="/products">Copyrights </NavLink>
                    </div>
                </div>

            </footer>

        </>
    )
}

export default Footer
