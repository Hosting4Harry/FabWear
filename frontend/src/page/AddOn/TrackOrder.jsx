import React, { useEffect, useState } from 'react'
import './TrackOrder.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import configData from '../../environments/config.json';
function TrackOrder() {
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [step, setStep] = useState([{
        orderProcess: false,
        qualitycheck: false,
        shipped: false,
        dispatched: false,
        delivered: false,
    }])
    const { id } = useParams();
    const getData = async () => {
        debugger
        const res = await axios.get(`http://localhost:8000/order/myOrder/${id}`);
        setData(res.data);
        trans();
    }
    const trackingDetails = async () => {
        const res = await axios.get(`${configData.baseUrl}/trackorder/${id}`)
        debugger
        setStep(res.data)
    }
    const check = (newDate) => {
        debugger
        if (date === newDate.split('T')[0]) {
            return true;
        } else {
            return false
        }
    }
    const trans = () => {
        debugger
        if (!data) return false;
        if (data !== []) setDate(data[0]?.updatedAt.split("T")[0]);
        const newDate = new Date(date);
        for (let i = 1; i <= 7; i++) {
            if (i === 1) {
                newDate.setDate(newDate.getDate() + i);
            }
            if (i === 3) {
                newDate.setDate(newDate.getDate() + i);

            }
            if (i === 6) {
                newDate.setDate(newDate.getDate() + i);

            }
            if (i === 7) {
                newDate.setDate(newDate.getDate() + i);

            }
        }
    }
    useEffect(() => {
        getData();
        trackingDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="container">
                <div className=" padding-bottom-3x mb-1">
                    <div className="card mb-3">
                        <div className="p-4 text-center text-white text-lg bg-dark rounded-top"><span className="text-uppercase">Tracking Order No - </span><span className="text-medium">001698653lp</span></div>
                        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Shipped Via:</span> UPS Ground</div>
                            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span> Checking Quality</div>
                            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Expected Date:</span> APR 27, 2021</div>
                        </div>
                        <div className="card-body">
                            {
                                step.map((val, ind) => {
                                    return (

                                        <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                                            <div className="step completed">
                                                <div className="step-icon-wrap">
                                                    <div className="step-icon"><i className="pe-7s-cart"></i></div>
                                                </div>
                                                <h4 className="step-title">Confirmed Order</h4>
                                            </div>
                                            <div className={step[ind].orderProcess ? "step completed" : "step"} >
                                                <div className="step-icon-wrap">
                                                    <div className="step-icon"><i className="pe-7s-config"></i></div>
                                                </div>
                                                <h4 className="step-title">Processing Order</h4>
                                            </div>
                                            <div className={step[ind].qualitycheck ? "step completed" : "step"}>
                                                <div className="step-icon-wrap">
                                                    <div className="step-icon"><i className="pe-7s-medal"></i></div>
                                                </div>
                                                <h4 className="step-title">Quality Check</h4>
                                            </div>
                                            <div className={step[ind].shipped ? "step completed" : "step"}>
                                                <div className="step-icon-wrap">
                                                    <div className="step-icon"><i className="pe-7s-gift"></i></div>
                                                </div>
                                                <h4 className="step-title">Product shipped</h4>
                                            </div>
                                            <div className={step[ind].dispatched ? "step completed" : "step"}>
                                                <div className="step-icon-wrap">
                                                    <div className="step-icon"><i className="pe-7s-car"></i></div>
                                                </div>
                                                <h4 className="step-title">Product Dispatched</h4>
                                            </div>
                                            <div className={step[ind].delivered ? "step completed" : "step"}>
                                                <div className="step-icon-wrap">
                                                    <div className="step-icon"><i className="pe-7s-home"></i></div>
                                                </div>
                                                <h4 className="step-title">Product Delivered</h4>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                        <div className="custom-control custom-checkbox mr-3">
                            <input className="custom-control-input" type="checkbox" id="notify_me" checked="" />
                            <label className="custom-control-label" htmlFor="notify_me">Notify me when order is delivered</label>
                        </div>
                        <div className="text-left text-sm-right"><button className="btn btn-outline-primary btn-rounded btn-sm" href="#">View Order Details</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackOrder