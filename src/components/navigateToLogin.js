import { Navigate } from "react-router-dom"

const NavigateToLogin = ()=>{
    return(
        <Navigate  to="/login" replace={true} />
    )
}

export default NavigateToLogin;