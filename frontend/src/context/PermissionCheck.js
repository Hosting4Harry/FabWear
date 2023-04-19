import React, { useContext } from 'react'
import Navbar from '../component/Navbar';
import AdminNav from '../component/AdminNav';
import { DataContext } from './DataContext';

function PermissionCheck(props) {
    const { roleId } = useContext(DataContext)
    if (roleId === 1 || roleId === 3) {
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