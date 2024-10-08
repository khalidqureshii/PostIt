import React from "react";
import LINK from "../store/Link";
export const AuthContext = React.createContext();
import Loader from "../components/Loader";
import DummyHeader from "../components/DummyHeader";

export const AuthProvider = ({children}) => {
    const [isLoading, setLoading] = React.useState(false);
    const[token, setToken] = React.useState(localStorage.getItem("token"));
    const [user, setUser] = React.useState("");
    let userID = null;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        console.log("Logged Out");
        setToken("");
        return localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try {
            setLoading(true);
            const response = await fetch(LINK + "api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `${token}`,
                }
            });
            setLoading(false);
            if (response.ok) {
                const data = await response.json();
                const userData = data.msg;
                console.log(userData);
                setUser(userData);
                userID = userData._id;
            }
        }
        catch (err) {
            console.log("Error Fetching User Data");
            setLoading(false);
        }
    }

    React.useEffect(() => {
        userAuthentication();
    }, [token]);
    
    return (<AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, userID}}>
        {isLoading?<><DummyHeader /><Loader /></> :children}
    </AuthContext.Provider>);
};

export const useAuth = () => {
    const authContextValue = React.useContext(AuthContext);
    if (!authContextValue) {
      throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};

export default useAuth;