import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../api/axiosConfig.js";

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
            <h1>{item?.id}</h1>
            <h1>{item?.name}</h1>
            <h1>{item?.description}</h1>
            <h1>{item?.price}</h1>
            <input value={quantity}
                   onChange={(e) => setQuantity(e.target.value)}
                   type="number"
                   min="1"
                   required
            />
            <button onClick={addToCart}>Add to cart</button>
            <h1>{cart?.totalPrice}</h1>
            <div>
                {cart?.items?.map((ite) => (
                    <div key={ite?.id}>
                        <p>{ite?.name}</p>
                        <p>{ite?.quantity}</p>
                    </div>
                ))}
            </div>
            <button onClick={goToCart}>My cart</button>
        </>
    )
}
export default ProductDetails;