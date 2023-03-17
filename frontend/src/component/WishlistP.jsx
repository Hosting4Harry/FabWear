import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
const WishlistP = ({ id, name, price, plant_image, qty }) => {
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
                <img src={`../img/${plant_image}`} alt={plant_image} className="img-fluid wishlist-img" />
                <div className="p-3">
                    <div className="wishlistbox">
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
