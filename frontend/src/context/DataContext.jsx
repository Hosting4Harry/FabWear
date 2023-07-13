import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import configData from '../environments/config.json'
export const DataContext = createContext();
export const ConText = (props) => {
    const [order, setOrder] = useState([]);
    const [totalUser, setTotalUser] = useState([]);
    const [roleId, setRoleId] = useState(null);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const checkAuth = () => {
        axios.get(`${configData.baseUrl}/isAuth`, {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (response.data.login) {
                setIsAuth(true);
            }
        })
    }
    const checkRole = () => {
        const token = localStorage.getItem('Ecomtoken');
        try {
            var decoded = jwt_decode(token);
            setRoleId(decoded.role);
        } catch (error) {
        }
    }

    useEffect(() => {
        checkRole();
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // setInterval(checkAuth, 10000);

    return (
        <>
            <DataContext.Provider value={{ roleId, cart, totalUser, setTotalUser, order, setOrder, setCart, wishlist, setWishlist, isAuth, searchResult, setSearchResult, loading, setLoading }}>
                {props.children}
            </DataContext.Provider>
        </>
    )
}