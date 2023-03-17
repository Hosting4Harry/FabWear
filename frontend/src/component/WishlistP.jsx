import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
const WishlistP = ({ id, name, price, product_image }) => {
    const { wishlist, setWishlist } = useContext(DataContext);
    const deleteProduct = (id) => {
        const exist = wishlist.find((x) => x.id === id)
        if (exist) {
            setWishlist(
                wishlist.filter((x) => x.id !== id)
            )
        }
    }
    return (
        <div className="col-lg-4 col-md-6 col-12 ">
            <div className="card">
                <img src={`../img/${product_image}`} alt={product_image} className="img-fluid cart-img" />
                <div className="p-3">
                    <div className="cartbox">
                        <div>
                            <p>{name}</p>
                            <p>{price}.00</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn btn-info" onClick={() => deleteProduct(id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishlistP;
