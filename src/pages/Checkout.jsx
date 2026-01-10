import api from "../api/axiosConfig.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
function Checkout(){
    const [cart,setCart] = useState(null);
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

    const placeOrder = async () => {
        try{
            const res = await api.post(`/orders/place`);
            console.log(res.data);
            navigate("/myorders");
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <p>Total price: £{cart?.totalPrice}</p>
                <button disabled={!cart || cart.items?.length === 0} onClick={placeOrder}>Place order</button>
                <button  onClick={placeOrder}>Place order</button>
            </div>
        </>
    )

}
export default Checkout;