import {useEffect, useState} from "react";
import api from "../api/axiosConfig.js";
import {useNavigate} from "react-router-dom";

function Cart(){
    const [cart,setCart] = useState(null);
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();

    const fetchCart = async () => {
        try{
            const res = await api.get(`/cart/get`);
            setCart(res.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchCart();
    }, []);

    const deleteItem = async (id) => {
        try{
            const res = await api.delete(`/cart/remove/${id}`);
            console.log(res.data);
            setCart(res.data);
            fetchCart();
        }
        catch(error){
            console.log(error);
        }

    }

    const updateQuantity = async (id, quantity) => {
        try {
            const res = await api.post(`/cart/update/${id}?quantity=${quantity}`);
            console.log(res.data);
            setCart(res.data);
            fetchCart();
        }

        catch(error){
            console.log(error);
        }
    }
    const gotocheckout = () => {
        navigate("/checkout");
    }

    return (
        <>
            <h1>{cart?.totalPrice}</h1>
            <div>
                {cart?.items?.map((ite) => (
                    <div style={{"border": "2px solid black", "marginBottom": "10px", "cursor": "pointer"}}
                         key={ite?.productId}>
                        <p>{ite?.name}</p>
                        <p>{ite?.quantity}</p>
                        <p>{ite?.productId}</p>
                        <input
                            type="number"
                            min="1"
                            value={quantities[ite.productId] || ite.quantity}
                            onChange={(e) =>
                                setQuantities({
                                    ...quantities,
                                    [ite.productId]: Number(e.target.value)
                                })}
                        />
                        <button onClick={() => updateQuantity(
                            ite.productId, quantities[ite.productId] || ite.quantity)}>Update Quantity
                        </button>
                        <button onClick={() => deleteItem(ite.productId)}>Delete {ite.name}
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={gotocheckout}>Go to checkout</button>
        </>
    )
}
export default Cart;