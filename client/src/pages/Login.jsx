import React, { useState } from "react";
import InputEntry from "../components/InputEntry";
import {useAuth} from "../store/Auth"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import LINK from "../store/Link";
import Loader from "../components/Loader";
import InputEntryPassword from "../components/InputEntryPassword"

function Login() {
    const navigate = useNavigate();
    const currToken = localStorage.getItem("token");
    const [user,setUser] = useState({email: "", password: ""});
    const {storeTokenInLS} = useAuth();

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
            return updatedUser;
        });
    }
    
    async function storeData() {
        setLoading(true);
        const response = await fetch(LINK + "api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }); 
        setLoading(false);
        if (response.ok) {
            toast("Successfully Logged in");
            const resp_data = await response.json();
            await storeTokenInLS(resp_data.token);
            navigate("/");
        }
        else {
            const res_data = await response.json();
            toast(res_data.message);
        }
    }
    const serverMessage = "The Server Can Take Upto 90 Seconds Due To Inactivity";

    return <> {isLoading ? <Loader /> :
        <div className="w-full h-90vh flex flex-col justify-center items-center">
            {(currToken == null) && (<>
            <h1 className="mb-6 text-5xl text-center">Welcome To Login Page</h1>
            <InputEntry changeFunction={updateUser} name="email" text="Email" placeholder="Enter Your Email" />
            <InputEntryPassword changeFunction={updateUser} name="password" text="Password" placeholder="Enter Your Password" />
            <button className="customButton" type="submit" onClick={storeData}>Submit</button>

            <h2 className="text-2xl mb-4 mt-8">Don't have an Account?</h2>
            <button className="customButton" onClick={()=>navigate("/register")}>Register</button>
            </>)}
        </div>
        }
    </>
}   

export default Login;