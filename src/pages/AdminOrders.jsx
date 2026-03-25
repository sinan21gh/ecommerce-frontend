import api from "../api/axiosConfig.js";
import "../index.css"
import {useState} from "react";
function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [id, setId] = useState(null);
    const [status, setStatus] = useState(null);
    const [order, setOrder] = useState({});

    const getOrders = async () => {
        try {
            const res = await api.get(`/orders/getorders`);
            setOrders(res.data);
            setOrder(null)
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const updateOrder = async () => {
        try {
            const res = await api.post(`/orders/updateorders/${id}`, {status});
            setOrder(res.data);
            setOrders(null);
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="admin-container">
            <div className="admin-controls">
                <button onClick={getOrders}>get all orders</button>
                <input
                type="number"
                value={id}
                onChange={(e) => {setId(e.target.value)}}
                />
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="">Select status</option>
                    <option value="PLACED">PLACED</option>
                    <option value="PAID">PAID</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="COMPLETED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>

                <button disabled={!id || id <=0 || !status} onClick={updateOrder}>update order</button>
            </div>

            <div className="admin-orders">
                {orders?.map(orderr => (
                    <div className="admin-order-card" key={orderr.id}>
                        <h4>Order #{orderr.id}</h4>
                        <div className="admin-order-items">
                            {orderr.items.map(item => (
                                <div key={item.id}>
                                    <span>{item.productName}</span>
                                    <span>x{item.quantity}</span>
                                    <span>£{item.totalProductPrice}</span>
                                </div>
                            ))}
                        </div>
                        <p>Status: <b>{orderr.status}</b></p>
                        <p>Total: £{orderr.price}</p>
                        <p>{new Date(orderr.creationDate).toUTCString()}</p>
                    </div>
                ))}
            </div>


            <div className="admin-preview">
                {order?.items?.map((item)=>(
                    <div key={item.id}>
                        <p>{item?.productName}</p>
                        <p>{item.quantity}</p>
                        <p>£{item?.totalProductPrice}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AdminOrders;