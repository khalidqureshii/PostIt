import { useState, useEffect } from "react";
import react from  "react";
import { useNavigate } from "react-router-dom";

function PreHome() {
    const [isLoggedIn, changeLogin] = useState(hasLoggedIn());
    const loginButton = <button className="mx-5 w-32 h-14 customButton text-[#ffffffde]" onClick={()=>navigate("/login")}><h6 className="text-2xl">Login</h6></button>;
    const registerButton = <button className="mx-5 w-32 h-14 customButton" onClick={()=>navigate("/register")}><h6 className="text-2xl">Register</h6></button>;
    const navigate = useNavigate();

    function hasLoggedIn() {
        const currToken = localStorage.getItem("token");
        if (currToken == null) return false;
        else return true;
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
        else {
          navigate("/login");
        }
    }, [isLoggedIn]);

    return (
        <>
          <div className="flex flex-col justify-center items-center w-full h-90vh text-center">
            <h1 className="text-5xl">
              Join Us in This Amazing Journey Towards Making Blogging Better For Everyone.
            </h1>
            <div className="text-center mt-8">
              {loginButton}
              {registerButton}
            </div>
          </div>
        </>
    );
}
export default PreHome;