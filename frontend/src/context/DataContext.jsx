import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
export const DataContext = createContext()
export const ConText = (props) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isAuth, setIsAuth] = useState(false)
    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            //  console.log()
            if (response.data.login) {
                setIsAuth(true)
            }
        })
    }

    useEffect(() => {
        checkAuth();
        setWishlist(JSON.parse(localStorage.getItem('WishList')));
    }, [])
    setInterval(checkAuth, 1000);

    return (
        <>
            <DataContext.Provider value={{ cart, setCart, wishlist, setWishlist, isAuth }}>
                {props.children}
            </DataContext.Provider>
        </>
    )
}