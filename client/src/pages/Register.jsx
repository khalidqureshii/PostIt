import React, { useState } from "react";
import InputEntry from "../components/InputEntry";
import useAuth from "../store/Auth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import LINK from "../store/Link";
import InputEntryPassword from "../components/InputEntryPassword";
import Loader from "../components/Loader";

function Register() {
    const navigate = useNavigate();
    const currToken = localStorage.getItem("token");
    const {storeTokenInLS}  = useAuth();
    const [user,setUser] = useState({username: "", email: "", phone: "", password: "", confirmPassword: "", match: true});
    const [isLoading, setLoading] = useState(false);

    React.useEffect(() => {
        if (currToken) {
            navigate("/"); 
        }
    }, [currToken, navigate]);

    function updateUser(event) {
        const { name, value } = event.target;
        setUser(prevUser => { 
            const updatedUser = {
                ...prevUser,
                [name]: value,
            }
            updatedUser.match = (updatedUser.password == updatedUser.confirmPassword);
            return updatedUser;
        });
    }

    async function storeData() {
        if (!user.match) return;
        setLoading(true);
        const response = await fetch(LINK + "api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }); 
        setLoading(false);
        if (response.ok) {
            toast("Successfully Registered");
            const resp_data = await response.json();
            await storeTokenInLS(resp_data.token);
            navigate("/");
        }
        else {
            const res_data = await response.json();
            console.log(res_data.extraDetails);
            toast("User Already Exists !");
        }
    }

    return <> {isLoading ?  <Loader />: <>
        {currToken == null && (<>
        <div class="flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl mt-10 mb-6">Welcome To Register Page</h1>
            <InputEntry changeFunction={updateUser} name="username" text="Username" placeholder="Enter Your Name" value={user.username} /> 
            <InputEntry changeFunction={updateUser} name="email" text="Email" placeholder="Enter Your Email" value={user.email} />
            <InputEntry changeFunction={updateUser} name="phone" text="Phone Number" placeholder="Enter Your Phone Number" value={user.phone} />
            <InputEntryPassword changeFunction={updateUser} name="password" text="Password" placeholder="Enter Your Password" value={user.password} />
            <InputEntryPassword changeFunction={updateUser} name="confirmPassword" text="Confirm Password" placeholder="Re-Enter Your Password" value={user.confirmPassword} />
            <button type="submit" className="w-32 h-12 customButton" onClick={storeData}>Submit</button>
            {(!user.match) ? <h3 className="mt-3 text-xl text-red-400">Passwords Do Not Match</h3> : null}

            <h2 className="text-3xl mt-7 mb-4">Already have an Account?</h2>
            <button className="customButton h-12 w-32" onClick={()=>navigate("/login")}>Login</button>
        </div>
        </>)}
        </>}
    </>
}   

export default Register;