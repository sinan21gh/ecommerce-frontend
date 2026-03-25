import {useLocation, useNavigate} from "react-router-dom";
import api from "../api/axiosConfig.js";
import "../Login.css";
function Verify(){

    const resend = async () => {
        await api.post("/users/resendverification", {email});
    }

    const location = useLocation();
    const email = location.state?.email;
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Verify Your Email</h1>
                <p className="auth-message">We’ve sent a verification link to:<br />
                <b>{email}</b></p>
                <p className="auth-subtext">The verification link will expire in 1 hour.</p>
                <button onClick={resend} className="primary-btn">Resend Verification Email</button>
            </div>
      </div>
    );

}
export default Verify;