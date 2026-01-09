import {useEffect, useState} from "react";
import api from "../api/axiosConfig.js";

function Cart(){
    const [cart,setCart] = useState(null);
    useEffect(()=>{
        const fetchCart = async () => {
            try{
                const res = await api.get(`/cart/get`);
                setCart(res.data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchCart();
    }, [cart]);

    const deleteItem = async (id) => {
        const res = await api.delete(`/cart/remove/${id}`);
    }

    return (
        <>
            <h1>{cart?.totalPrice}</h1>
            <div>
                {cart?.items?.map((ite) => (
                    <div key={ite?.id}>
                        <p>{ite?.name}</p>
                        <p>{ite?.quantity}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Cart;