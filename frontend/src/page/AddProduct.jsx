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


    const [product, setProduct] = useState({
        name: "",
        price: "",
    });
    const [file, setFile] = useState();
    const handelData = (e) => {
        let { name, value } = e.target;
        let x = { ...product, [name]: value };
        setProduct(x);
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        Object.keys(product).map(key => {
            debugger
            return formData.append(key, product[key]);
        });
        formData.append(file);
        axios.post("http://localhost:8000/product/addproduct", formData)
            .then((res) => {
                if (product.name === "" || product.price === "") {
                    alert('please fill details')
                } else {
                    alert("product added successfully");
                }
            }).catch((err) => {
                console.log(err);
            })
        setProduct({
            name: "", price: ""
        })
    }


    return (
        <>
            <div className='container'>

                <div className="row d-flex justify-content-center aligen-items-center mt-5 h-50">
                    <div className="col-5 border border-yellow">
                        <form className="form-group">
                            <h3>userDetails</h3>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                <input type="text" value={product.name} onChange={handelData} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                                <input type="text" value={product.price} onChange={handelData} name="price" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">product pic</label>
                                <input type="file" value={product.file} onChange={handelData} name="file" className="form-control" id="exampleInputPassword1" />
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={handelSubmit}>Submit</button>

                        </form></div>
                </div>
            </div>
        </>
    )
}

export default AddProduct;
