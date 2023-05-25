import React from 'react';
import { Link } from 'react-router-dom';

function Category() {
    const values = [
        {
            name: "Men",
            image: "/men/banner-02.jpg.webp",
        },
        {
            name: "Women",
            image: "/women/banner-01.jpg",
        },
        {
            name: "Kids",
            image: "/kids/banner-04.jpg",
        },
        {
            name: "Accessories",
            image: "/accessories/hat/banner-03.jpg.webp",
        }
    ]
    return (<>
        {
            values.map((val, ind) => {
                return <div key={ind} className='col-xl-3 col-sm-12 col-md-4 border' style={{ margin: '10px', backgroundColor: "#fff" }}>
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        <Link to={`/searchProduct/${val.name}`} >
                            <img src={`../img/${val.image}`}
                                className="card-img-top  " alt={val.image} />
                        </Link>
                        <div className='banner-content'>
                            <h3>{val.name}</h3>
                        </div>
                    </div>
                </div >
            })
        }
    </>
    )
}
export default Category