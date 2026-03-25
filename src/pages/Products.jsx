import api from "../api/axiosConfig.js";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Dropdown from "../context/Dropdown.jsx";
import "../Products.css";
function Products() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [name, setName] = useState("");
    const [minprice, setMinprice] = useState(null);
    const [maxprice, setMaxprice] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/products/search`, {
                    params: {
                        name: name,
                        minprice: minprice,
                        maxprice: maxprice,
                        page: page,
                        size: 2
                    }
                });

                setProducts(res.data.products);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [page, name, minprice, maxprice]);

    const goToProduct = (product) => {
        navigate(`/products/${product.id}`);
    }



    return (
    <>
        <Dropdown />

        <div className="products-container">

            <div className="filters">
                <input
                    value={name}
                    type="text"
                    onChange={(e) => {
                        setPage(0);
                        setName(e.target.value);
                    }}
                    placeholder="Search products"
                />

                <input
                    value={minprice || ""}
                    type="number"
                    onChange={(e) => {
                        setPage(0);
                        setMinprice(e.target.value);
                    }}
                    placeholder="Min price"
                />

                <input
                    value={maxprice || ""}
                    type="number"
                    onChange={(e) => {
                        setPage(0);
                        setMaxprice(e.target.value);
                    }}
                    placeholder="Max price"
                />
            </div>

            <div className="products-grid">
                {products.map(product => (
                    <div
                        className="product-card"
                        key={product.id}
                        onClick={() => goToProduct(product)}
                    >
                        <h3>{product.name}</h3>
                        <p className="price">£{product.price}</p>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button disabled={page === 0} onClick={() => setPage(page - 1)}>
                    Previous
                </button>

                <span> Page {page + 1} of {totalPages} </span>

                <button
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>

        </div>
    </>
);

}

export default Products;
