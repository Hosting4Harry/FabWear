
import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
const Success = () => {
    const navigate = useNavigate()
    const loc = useLocation()
    const pid = localStorage.getItem('Ecomlongid')
    useEffect(() => {
        const paydet = async () => {
            // console.log(loc.search)
            const str = loc.search;
            const myArr = str.split("=");
            const pyid = myArr[myArr.length - 1];
            const data = {
                pid: pid,
                pyid: pyid
            }
            const res = await axios.post(`http://localhost:8000/payment/paydetails`, data)
            console.log(res)

        }
        paydet()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const timeout = useRef(null)
    //  const navigate= useNavigate()
    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            //  console.log()
            if (!response.data.login) {
                navigate("/");
            }
        })
    }

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 10)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="container p-5">
                <div className="row">
                    <div className="container text-center">
                        <h2>Thank You for Buy This</h2>
                        <button className="btn btn-info" onClick={() => navigate('/products')}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Success;
