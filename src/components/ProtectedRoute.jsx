import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedRoute = ({children}) =>{
    const {user} = useAuth0();
    if(!user){
        return <Navigate to="/" />
    }
    return children
}
