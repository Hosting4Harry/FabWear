import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css";
// import { GrFavorite } from 'react-icons/gr';
const CardProducts = ({ id, name, price, product_image }) => {
    const navigate = useNavigate();
    const handelChange = (e) => {

        alert("hello")
    }
    return (
        <>
            <div className="col-lg-4 col-md-6 col-12  mb-3 products-p">
                <div className="card p-2">
                    <div>
                        <input type="checkbox" id={"heart" + id} />
                        <label for={"heart" + id}>&#9829;</label>
                    </div>
                    <img src={`../img/${product_image}`} alt="tree" className="img-fluid p-img" />
                    <div className="overlay">
                        <div className="price">
                            <p>{name} </p>
                            <p>{price}.00</p>
                        </div>
                        <div className="text-center">
                            {/* <button className="btn btn-info ml-1 mr-1">Add To Cart</button> */}
                            <button className="btn btn-info ml-1 mr-1" onClick={() => navigate(`/details/${id}`)}>View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardProducts
