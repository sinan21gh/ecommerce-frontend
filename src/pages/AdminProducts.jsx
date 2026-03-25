import {useState} from "react";
import api from "../api/axiosConfig.js";
function AdminProducts(){
    const [product, setProduct] = useState(null);
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const createProduct = async () => {
        try {
            const res = await api.post(`/products/create`, {
                id: null,
                name: name,
                description: description,
                price: price,
                quantity: quantity,
            });
            setProduct(res.data);
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const updateProduct = async () => {
        try {
            const res = await api.patch(`/products/update/${id}`, {
                id: id,
                name: name,
                description: description,
                price: price,
                quantity: quantity,
            });
            setProduct(res.data);
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    const deleteProduct = async () => {
        try {
            const res = await api.delete(`/products/delete/${id}`);
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="product id"
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
            />
            <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"/>
            <input
            type="number"
            value={price}
            onChange={(e) => {setPrice(Number (e.target.value))}}
            placeholder="Product Price"/>
            <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Product Quantity"/>

            <button disabled={!name || !description || !price || !quantity} onClick={createProduct}>Add New Product</button>
            <button disabled={!id} onClick={updateProduct}>Update Product</button>
            <button disabled={!id} onClick={deleteProduct}>Delete Product</button>


            {product && (
                <div>
                    <p>{product?.id}</p>
                    <p>{product?.name}</p>
                    <p>{product?.description}</p>
                    <p>£{product?.price}</p>
                    <p>{product?.quantity}</p>
                </div>
            )}
        </>
    )
}
export default AdminProducts;