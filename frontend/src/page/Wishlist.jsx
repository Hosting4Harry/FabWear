import axios from 'axios';
import React, { useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext'

const Wishlist = () => {
    const { Wishlist } = useContext(DataContext);
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
        </>
    )
}

export default Wishlist
