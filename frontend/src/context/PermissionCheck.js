import React from 'react'
import jwt_decode from "jwt-decode";

function PermissionCheck(props) {
    const token = localStorage.getItem('Ecomtoken');

    const checkisClaimExist = (claim) => {
        try {
            var decoded = jwt_decode(token);
        } catch (error) {
        }
        const claims = decoded?.claims;
        return claims?.includes(claim);
    }
    if (checkisClaimExist(props.claims))
        return <>
            {
                props.children
            }
        </>
    else return <></>
}

export default PermissionCheck;