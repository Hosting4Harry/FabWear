import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'
const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-12 mx-auto mb-3 img-bg ">
                            <h6 className="text-uppercase fw-bold">Contact</h6>
                            <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: " #7c4dff", height: "2px" }} />
                            <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                            <p><i className="fas fa-envelope mr-3"></i> Cart@gmail.com</p>
                            <p><i className="fas fa-phone mr-3"></i> + 91 70775 52981</p>
                            <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                        </div>
                        <div className="col-md-4 col-12 mx-auto mb-3 text-center p-3">
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
                        <div className="col-md-4 col-12 mx-auto mb-3 img-bg ">
                            <img src="../img/d4.svg" alt="box" className="img-fluid foot-img" />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center col-md-6 col-12 mx-auto mb-3 text-dark copy'>
                        all rights reserved @{new Date().getFullYear()} <NavLink to="/products">Copyrights </NavLink>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
