import React, { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
export const DataContext = createContext()
export const ConText = (props) => {
    const [roleId, setRoleId] = useState(null);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
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
    const checkRole = () => {
        debugger
        const token = localStorage.getItem('Ecomtoken');
        try {
            var decoded = jwt_decode(token);
            setRoleId(decoded.role)
        } catch (error) {
        }
    }

    useEffect(() => {
        checkRole();
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    setInterval(checkAuth, 1000);

    return (
        <>
            <DataContext.Provider value={{ roleId, cart, setCart, wishlist, setWishlist, isAuth, searchResult, setSearchResult, loading, setLoading }}>
                {props.children}
            </DataContext.Provider>
        </>
    )
}