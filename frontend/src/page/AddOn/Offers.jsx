import React from 'react'

function Offers() {
    return (
        <div className='row d-flex bg-light mb-3 shadow ' >
            <div className='col d-flex my-3'>
                <div className=''> <img src="../img/logo/truck-4.png" alt="" ></img></div>
                <div className=' pt-3'>
                    <h4 fontWeight="600" fontSize="17px" className="sc-96a18268-0 kgqhgk">Fast Delivery</h4>
                    <span fontSize="16px" color="grey.600" className="sc-96a18268-0 gUjlsQ">Start from ₹50</span>
                </div>
            </div>
            <div className='col d-flex border-left my-3'>
                <div className=''><img src="../img/logo/return-1.png" alt=""></img></div>
                <div className='pt-3'>
                    <h4 fontWeight="600" fontSize="17px" className="sc-96a18268-0 kgqhgk">Money Back Guarantee</h4>
                    <span fontSize="16px" color="grey.600" className="sc-96a18268-0 gUjlsQ">7 Days Return</span>
                </div>
            </div>
            <div className='col d-flex border-left my-3'>
                <div className=''><img src="../img/logo/stopwatch.png" alt=""></img></div>
                <div className='pt-3'>
                    <h4 fontWeight="600" fontSize="17px" className="sc-96a18268-0 kgqhgk">365 Days</h4>
                    <span fontSize="16px" color="grey.600" className="sc-96a18268-0 gUjlsQ">Customer Services</span>
                </div>
            </div>
            <div className='col d-flex border-left my-3 pt-1'>
                <div className=''><img src="../img/logo/payment.png" alt=""></img></div>
                <div className='pt-3'>
                    <h4 fontWeight="600" fontSize="17px" className="sc-96a18268-0 kgqhgk">Payment</h4>
                    <span fontSize="16px" color="grey.600" className="sc-96a18268-0 gUjlsQ">Secure System</span>
                </div>
            </div>

        </div>
    )
}

export default Offers