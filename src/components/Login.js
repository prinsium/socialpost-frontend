import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import image from "../images/logo192.png"
import { BASE_URL } from "../config";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(BASE_URL + "api/users/registerlogin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/Signup");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <section className="vh-100 m-5">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <image src={image} className="img-fluid" alt="Sample"/>
                </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
    
            <form  onSubmit={handleSubmit}>
                
                <div className="form-outline mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="form-outline mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>
                </div>
                <div className="text-center">
                  <Link aria-current="page" to='/Signup'>New User? Sign Up</Link>
                  </div>
            </form>
            
      </div>
    </div>
</div>
</section>
    )
}

export default Login