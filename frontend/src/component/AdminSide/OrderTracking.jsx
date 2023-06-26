import axios from 'axios';
import React, { useEffect, useState } from 'react'
import configData from '../../environments/config.json';
import { useParams } from 'react-router-dom';
const OrderTracking = () => {
    const [getData, setData] = useState([]);
    const { id } = useParams();
    const getAll = async () => {
        const res = await axios.get(`${configData.baseUrl}/trackorder/${id}`);
        setData(res.data);
    }

    const handelChange = async (e) => {
        // const findId = await axios.get(`${configData.baseUrl}/trackorder/orderId/${id}`)
        // if (findId.data) {
        const key = e.target.name;
        const checked = e.target.checked ? 1 : 0;
        const data = {
            key, checked
        }
        const res = await axios.put(`${configData.baseUrl}/trackorder/${id}`, data)
        // }
    }
    useEffect(() => {
        getAll();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='container'>
            <table className="table mb-0">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>orderid </th>
                        <th>orderprocess </th>
                        <th>qualitycheck</th>
                        <th>shipped </th>
                        <th>Dispatched</th>
                        <th>Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getData.map((val, ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{ind + 1}</td>
                                    <td value={val.orderid}>{val.orderid}</td>
                                    <td>
                                        <div class="form-check form-switch" style={{ paddingLeft: '5.25rem' }}>
                                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.orderProcess === true} name='orderProcess' value={val.orderProcess} onChange={handelChange} />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-check form-switch" style={{ paddingLeft: '5.25rem' }}>
                                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.qualitycheck === true} name='qualitycheck' value={val.qualitycheck} onChange={handelChange} />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-check form-switch" style={{ paddingLeft: '5.25rem' }}>
                                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.shipped === true} name='shipped' value={val.shipped} onChange={handelChange} />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-check form-switch" style={{ paddingLeft: '5.25rem' }}>
                                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.dispatched === true} name='dispatched' value={val.dispatched} onChange={handelChange} />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-check form-switch" style={{ paddingLeft: '5.25rem' }}>
                                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={val.delivered === true} name='delivered' value={val.delivered} onChange={handelChange} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div >
    )
}

export default OrderTracking
