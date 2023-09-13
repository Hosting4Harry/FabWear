import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Review.css';
import configData from '../.././environments/config.json';
// import useAuth from '../../context/useAuth';
import Reply from './Reply';
import EmojiPicker from 'emoji-picker-react';
import { DataContext } from '../../context/DataContext';
import moment from 'moment';

function Review() {
    const { review, setReview, userData, setUserData } = useContext(DataContext);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    // const [rating, setRating] = useState(0);
    const [flag, setFlag] = useState(0);
    const [reviewData, setReviewData] = useState([]);
    const { id: productId } = useParams();
    // const instance = useAuth();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const onSub = async (e) => {
        e.preventDefault();
        let data;
        let config;
        if (userData.user_id) {
            data = {
                commentId: userData.commentId ? userData.commentId : userData.id,
                productId: +productId,
                user_id: localStorage.getItem('EcomUserId'),
                username: localStorage.getItem('EcomUser'),
                reply: review
                // userName: localStorage.getItem('EcomUser'),
                // stars: rating
            }
            config = `${configData.baseUrl}/commentReply`;
        } else {
            data = {
                productId: +productId,
                user_id: localStorage.getItem('EcomUserId'),
                username: localStorage.getItem('EcomUser'),
                comment: review,
                replyCount: 0
                // stars: rating
            }
            config = `${configData.baseUrl}/comment`;
        }

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(config, data);
         
            setUserData({});
            setReview('');
            alert("thanks for your valuable review");
            setFlag(flag + 1);
            // window.location.reload();
        } catch (err) {
            alert('please login');
            navigate('/');
        }
    }
    // const getReviews = () => {
    //     axios(`${configData.baseUrl}/review/` + productId)
    //         .then(response => {
    //             setReviewData(response.data.reviewData);
    //         })
    // }

    const getComments = () => {
        axios.get(`${configData.baseUrl}/comment/` + productId)
            .then(response => {
                setReviewData(response.data.reviewData);
                setReview('');
                setUserData({});
            })
    }

    const focusInput = (i) => {
        if (inputRef.current) {
            setReview('@' + i.username + ' ');
            setUserData(i);
            inputRef.current.focus();
        }
    };

    const handleEmojiClick = (emoji) => {
        const emojiCode = emoji.emoji;
        setReview(review + emojiCode);
        setShowEmojiPicker(!showEmojiPicker);
    };


    useEffect(() => {
        getComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId, flag]);

    return (
        <div style={{ backgroundColor: '#fff', paddingBottom: '100px' }} className='container'>
            <div>
                <h3 style={{ textDecoration: 'underline' }}>
                    Comments:-
                </h3>
            </div>
            {
                reviewData.length === 0 &&
                <div className='container ' style={{ height: "" }}>
                    <h2>
                        No comments yet..
                    </h2>
                    <h3>
                        Be the first one to comment
                    </h3>
                </div>
            }
            {
                reviewData && <small>
                    <div className="container w-70" style={{ paddingBottom: '10px', height: '50vh' }} >
                        <table className='table'>
                            <tbody>
                                {
                                    reviewData.map((item, i) => {
                                        return (<tr key={i}>
                                            <td className=" mb-4">
                                                <img src={`https://picsum.photos/200/300?random=${i + 1}`}
                                                    className="rounded-circle " width="70" height="70" alt='no_img' />
                                            </td>
                                            <td>
                                                <h5 className="mb-3">
                                                    <b>{item.username}</b>
                                                    <sup className="text-primary mb-3">
                                                        (Customer)
                                                    </sup>
                                                    <small>
                                                        &nbsp;{moment(item.createdAt).fromNow()}
                                                    </small>
                                                </h5>
                                                <Reply item={item} refs={inputRef} flag={flag}></Reply>

                                            </td>
                                            <td>
                                                {/* <Reply item={item} refs={inputRef} flag={flag}></Reply> */}
                                            </td>
                                            <td>
                                                <button className='' onClick={() => focusInput(item)}>
                                                    <i className="fa fa-reply text-center" aria-hidden="true" style={{ fontSize: '16px' }}>
                                                        &nbsp;
                                                        Reply
                                                    </i>
                                                </button>
                                            </td>
                                            {/* <td>  <ul className="list-unstyled d-flex justify-content-center mb-0">
                                            {[...Array(item.stars)].map((star, index) => {
                                                return (
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-warning"></i>
                                                    </li>
                                                )
                                            })
                                            }
                                        </ul>
                                        </td> */}
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </small>
            }
            {
                showEmojiPicker &&
                (
                    <EmojiPicker onEmojiClick={handleEmojiClick} title="Pick your emoji" emoji="point_up" />

                )}
            <div className='container container2'>
                <div className="mx-12 mx-sm-auto">
                    <div className="card bordered">
                        <form className="px-2" onSubmit={onSub}>
                            <div className="card-body">
                                <div className='d-flex'>
                                    {/* <i className="fas fa-star fa-2x mb-3 text-warning"> </i> */}
                                    <h2>
                                        Write a
                                        {userData.user_id ? 'Reply' : 'Comment'}
                                    </h2>
                                    &nbsp;
                                    <i className="fas fa-comment fa-2x mb-3 text-dark"> </i>
                                </div>

                                {/* <p className="text-center"><strong>What do you think about the product?</strong></p>
                            <h1 className='text-center'>
                                <StarRating rating={rating} setRating={setRating}></StarRating>
                            </h1> */}

                                <div className="d-flex">
                                    <button className="emoji-button rounded" style={{ backgroundColor: 'aqua' }} type='button' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                        😄
                                    </button>
                                    <input
                                        className="form-control bordered border-black comment-input"
                                        ref={inputRef}
                                        id="form4Example6"
                                        placeholder="Type your comment here:"
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        maxLength={200}
                                        required
                                    />
                                    <button type="submit" className=" btn btn-sm btn-primary">
                                        <i className="fa fa-paper-plane" ></i>
                                    </button>
                                </div>
                                {/* <div className=" text-end mb-2">
                                <button type="submit" className=" btn btn-sm btn-primary"><i class="fa fa-paper-plane" ></i></button>
                            </div> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Review