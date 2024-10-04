import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../store/Auth";
import LINK from "../store/Link";
import Loader from "../components/Loader";

function Home() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const displayName = `, ${user.username}`;
    const userID = user._id;
    const [isLoading, setLoading] = useState(false);

    return <>
        {isLoading ?<Loader /> : 
            (<div className="mx-5"><div className="flex flex-col justify-center items-center w-full h-90vh">
                <h1 className="mb-5 text-4xl md:text-5xl text-center">Welcome{displayName}</h1>
            </div></div> )}
    </>
}   

// function Home() {
//     const [isLoading, setLoading] = useState(false);
//     return <>
//         {isLoading ?<Loader /> : 
//             (<div className="mx-5"><div className="flex flex-col justify-center items-center w-full h-90vh">
//                 <h1 className="mb-5 text-4xl md:text-5xl text-center">Welcome User</h1>
//             </div></div> )}
//     </>
// }   


export default Home;