import axios from 'axios';
import React, { useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import WishlistP from '../component/WishlistP';
import { DataContext } from '../context/DataContext'

const Wishlist = () => {
    const { wishlist, setWishlist } = useContext(DataContext);
    const timeout = useRef(null);
    const navigate = useNavigate();
    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (!response.data.login) {
                navigate("/");
            }
        })
    }
    const id = localStorage.getItem("EcomUserId")
    function getWish(id) {
        axios.get('http://localhost:8000/wishlist/' + id)
            .then((response) => {
                setWishlist(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getWish(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 100)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(wishlist)
    return (<div className="cart">
        {!wishlist.length ? (
            <div className="container">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2>There is No Items In the wishlist</h2>
                    <img src="../img/W1.png" alt="emptybag" />
                </div>
                <div className="container" style={{ textAlign: 'center' }}>
                    <button className="btn-lg btn-info" onClick={() => navigate('/products')}>Continue Shopping</button>
                </div>

            </div>
        ) : (<div className="container">
            <h2>Your have {wishlist.length} Items in your wishlist</h2>
            <br />
            <div className="row">
                {wishlist.map((val, ind) => {
                    return (<WishlistP
                        key={ind}
                        id={val.id}
                        name={val.name}
                        price={val.price}
                        product_image={val.product_image}
                        productId={val.productId}
                    />)
                })}
            </div>
        </div>
        )
        }
    </div>
    )
}

export default Wishlist
