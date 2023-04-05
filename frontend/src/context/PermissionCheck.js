import React from 'react'
import jwt_decode from "jwt-decode";
import Navbar from '../component/Navbar';
import AdminNav from '../component/AdminNav';

function PermissionCheck(props) {
    const token = localStorage.getItem('Ecomtoken');

    const checkRole = () => {
        try {
            var decoded = jwt_decode(token);
        } catch (error) {
        }
        if (decoded?.role === 1 || decoded?.role === 2) {
            return true
        } else {
            return false
        }
    }
    if (checkRole()) {
        return <AdminNav />
    }

    else return <Navbar />
    // else return <Navbar />
    //   <>
    //         {
    //             props.children
    //         }
    //     </> 
}

export default PermissionCheck;