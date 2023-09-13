import axios from 'axios';
import React, { useEffect, useState } from 'react'
import configData from '../../environments/config.json';

const OrderTracking = () => {
    const [getData, setData] = useState([]);
    const getAll = async () => {
        
        const res = await axios.get(`${configData.baseUrl}/trackorder`);
        setData(res.data);
    }

    const handelChange = async (val, e) => {
        const key = e.target.name;
        const id = val.id;
        var data;
        if (e.target.checked) {
            data = {
                orderProcess: 0,
                qualitycheck: 0,
                shipped: 0,
                dispatched: 0,
                delivered: 0,
            };
            if (key === "delivered") {
                data.orderProcess = data.qualitycheck = data.shipped = data.dispatched = data.delivered = 1;
            } else if (key === "dispatched") {
                data.orderProcess = data.qualitycheck = data.shipped = data.dispatched = 1;
            } else if (key === "shipped") {
                data.orderProcess = data.qualitycheck = data.shipped = 1;
            } else if (key === "qualitycheck") {
                data.orderProcess = data.qualitycheck = 1;
            }
        } else {
            data = {
                orderProcess: 1,
                qualitycheck: 1,
                shipped: 1,
                dispatched: 1,
                delivered: 1,
            };
            if (key === "delivered") {
                data.delivered = 0;
            } else if (key === "dispatched") {
                data.dispatched = data.delivered = 0;
            } else if (key === "shipped") {
                data.shipped = data.dispatched = data.delivered = 0;
            } else if (key === "qualitycheck") {
                data.qualitycheck = data.shipped = data.dispatched = data.delivered = 0;
            }
        }
        await axios.put(`${configData.baseUrl}/trackorder/${id}`, data);
    };

    useEffect(() => {
        getAll();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='container'>
            <table className="table mb-0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order Image</th>
                        <th>orderprocess </th>
                        <th>qualitycheck</th>
                        <th>shipped </th>
                        <th>Dispatched</th>
                        <th>Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    {getData &&
                        getData.map((val, ind) => {
                            return (
                                <tr key={ind} style={{ height: '90px' }}>
                                    <td>{ind + 1}</td>
                                    <td ><img src={'/img/' + val.product_image} alt="" height='80px' width='80px' /></td>
                                    <td>
                                        <div className="form-check form-switch" style={{ paddingLeft: '5.25rem', overflowY: 'hidden' }}>
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.orderProcess} name='orderProcess' value={val.orderProcess} onChange={(e) => handelChange(val, e)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch" style={{ paddingLeft: '5.25rem', overflowY: 'hidden' }}>
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.qualitycheck} name='qualitycheck' value={val.qualitycheck} onChange={(e) => handelChange(val, e)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch" style={{ paddingLeft: '5.25rem', overflowY: 'hidden' }}>
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.shipped} name='shipped' value={val.shipped} onChange={(e) => handelChange(val, e)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch" style={{ paddingLeft: '5.25rem', overflowY: 'hidden' }}>
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.dispatched} name='dispatched' value={val.dispatched} onChange={(e) => handelChange(val, e)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch" style={{ paddingLeft: '5.25rem', overflowY: 'hidden' }}>
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.delivered} name='delivered' value={val.delivered} onChange={(e) => handelChange(val, e)} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default OrderTracking
