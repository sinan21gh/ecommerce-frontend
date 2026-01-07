import api from "../api/axiosConfig.js";
import { useEffect, useState } from "react";
function Products() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [name, setName] = useState("");
    const [minprice, setMinprice] = useState(0);
    const [maxprice, setMaxprice] = useState(1000000000);

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



    return (
        <>
            <div>
                {products.map(product => (
                    <div className="card" key={product.id}>
                        <h3>{product.name}</h3>
                        <p>£{product.price}</p>
                    </div>
                ))}

                <div>
                    <button disabled={page === 0} onClick={() => setPage(page - 1)}>
                        Previous
                    </button>

                    <span> Page {page + 1} of {totalPages} </span>

                    <button
                        disabled={page + 1 >= totalPages}
                        onClick={() => setPage(page + 1)}>Next</button>
                </div>
            </div>
            <input
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
            />
            <input
                value={minprice}
                type="number"
                onChange={(e) => setMinprice(e.target.value)}
                placeholder="min price"
            />
            <input
                value={maxprice}
                type="number"
                onChange={(e) => setMaxprice(e.target.value)}
                placeholder="max price"
            />
        </>
    );
}

export default Products;
