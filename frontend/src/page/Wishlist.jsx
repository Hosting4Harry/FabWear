import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistP from '../component/WishlistP';
import { DataContext } from '../context/DataContext';
import configData from '../environments/config.json'
import useAuth from '../context/useAuth';

const Wishlist = () => {
    const instance = useAuth()
    const { wishlist, setWishlist } = useContext(DataContext);
    // const timeout = useRef(null);
    const navigate = useNavigate();

    const id = localStorage.getItem("EcomUserId")
    function getWish(id) {
        instance.get(`${configData.baseUrl}/wishlist/` + id)
            .then((response) => {
                setWishlist(response.data);
            }).catch((err) => {
                navigate('/')
            });
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        getWish(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])



    return (<>
        <div className="cart pt-2" style={{ backgroundColor: "#eee", marginBottom: "200px" }}>
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
    </>
    )
}

export default Wishlist
