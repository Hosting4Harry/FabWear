import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CardProducts from '../component/CardProducts';
import { DataContext } from '../context/DataContext';

function SearchProducts() {
    const { searchResult, setSearchResult } = useContext(DataContext);
    const { name } = useParams();
    debugger
    const getData = async (name) => {
        await axios.get('http://localhost:8000/product/searchProduct/' + name)
            .then(response => {
                setSearchResult(response.data);
            }).catch(error => {
                if (error)
                    setSearchResult([]);

            })
    }
    useEffect(() => {
        getData(name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])


    if (!searchResult.length) {
        return (
            <h1>Loading..</h1>
        )
    } else {
        return <section style={{ backgroundColor: "#eee" }}>
            <div className="container py-5">
                <div className="row">
                    {searchResult.map((item, i) => {
                        return (<CardProducts
                            key={i}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            product_image={item.product_image}
                        />
                        )
                    })}
                </div>
            </div>
        </section>


    }


}

export default SearchProducts