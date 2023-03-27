import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate()
    const timeout = useRef(null)
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
        timeout.current = setTimeout(checkAuth, 1000)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [productValues, setProductValues] = useState({
        name: '',
        price: '',
        product_image: ''
    });
    const handelData = (e) => {
        let { name, value } = e.target;
        let x = { ...productValues, [name]: value };
        setProductValues(x)
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('name', productValues.name);
        data.append('price', productValues.price);
        data.append('product_image', productValues.product_image);

        var config = {
            method: 'post',
            url: "http://localhost:8000/product/addproduct",
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "type": "formData"
            },
            data: data
        };
        axios(config).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <div className='container'>

                <div className="row d-flex justify-content-center aligen-items-center mt-5 h-50">
                    <div className="col-5 border border-yellow">
                        <form className="form-group" onSubmit={handelSubmit}>
                            <h3>userDetails</h3>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                <input type="text" value={productValues.name} onChange={handelData} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                                <input type="text" value={productValues.price} onChange={handelData} name="price" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">product pic</label>
                                <input type="file" value={productValues.file} onChange={(e) => { setProductValues(productValues => ({ ...productValues, product_image: e.target.files[0] })) }} name="product_image" className="form-control" id="exampleInputPassword1" />
                            </div>

                            <button type="submit" className="btn btn-primary" >Submit</button>

                        </form></div>
                </div>
            </div>
        </>
    )
}

export default AddProduct;
