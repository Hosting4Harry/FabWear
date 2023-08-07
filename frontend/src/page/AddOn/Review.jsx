import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating';
import './Review.css'
import configData from '../.././environments/config.json'
import useAuth from '../../context/useAuth';

function Review() {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewData, setReviewData] = useState([]);
    const { id: productId } = useParams();
    const instance = useAuth()
    const navigate = useNavigate();
    const onSub = (e) => {
        e.preventDefault();
        const data = {
            productId: +productId,
            userId: localStorage.getItem('EcomUserId'),
            review: review,
            userName: localStorage.getItem('EcomUser'),
            stars: rating
        }
        instance.post(`${configData.baseUrl}/review`, data)
            .then(response => {
                if (response.status) {
                    alert("thanks for your valueable review");
                    window.location.reload();
                    window.scrollTo(0, 0);
                }
            }).catch(err => {
                alert('please login')
                navigate('/')
            })
    }
    const getReviews = () => {
        axios(`${configData.baseUrl}/review/` + productId)
            .then(response => {
                setReviewData(response.data.reviewData)
            })
    }
    console.log(rating)
    useEffect(() => {
        getReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId])
    return (<>

        {reviewData && <div className="container w-70">
            <table className='table'>
                <tbody>
                    {
                        reviewData.map((item, i) => {
                            return (
                                <tr><td className=" mb-4">
                                    <img src={`https://picsum.photos/200/300?random=${i + 1}`}
                                        className="rounded-circle " width="70" height="70" alt='no_img' />
                                </td>
                                    <td>
                                        <h5 className="mb-3">{item.userName}</h5>
                                        <small className="text-primary mb-3">Customer</small>
                                    </td>
                                    <td>
                                        <i className="fas fa-quote-left pe-2"></i>{item.review}
                                    </td>
                                    <td>  <ul className="list-unstyled d-flex justify-content-center mb-0">
                                        {[...Array(item.stars)].map((star, index) => {
                                            return (
                                                <li>
                                                    <i className="fas fa-star fa-sm text-warning"></i>
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
        }
        {
            reviewData.length === 0 &&
            <div className='container my-5' style={{ height: "" }}>
                <h2>No reviews yet..</h2>
                <h3>Be the first one to review</h3>
            </div>
        }
        <div className='container container2'>
            <div className="mx-12 mx-sm-auto">
                <div className="card bordered">
                    <form className="px-2" onSubmit={onSub}>
                        <div className="card-body">
                            <div className='d-flex'>
                                <i className="fas fa-star fa-2x mb-3 text-warning"> </i>
                                <h2>Write a review</h2>
                            </div>

                            <p className="text-center"><strong>What do you think about the product?</strong></p>
                            <h1 className='text-center'>
                                <StarRating rating={rating} setRating={setRating}></StarRating>
                            </h1>
                            <div className="">
                                <textarea className="form-control bordered border-black" id="form4Example6" rows="7" placeholder='Type your valueable review here:' defaultValue={review} onChange={(e) => setReview(e.target.value)} required></textarea>
                                <label className="form-label" for="form4Example6"></label>
                            </div>
                            <div className=" text-end mb-2">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    </>
    )
}

export default Review