import React, { useEffect, useState } from 'react'
import './TrackOrder.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import configData from '../../environments/config.json';
function TrackOrder() {
    const [date, setDate] = useState('');
    const [step, setStep] = useState()
    const { id } = useParams();

    const trackingDetail = async () => {
        const res = await axios.get(`${configData.baseUrl}/trackorder/${id}`);
        setStep(res.data[0]);
        onDayClick(res?.data[0]?.createdAt);
    }

    const status = () => {
        if (step) {
            if (step.delivered) return "Product Delivered"
            if (step.dispatched) return "Product Dispatched"
            if (step.shipped) return "Product shipped"
            if (step.qualitycheck) return "Quality Check"
            if (step.orderProcess) return "Processing Order"
            if (step) return "Confirmed Order"
        }
    }

    const onDayClick = (date) => {
        const dt = new Date(date);
        dt.setDate(dt.getDate() + 7);
        const month = dt.getMonth();
        const year = dt.getFullYear();
        const day = dt.getDate()
        const dateMonthYear = new Date(year, month, day);

        setDate(str(day) + ' ' + dateMonthYear.toLocaleDateString('en-GB', { month: 'long' }) + ' ' + year)
        return;
    }
    const str = (day) => {

        if (day >= 11 && day <= 13) {
            return day + 'th';
        }
        switch (day % 10) {
            case 1:
                return day + 'st';
            case 2:
                return day + 'nd';
            case 3:
                return day + 'rd';
            default:
                return day + 'th';
        }
    }

    useEffect(() => {
        trackingDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="container mt-3">
                <div className=" padding-bottom-3x mb-1">
                    <div className="card mb-3">
                        <div className="p-4 text-center text-white text-lg bg-dark rounded-top"><span className="text-uppercase">Tracking Order No - </span><span className="text-medium">001698653lp</span></div>
                        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Shipped Via:</span> UPS Ground</div>
                            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span> {status()}</div>
                            <div className="w-100 text-center py-1 px-2"><span className="text-medium">{step?.delivered ? "Delivered Date" : "Expected Date"}</span> : {date}</div>
                        </div>
                        <div className="card-body">
                            {step &&
                                <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                                    <div className="step completed">
                                        <div className="step-icon-wrap">
                                            <div className="step-icon"><i className="pe-7s-cart"></i></div>
                                        </div>
                                        <h4 className="step-title">Confirmed Order</h4>
                                    </div>
                                    <div className={step.orderProcess ? "step completed" : "step"} >
                                        <div className="step-icon-wrap">
                                            <div className="step-icon"><i className="pe-7s-config"></i></div>
                                        </div>
                                        <h4 className="step-title">Processing Order</h4>
                                    </div>
                                    <div className={step.qualitycheck ? "step completed" : "step"}>
                                        <div className="step-icon-wrap">
                                            <div className="step-icon"><i className="pe-7s-medal"></i></div>
                                        </div>
                                        <h4 className="step-title">Quality Check</h4>
                                    </div>
                                    <div className={step.shipped ? "step completed" : "step"}>
                                        <div className="step-icon-wrap">
                                            <div className="step-icon"><i className="pe-7s-gift"></i></div>
                                        </div>
                                        <h4 className="step-title">Product shipped</h4>
                                    </div>
                                    <div className={step.dispatched ? "step completed" : "step"}>
                                        <div className="step-icon-wrap">
                                            <div className="step-icon"><i className="pe-7s-car"></i></div>
                                        </div>
                                        <h4 className="step-title">Product Dispatched</h4>
                                    </div>
                                    <div className={step.delivered ? "step completed" : "step"}>
                                        <div className="step-icon-wrap">
                                            <div className="step-icon"><i className="pe-7s-home"></i></div>
                                        </div>
                                        <h4 className="step-title">Product Delivered</h4>
                                    </div>
                                </div>



                            }
                        </div>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                        <div className="custom-control custom-checkbox mr-3">
                            <input className="custom-control-input" type="checkbox" id="notify_me" checked={true} />
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