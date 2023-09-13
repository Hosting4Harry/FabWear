import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataContext';
import useAuth from '../../context/useAuth';
import configData from '../../environments/config.json';

function AllUser() {
    const { totalUser, setTotalUser } = useContext(DataContext);
    const instance = useAuth();

    const userData = async () => {
        const allUser = await instance.get(`${configData.baseUrl}/register/allUsers`);

        setTotalUser(allUser.data);
    }
    useEffect(() => {
        userData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <div className="card">
                <div className="card-header row d-flex p-3">
                    <div className='d-flex col-6'>
                        <i className="fas fa-tasks me-2"></i> <h5>User List</h5>
                    </div>
                    <div className="d-flex col-6 justify-content-end align-items-center  " style={{ position: 'absolute', right: "0px" }}>
                    </div>
                </div>
                <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "50rem" }}>
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th >UserName</th>
                                <th >Email</th>
                                <th >Date/Time</th>
                            </tr>
                        </thead>
                        <tbody className='scrollbar'>
                            {
                                totalUser.map((val, ind) => {
                                    return (
                                        <tr key={ind} className="fw-normal">
                                            <td>{ind + 1}</td>
                                            <td>{val.username}</td>
                                            <td>{val.email}</td>
                                            <td>{val.updatedAt.replace('T', '/').split('.')[0]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllUser