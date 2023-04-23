import axios from 'axios';
import React, { useState } from 'react'
import StarRating from './StarRating';

function FeedBack() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedBack] = useState('');
    const onSub = (e) => {
        debugger
        e.preventDefault();
        const data = {
            userId: localStorage.getItem('EcomUserId'),
            feedBack: feedback,
            stars: rating,
            userName: localStorage.getItem('EcomUser')
        }
        axios.post('http://localhost:8000/feedback', data)
            .then(response => {
                if (response.status) {
                    alert("thanks for your valueable review");
                    window.location.reload();
                    window.scrollTo(0, 0);
                }
            })
    }
    return (
        <div className='container container2 mt-5' style={{ marginBottom: "200px" }}>
            <div className="mx-12 mx-sm-auto">
                <div className="card bordered">
                    <form className="px-2" onSubmit={onSub}>
                        <div className="card-body">
                            <div className='d-flex'>
                                <i class="far fa-file-alt fa-3x mb-3 text-primary"> </i>
                                <h1>FeedBack</h1>
                            </div>

                            <p className="text-center"><strong>Your opinion matters
                            </strong></p>
                            <p className="text-center">Have some ideas how to improve our product? Give us your feedback.</p>
                            <h1 className='text-center'>
                                <h4>   Your rating:</h4> <StarRating rating={rating} setRating={setRating}></StarRating>
                            </h1>
                            <div className="">
                                <textarea className="form-control bordered border-black" id="form4Example6" rows="6" placeholder='Type your valueable feed here:' defaultValue={feedback} onChange={(e) => setFeedBack(e.target.value)} required></textarea>
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
    )
}

export default FeedBack