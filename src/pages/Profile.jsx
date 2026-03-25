import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../api/axiosConfig.js";
import Dropdown from "../context/Dropdown.jsx";
function Profile() {
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/users/me");
                setProfile(res.data);
            } catch (err) {
                console.error("Failed to fetch profile", err);
            }
        };
        fetchProfile();
    }, []);



    const popUp = async () => {
        try {
            const res = await api.delete("/users/delete");
            navigate("/login")
        } catch (err) {
            console.error("Failed to fetch profile", err);
        }
    };

    if (!profile) return <p>Loading profile...</p>;

    return (
        <>
            <Dropdown/>
            <h2>profile</h2>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Password:</strong> *************</p>
            <p>{message ?? message}</p>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"/>
            <button disabled={email !== profile?.email} onClick={popUp}>Delete Account</button>
        </>
    )
}
export default Profile;