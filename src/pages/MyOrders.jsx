import api from "../api/axiosConfig.js";
import {useEffect, useState} from "react";
function MyOrders(){
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        const getOrders = async () => {
            try {
                const res = await api.get(`/orders/my`);
                setOrders(res.data);
                console.log(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getOrders();
    }, [])

    return (
        <>
            <div className="orders">
                {orders.map((order) => (
                    <div style={{"border": "2px solid black", "marginBottom": "10px", "cursor": "pointer"}} key={order.id}>
                        <p>{order?.id}</p>
                        {order?.items?.map((item)=>(
                            <div key={item.id}>
                                <p>{item?.productName}</p>
                                <p>{item.quantity}</p>
                                <p>£{item?.totalProductPrice}</p>
                            </div>
                        ))}
                        <p>{order?.status}</p>
                        <p>total price £{order?.price}</p>
                        <p>creation date {order?.creationDate}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
export default MyOrders;