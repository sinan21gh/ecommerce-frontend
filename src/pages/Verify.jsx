import {useLocation, useNavigate} from "react-router-dom";
import api from "../api/axiosConfig.js";

function Verify(){

    const resend = async () => {
        await api.post("/users/resendverification", {email});
    }

    const location = useLocation();
    const email = location.state?.email;
    return (
        <>
            <h1>verify your email {email}</h1>
            <h4>The email will expire in 1 hour</h4>
            <button onClick={resend}>Resend verification</button>
        </>
    )
}
export default Verify;