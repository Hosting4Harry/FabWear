import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'
const Footer = () => {
    return (
        <>
            <footer >
                <div className="container" style={{ overflow: "hidden" }}>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 col-12 mx-auto mb-3 img-bg ">
                            <h6 className="text-uppercase fw-bold">Contact</h6>
                            <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: " #7c4dff", height: "2px" }} />
                            <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                            <p><i className="fas fa-envelope mr-3"></i> fabwear@gmail.com</p>
                            <p><i className="fas fa-phone mr-3"></i> + 91 70775 52981</p>
                            <p><i className="fas fa-phone mr-3"></i> + 91 77508 24876</p>
                            <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                            <div className="socails">
                                <div className="social-outer-box">
                                    <i className="fa fa-facebook-official mr-3 social"></i>
                                </div>
                                <div className="social-outer-box">
                                    <i className="fa fa-twitter mr-3 social"></i>
                                </div>
                                <div className="social-outer-box">
                                    <i className="fa fa-youtube mr-3 social"></i>
                                </div>
                                <div className="social-outer-box">
                                    <i className="fa fa-linkedin-square mr-3 social"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 mx-auto mb-3 text-center p-3">
                            <h2>Cart.com</h2>
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
                        <div className="col-md-6 col-lg-4 col-12 mx-auto mb-3 img-bg ">
                            <img src="../img/logo/Fab-Wear1.png" alt="Cart" className="img-fluid foot-img" />
                        </div>
                    </div>
                </div>
            </footer>
            <div className="black-box">
                <p className="copyright">© {new Date().getFullYear()} Fab Wear. All Right Reserved. With Love By Fab Wear</p>
            </div>
        </>
    )
}

export default Footer
