import { Navigate } from "react-router-dom"

//calling this component to redirect to login page when session expires
const NavigateToLogin = ()=>{
    return(
        <Navigate  to="/login" replace={true} />
    )
}

export default NavigateToLogin;