import React from 'react'
import { CChart } from '@coreui/react-chartjs'

function Dashboard() {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className='col'>

                    </div>
                    <div className='col'>
                        <div className='container' style={{ height: "400px", width: "400px" }}>
                            <CChart
                                type="doughnut"
                                data={{
                                    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                                    datasets: [
                                        {
                                            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                            data: [40, 20, 80, 10],
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard