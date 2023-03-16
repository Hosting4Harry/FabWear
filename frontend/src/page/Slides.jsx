import React from 'react'
import './Slides.css'

function Slides() {
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                    <img src="../img/2593170.png" className="d-block w-100" style={{ borderRadius: "2em" }} alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img src="../img/E1.jpg" className="d-block w-100" style={{ borderRadius: "2em" }} alt="..." />
                </div>
                <div className="carousel-item " data-bs-interval="3000">
                    <img src="../img/E2.jpg" className="d-block w-100" style={{ borderRadius: "2em" }} alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img src="../img/E3.jpg" className="d-block w-100" style={{ borderRadius: "2em" }} alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img src="../img/E4.jpg" className="d-block w-100" style={{ borderRadius: "2em" }} alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Slides;