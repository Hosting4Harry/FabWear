import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardProducts from '../component/CardProducts';
import { DataContext } from '../context/DataContext';
import configData from '../environments/config.json'

function SearchProducts() {
    const { searchResult, setSearchResult, setLoading } = useContext(DataContext);
    const { name } = useParams();
    const getData = async (name) => {
        setLoading(true);
        await axios.get(`${configData.baseUrl}/product/searchProduct/` + name)
            .then(response => {
                setLoading(false);
                setSearchResult(response.data);
            }).catch(error => {
                if (error)
                    setSearchResult([]);
            })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getData(name);
        // document.getElementById("searchList").style.display = "none";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])
    if (!searchResult.length) {
        return (<section className='mt-5 pt-5 ps-1 ' style={{ height: "100vh" }}>
            <h1>Loading..</h1>
        </section>
        )
    } else {
        return <section className='pt-5' style={{ backgroundColor: "#eee" }}>
            <div className="container py-5">
                <div className="row">
                    {searchResult.map((item, i) => {
                        if (item.product_image.split('/')[0] === name.toLocaleLowerCase()) {
                            return (<CardProducts
                                key={i}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                product_image={item.product_image}
                            />
                            )
                        } else if ((item.product_image.split('/')[1] === name.toLocaleLowerCase())) {
                            return (<CardProducts
                                key={i}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                product_image={item.product_image}
                            />
                            )
                        } else if ((item.product_image.split('/')[2] === name.toLocaleLowerCase())) {
                            return (<CardProducts
                                key={i}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                product_image={item.product_image}
                            />
                            )
                        } else if ((item.product_image.split('/')[3] === name.toLocaleLowerCase())) {
                            return (<CardProducts
                                key={i}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                product_image={item.product_image}
                            />
                            )
                        } else if ((item.product_image.includes(name.toLocaleLowerCase()))) {
                            return (<CardProducts
                                key={i}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                product_image={item.product_image}
                            />)
                        }
                    })}
                </div>
            </div>
        </section>
    }
}

export default SearchProducts