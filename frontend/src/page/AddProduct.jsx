import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import configData from '../environments/config.json'

const AddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const timeout = useRef(null);
    const checkAuth = () => {
        axios.get(`${configData.baseUrl}/isAuth`, {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (!response.data.login) {
                navigate("/");
            }
        });
    }
    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 1000)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [productDetails, setProductDetails] = useState({
        name: '',
        price: '',
        product_image: '',
        category: '',
        subcategory: '',
        accessories: false
    });

    const getData = async () => {
        if (id) {
            await axios.get(`${configData.baseUrl}/product/getdata/` + id)
                .then(response => {
                    console.log(response);

                    setProductDetails(productDetails => ({
                        ...productDetails,
                        name: response.data.name,
                        price: response.data.price,
                        product_image: response.data.product_image,
                        category: response.data.product_image.split('/')[2],
                        subcategory: response.data.product_image.split('/')[3],
                        accessories: response.data.product_image.split('/')[1] === "accessories" ? true : false
                    }));
                });
        } else {
            console.log("u can add new product");
        }
    }

    const handelData = (e) => {

        let { name, value } = e.target;
        let x = { ...productDetails, [name]: value };
        setProductDetails(x);
    }
    console.log(productDetails)
    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(productDetails?.category)
        console.log(productDetails?.subcategory)

        // eslint-disable-next-line no-useless-concat
        const image_path = "/" + `${productDetails?.accessories ? "accessories" : ''}` + "/" + productDetails?.category + "/" + productDetails?.subcategory + "/"


        var data = new FormData();
        data.append('name', productDetails.name);
        data.append('price', productDetails.price);
        data.append('category', productDetails.category);
        data.append('subcategory', productDetails.subcategory);
        data.append("image_path", image_path);
        data.append('accessories', productDetails.accessories);
        data.append('product_image', productDetails.product_image);

        if (!id) {
            var config = {
                method: 'post',
                url: `${configData.baseUrl}/product/addproduct`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "type": "formData"
                },
                data: data
            };
            axios(config).then(result => {
                window.location.reload(true);
            }).catch(error => {
                console.log(error);
            });
        } else {
            config = {
                method: 'put',
                url: `${configData.baseUrl}/product/edit/` + id,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "type": "formData"
                },
                data: data
            };
            axios(config).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
            });
        }
    }
    useEffect(() => {
        getData(id);
        // eslint-disable-next-line
    }, [id]);

    return (
        <section className='pt-2' style={{ marginBottom: "200px" }}>
            <div className='container '>
                <div className=''>
                    <h2>{id ? "Edit " : "Add "}Product</h2>
                </div>
                <div className="row  justify-content-center aligen-items-center mt-5 h-50">
                    <div className='col-lg-5 col-md-8 col-sm-10'>
                        <img src={`../../img/${id ? productDetails.product_image : 'NO_IMG.png'}`} alt='dsd' className="img-fluid" style={{ height: '400px', width: "100%" }} />
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-10 border border-yellow">
                        <form className="form-group" onSubmit={handelSubmit}>
                            <div className='row'>
                                <div className="col mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                    <input type="text" value={productDetails.name} onChange={handelData} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                                    <input type="text" value={productDetails.price} onChange={handelData} name="price" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col mb-3">
                                    <input type="checkbox" checked={productDetails.accessories} onChange={(e) => { setProductDetails(productDetails => ({ ...productDetails, accessories: !productDetails.accessories })) }} name="accessories" />Add to Accessories
                                </div>
                                <div className="col form-group w-50 mb-3">
                                    <label htmlFor="sel1">Category:</label>
                                    <select className="form-control" id="" value={productDetails?.category} name='category' onChange={handelData}>
                                        <option value="">Select</option>
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="kids">Kid</option>
                                    </select>
                                </div>
                                <div className='col'>
                                    <label htmlFor="sel1">Sub Category:</label>
                                    <select className="form-control" id="" value={productDetails?.subcategory} name='subcategory' onChange={handelData}>
                                        <option value="">Select</option>
                                        <option value="shirt">Shirt</option>
                                        <option value="pant">Pant</option>
                                        <option value="jackets">Jacket</option>
                                        <option value="hat">Hat</option>
                                        <option value="kurta">Kurta</option>
                                        <option value="plant">Plants</option>
                                        <option value="tees">Tees</option>
                                        <option value="sneakers">Sneaker</option>
                                        <option value="perfume">Perfume</option>
                                        <option value="oil">Oil</option>
                                        <option value="watch">Watch</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Product Image</label>
                                    <input type="file" value={productDetails.file} onChange={(e) => { setProductDetails(productDetails => ({ ...productDetails, product_image: e.target.files[0] })) }} name="product_image" className="form-control" id="exampleInputPassword1" />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AddProduct;
