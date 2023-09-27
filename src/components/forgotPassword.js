import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const ForgotPassword = ()=>{

    //initializing states
    const [email , setEmail] = useState("");
    const [error , setError] = useState(false);
    const [success , setSuccess] = useState(false);
    const [errorMsg , setErrorMsg] = useState("");

    //handling form submit
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        try{
                //calling forgot password api with email in body as userId
                const response = await axios.post("https://backend-for-hospital.onrender.com/api/users/forgot-password",
                {userId:email}
                )

                if(response.status === 400){
                    //showing error msg on any error
                    setError(true);
                    setErrorMsg("Something Went Wrong");
                }

                //showing success msg on success
                if(response.status===200){
                    setSuccess(true)
                }
            }catch(err){

                //showing error msg on error
                if(err.response.status === 400){
                    setError(true);
                    setErrorMsg("Something Went Wrong");
                }
            }
    }

    return(
        <div className="container mt-[50px]">

            {/* showing error msg */}
            {error && <div class="alert alert-danger" role="alert">
  {errorMsg}
</div>}
        <div className="text-left mt-2 shadow-xl p-3 rounded-lg bg-white">
            {//shwooing success message
                success && <div>
                        <h1 className="text-[20px] font-bold mb-[10px]">Email Successfully Sent to registered email id</h1>
                        <Link to={"/"}><button className="btn btn-primary">Back to Login</button></Link>
                    </div>
            }
                <form className={`${success && "hidden"}`} onSubmit={handleFormSubmit}>

                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Enter your registered Email address</label>
                        <input
                            onChange={e => {
                                setEmail(e.target.value)
                            }}
                            name="userId" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            </div>
    )
}

export default ForgotPassword;