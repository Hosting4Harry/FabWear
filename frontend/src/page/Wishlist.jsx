import axios from 'axios';
import React, { useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import WishlistP from '../component/WishlistP';
import { DataContext } from '../context/DataContext'

const Wishlist = () => {
    const { wishlist } = useContext(DataContext);
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

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 100)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h1>hello this is your wishlist</h1>
            <div className="cart">
                {
                    !wishlist.length ? (
                        <>
                            <div className="container">
                                <h2>There is No Items In the wishlist</h2>
                                <button className="btn btn-info" onClick={() => navigate('/products')}>Continue Shopping</button>
                            </div>

                        </>
                    ) : (
                        <>
                            <div className="container">
                                <h2>Your wishlist Items</h2>
                                <br />
                                <div className="row">
                                    {
                                        wishlist.map((val, ind) => {
                                            return (<WishlistP
                                                key={ind}
                                                id={val.id}
                                                name={val.name}
                                                price={val.price}
                                                plant_image={val.image}
                                            />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>

        </>
    )
}

export default Wishlist
