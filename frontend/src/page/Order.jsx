import React from 'react'
import { useNavigate } from 'react-router-dom'

const Order = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* schema
        userId,address,paymentId,createat,delivered(bool) */}
            <div className='cart'>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div>

                        <h2>You Not Yet Placed Any Order</h2>
                        <img src="../img/empty-cart.png" alt="emptybag" />
                        <h5>Let's grab your favourite product</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button className="btn btn-info" onClick={() => navigate('/products')}>Continue Shopping</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Order
