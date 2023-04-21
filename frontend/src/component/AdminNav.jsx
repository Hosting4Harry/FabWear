import React, { useEffect } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
// import { DataContext } from '../context/DataContext'
// import './AdminSide/Dashboard.css'

const AdminNav = () => {
    // const navigate = useNavigate();
    // const { setCart, setWishlist } = useContext(DataContext);
    // , searchResult, setSearchResult, setLoading
    // const [searchValue, setSearchValue] = useState("");

    // const submit = (e) => {
    //     e.preventDefault();
    //     navigate('/searchProduct/' + searchValue);
    //     setSearchValue('');
    // };
    // const submitForm = async (e) => {
    //     setSearchValue(e.target.value);
    //     setLoading(true);
    //     if (e.target.value === " ") return;
    //     await axios.get('http://localhost:8000/product/searchProduct/' + e.target.value)
    //         .then(response => {
    //             setLoading(false);
    //             setSearchResult(response.data);
    //             document.getElementById("searchList").style.display = "list-item";
    //         }).catch(error => {
    //             if (error)
    //                 setSearchResult([]);
    //             setSearchValue('');
    //         });
    // };
    // const hideList = () => {
    //     document.getElementById("searchList").style.display = "none";
    // }
    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    window.onscroll = () => {
        const btn = document.getElementById('button');
        if (window.scrollY <= 150) {
            document.getElementById('logo').style.color = 'inherit';
            document.getElementById('sideBar').style.display = 'block';
            // document.getElementById('searchform').style.display = 'block';
            document.querySelector('nav > label > i').style.display = 'initial';
            document.getElementById('nav').style.backgroundColor = '#012946';
        } else {
            document.getElementById('sideBar').style.display = 'none';
            document.getElementById('logo').style.color = '#08c3f1';
            document.getElementById('nav').style.backgroundColor = 'transparent';
            // document.getElementById('searchform').style.display = 'none';
            document.querySelector('nav > label > i').style.display = 'none';
        }
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }
    const scrollTop = () => {
        window.scrollTo(0, 0)
    }
    return (<>
        <div className="code-nav flex">
            <nav id="nav" className='right-nav flex'>
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="checkbtn">
                    <i className="fa fa-bars"></i>
                </label>
                <label className="logo">
                    <NavLink id="logo" to="/dashboard">Fab Wear</NavLink>
                </label>
                <label className='searchBar'>
                    {/* <form onSubmit={submit} id='searchform' className="searchForm">
                        <div className=' form-group '>
                            <div className='d-flex'>
                                <input type='text' size={30} id='searchbar' placeholder='Search for products, brands and more' defaultValue={searchValue} onChange={(e) => submitForm(e)} className='form-control form-group-sm' />
                                <button type='submit' className='btn btn-primary m-0' style={{ padding: "5px 15px", borderRadius: "5px" }}> <i className="fa fa-search"></i></button>
                            </div>
                            {searchResult.length > 0 &&
                                <div className='search_list' id='searchList' onMouseLeave={hideList} style={{ width: '320px', position: 'absolute', zIndex: 9999, display: 'block' }}>
                                    <ul className="list-group" style={{}}>
                                        {searchResult.map((item, i) => {
                                            return <li className="list-group-item" key={i}>
                                                <Link to={'/details/' + item.id} style={{ position: 'static', zIndex: 123 }}>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                    </form> */}
                </label>
                <ul className='flex' id='sideBar'>
                    <li>
                        <NavLink to="/admin/products" className=" position-relative me-3 ms-2">Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/addproduct" className=" position-relative me-3" >Add Product </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myaccount" className=" position-relative me-3" >User </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
        <i id='button' onClick={scrollTop}></i>

    </>
    )
}

export default AdminNav;
