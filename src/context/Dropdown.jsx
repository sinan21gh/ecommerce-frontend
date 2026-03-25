import {useNavigate} from "react-router-dom";
import userIcon from "../assets/usericon.png";
import "../Navbar.css";

function Dropdown(){
    const navigate = useNavigate();

    function GoTo(link){
        navigate(`/${link}`);
    }

    const token = localStorage.getItem("token");

    let isAdmin = false;
    let number = false;

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            isAdmin = payload.authorities?.includes("ROLE_ADMIN");
        } catch (e) {
            isAdmin = false;
        }
    }


    return (
    <nav className="navbar">
        <div className="navbar-left" onClick={() => GoTo("products")}>
            <span className="logo">My E Commerce App</span>
        </div>

        <ul className="navbar-links">
            {!token && (
                <li onClick={() => GoTo("register")}>Register</li>
            )}
            {!token && (
                <li onClick={() => GoTo("login")}>Login</li>
            )}

            <li onClick={() => GoTo("products")}>Products</li>
            <li onClick={() => GoTo("cart")}>Cart</li>
            <li onClick={() => GoTo("checkout")}>Checkout</li>

            {!isAdmin && token && (
                <li onClick={() => GoTo("myorders")}>My Orders</li>
            )}

            {isAdmin && (
                <li onClick={() => GoTo("adminorders")}>Admin Orders</li>
            )}

            {isAdmin && (
                <li onClick={() => GoTo("adminproducts")}>Admin Products</li>
            )}

            {token && (
                <li className="profile-icon" onClick={() => GoTo("profile")}>
                    <img src={userIcon} alt="Profile" />
                </li>
            )}
        </ul>
    </nav>
);

}
export default Dropdown
