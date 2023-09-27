import { useEffect, useState } from "react";
import NavigateToLogin from "./navigateToLogin";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = ()=>{

    const token = localStorage.getItem("token");

    const [tokenPresent,setToken] = useState(token==null);

    const [user , setUser] = useState({})

    useEffect(()=>{
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        validateSession();
    },[token])

    const validateSession= async ()=>{
        try{
            const response = await axios.get(
                "https://backend-for-hospital.onrender.com/api/users/validate"
            );
            if(response.status===401){
                if(response.status === 401){
                    setToken(true)
                    localStorage.removeItem("token")
                }
            }
            setUser(response.data)
        } catch (err){
            if(err.response.status === 401){
                setToken(true)
                localStorage.removeItem("token")
            }
        }
    }

    return(
        <>
        {
            tokenPresent && <NavigateToLogin />
        }
        <div className="mt-[200px] w-[100vw] flex-col justify-center items-center">
        <h1 className="text-center font-bold text-xl">Hello {user.name}, Welcome to dashboard!!</h1>

        <div className="h-[100px] flex justify-center items-center">
            <Link to={`/reset-password/${token}`}><button className="btn btn-primary h-[60px] mr-[10px]">Chnage Password</button></Link>
            <button className="btn btn-primary h-[60px]"
                onClick={()=>{
                    localStorage.removeItem("token");
                    setToken(true)
                }}
            >Sign Out</button>
        </div>
        </div>
        </>
    )
}

export default Dashboard;