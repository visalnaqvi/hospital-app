import { useEffect, useState } from "react";
import NavigateToLogin from "./navigateToLogin";
import axios from "axios";
import { Link } from "react-router-dom";

//dashboard component
const Dashboard = ()=>{

    //getting jwt token form local storage
    const token = localStorage.getItem("token");

    //check status of token
    const [tokenPresent,setToken] = useState(token==null);

    const [user , setUser] = useState({})

    useEffect(()=>{

        //setting auth header to token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //checking if session with token is valid or not
        validateSession();
    },[token])

    //function to check session status
    const validateSession= async ()=>{
        try{

            //checking session status
            const response = await axios.get(
                "https://backend-for-hospital.onrender.com/api/users/validate"
            );
            if(response.status===401){
                if(response.status === 401){
                    setToken(true)

                    //removing token from local storage if session has expired or not valid anymore
                    localStorage.removeItem("token")
                }
            }

            //setting user data to responce from validation api
            setUser(response.data)
        } catch (err){
            if(err.response.status === 401){
                setToken(true)
                //removing token from local storage on any error
                localStorage.removeItem("token")
            }
        }
    }

    return(
        <>
        {
            //if token is not present then navigating to login page
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