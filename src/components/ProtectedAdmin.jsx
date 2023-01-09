import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

export const ProtectedAdmin = ({children}) =>{
    const {user} = useAuth0();
    const loggedUser = useSelector(state => state.user);

    if(loggedUser.isAdmin === "false"){
        return <Navigate to="/" />
    }
    return children
}
