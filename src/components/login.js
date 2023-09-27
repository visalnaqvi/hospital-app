import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Login = ({ type }) => {

    //initalizing states
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [name, setName] = useState("");

    const [url, setUrl] = useState("");

    const [user, setUser] = useState(false);

    const [warning , setWarning] = useState(false);

    const [warningMsg , setWarningMsg] = useState(false);

    //setting API value for login and register forms
    useEffect(() => {
        if (type === "login") {
            setUrl("https://backend-for-hospital.onrender.com/api/users/login")
        } else {
            setUrl("https://backend-for-hospital.onrender.com/api/users/register")
        }
    }, [type])

    //handling form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            userId: email,
            password: password,
            name: name
        }


        try {
            const response = await axios.post(
                url,
                formData
            )

            //setting token and user data on successfull sign in
            if (response.status === 200) {
                if (type === 'login') {
                    localStorage.setItem("token", response.data)
                }
                setUser(true);
            }

        }
        catch (err) {
            //setting warning message on warnings
            if(err.response.status === 409){
                setWarning(true)
                setWarningMsg("User already exists")
            }
            
            if(err.response.status === 400){
                setWarning(true)
                setWarningMsg("Incorrect UserID or Password")
            }

        }
    }


    return (
        <div className="App container mt-10">
            {
                user && <Navigate to={type === "login" ? "/" : "/login"} replace={true} />
            }
            <h1 className='text-2xl font-bold mb-3'>Welcome to our application log in to continue</h1>
            {warning && <div class="alert alert-danger" role="alert">
  {warningMsg}
</div>}
            <div className="text-left mt-2 shadow-xl p-3 rounded-lg bg-white">
                <form onSubmit={handleFormSubmit}>

                    {
                        type === "register" && (
                            <div className="mb-3">
                                <label for="exampleInputName" className="form-label">Full Name</label>
                                <input
                                    onChange={e => {
                                        setName(e.target.value)
                                    }}
                                    name="name" type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                            </div>
                        )
                    }
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            onChange={e => {
                                setEmail(e.target.value)
                            }}
                            name="userId" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                            name="password" type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <br></br>
            <br></br>
            <h1 className='text-2xl font-bold mb-3'>{type === "login" ? <span>Don't</span> : <span>Already</span>} have an account?</h1>
            <Link to={type === "login" ? "/register" : "/"}><button className="btn btn-primary">{type === "login" ? <span>Register</span> : <span>Login</span>}</button></Link>
{
    type==="login" &&
    <div>
        <br></br>
            <br></br>
            <h1 className='text-2xl font-bold mb-3'>Don't know your password?</h1>
            <Link to={"/forgot-password"}><button className="btn btn-primary">Forgot Password</button></Link>

    </div>
}
            
        </div>
    );
}

export default Login;