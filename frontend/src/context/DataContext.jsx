import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
export const DataContext = createContext()
export const ConText = (props) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
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
    }, [])
    setInterval(checkAuth, 1000);

    return (
        <>
            <DataContext.Provider value={{ cart, setCart, wishlist, setWishlist, isAuth, searchResult, setSearchResult }}>
                {props.children}
            </DataContext.Provider>
        </>
    )
}