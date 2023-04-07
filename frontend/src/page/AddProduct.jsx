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

    const [productDetails, setProductDetails] = useState({
        name: '',
        price: '',
        product_image: '',
        category: ''
    });
    const handelData = (e) => {
        let { name, value } = e.target;
        let x = { ...productDetails, [name]: value };
        setProductDetails(x)
    }
    console.log(productDetails)
    const handelSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('name', productDetails.name);
        data.append('price', productDetails.price);
        data.append('category', productDetails.category);
        data.append('product_image', productDetails.product_image);
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
            window.location.reload(true);
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <section className='pt-4' style={{ height: '100vh' }}>
            <div className='container'>
                <div className="row d-flex justify-content-center aligen-items-center mt-5 h-50">
                    <div className="col-5 border border-yellow">
                        <form className="form-group" onSubmit={handelSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                <input type="text" value={productDetails.name} onChange={handelData} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                                <input type="text" value={productDetails.price} onChange={handelData} name="price" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group w-50 mb-3">
                                <label htmlFor="sel1">Category:</label>
                                <select className="form-control" id="" name='category' onChange={handelData} required>
                                    <option value="select">Select</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="shirt">Shirt</option>
                                    <option value="pant">Pant</option>
                                    <option value="jacket">Jacket</option>
                                    <option value="hat">Hat</option>
                                    <option value="kurta">Kurta</option>
                                    <option value="plant">Plants</option>
                                    <option value="tees">Tees</option>
                                    <option value="sneaker">Sneaker</option>
                                    <option value="perfume">Perfume</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Product Image</label>
                                <input type="file" value={productDetails.file} onChange={(e) => { setProductDetails(productDetails => ({ ...productDetails, product_image: e.target.files[0] })) }} name="product_image" className="form-control" id="exampleInputPassword1" />
                            </div>

                            <button type="submit" className="btn btn-primary" >Submit</button>

                        </form></div>
                </div>
            </div>
        </section>
    )
}

export default AddProduct;
