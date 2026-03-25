import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../api/axiosConfig.js";
import Dropdown from "../context/Dropdown.jsx";
import "../ProductDetails.css";
function ProductDetails(){
    const param = useParams();
    const id = param.id;
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await api.get(`/products/get/${id}`);
                setItem(response.data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    const addToCart = async () => {
        try{
            const res = await api.post(`/cart/add/${id}?quantity=${quantity}`);
            setCart(res.data);
        }
        catch(error){
            console.log(error);
        }
    }
    const goToCart = () => {
        navigate(`/cart`);
    }
    return (
        <>
            <Dropdown />

            <div className="product-page">
                <div className="product-card">
                    <div className="product-info">
                        <h1 className="product-name">{item?.name}</h1>
                        <p className="product-description">{item?.description}</p>
                        <p className="product-price">£{item?.price}</p>

                        <div className="product-actions">
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="quantity-input"
                            />
                            <button className="add-to-cart-btn" onClick={addToCart}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {cart && (
                    <div className="cart-preview">
                        <h3>Cart Summary</h3>
                        <p className="cart-total">Total: £{cart.totalPrice}</p>

                        {cart.items.map((ite) => (
                            <div className="cart-item" key={ite.id}>
                                <span>{ite.name}</span>
                                <span>x{ite.quantity}</span>
                            </div>
                        ))}

                        <button className="go-to-cart-btn" onClick={goToCart}>
                            View Cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
export default ProductDetails;