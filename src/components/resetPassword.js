import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"


const ResetPassword = ()=>{

    //intializing states

    //getting jwt token form params
    const {token} = useParams() 

    const [user , setUser] = useState({})

    const [password , setPassword] = useState("")

    const [isTokenValid , setIsTokenValid] = useState(false);

    const [error,setError] = useState(false)

    const [errMsg , setErrMsg] = useState("")

    const [success , setSuccess] = useState(false)

    //setting auth header to jwt token value
    useEffect(()=>{
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        validateSession();
    },[token])


    //checking is token is still valid or expired
    const validateSession= async ()=>{
        try{
            const response = await axios.get(
                "https://backend-for-hospital.onrender.com/api/users/validate"
            );
            if(response.status===401){
                if(response.status === 401){
                    setIsTokenValid(true)
                }
            }
            //setting user data if token is still valid
            setUser(response.data)
        } catch (err){
            if(err.response.status === 401){
                setIsTokenValid(true)
            }
        }
    }

    //showing error if token not valid
    if(isTokenValid){
        return(
            <div className="m-[20px]">
            <h1>Your link has expired</h1>
            <Link to="/forgot-password"><button className="btn btn-primary mt-[10px]">Request New Link</button></Link>
            </div>
        )
    }

    //handling form submit
    const handleFormSubmit = async (e)=>{

        e.preventDefault();

        let newUser = {...user , password:password}

        try{

            //sending request for passsword change with new deatils
            const response = await axios.post("https://backend-for-hospital.onrender.com/api/users/reset-password",
            newUser
            )

            if(response.status === 404 || response.status === 500){
                setErrMsg("Some Error Occoured")
                setError(true);
                setIsTokenValid(true);
            }


            if(response.status===200){
                setSuccess(true);
            }
        }catch(err){

            //setting error message on some error
            if(err.response.status===404 || err.response.status === 500){
                setErrMsg("Some Error Occoured")
                setError(true);
                setIsTokenValid(true);
            }
        }

    }

    return (
        <div className="container mt-[100px]">
            {
                success && 
                    <div>
                        <h1 className="text-[20px] font-bold mb-[10px]">Password Changed</h1>
                        <Link to={"/login"}><button className="btn btn-primary">LogIn</button></Link>
                    </div>
            }
            {
                error && 
                <div class="alert alert-danger" role="alert">
                    {errMsg}
            <Link to={"/forgot-password"}><button className="btn btn-primary">Resend Link</button></Link>
                </div>
            }
            <h1 className={`text-[40px] font-bold ${success && 'hidden'} ${error && 'hidden'}`}>Rest Password</h1>
                <div className={`text-left mt-2 shadow-xl p-3 rounded-lg bg-white ${success && 'hidden'} ${error && 'hidden'}`}>
                <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                        <label for="exampleInputName" className="form-label">Name</label>
                        <input
                            disabled
                            value={user.name}
                            name="name" type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            disabled
                            value={user.userId}
                            name="userId" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Enter New Password</label>
                        <input
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                            name="password" type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}


export default ResetPassword;