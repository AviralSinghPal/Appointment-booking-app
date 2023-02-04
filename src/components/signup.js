import React,{useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"
// import {useNavigate} from 'react-dom/client'


const Signup = (props) =>{
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisabled]= useState(false);
    const navigate= useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(! name || !email || !password){
            setErrorMsg("All feilds are required!");
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth,email,password).then(async(res)=>{
            console.log(res);
            const user = res.user;
            await updateProfile(user,{
                displayName: name,
            });
            navigate("/")
        }).catch((err)=>{
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
            console.log(err);
        });
        console.log(email);
    }


    return(<>
        <form onSubmit={handleSubmit} className="signup-form">
            <h1 className="signup-form-header">SignUp </h1>
            <br/>
            <div className="signup-form-inputs">
                <label htmlFor="name" className="signup-form-label">Name:</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your Name" className="signup-form-input"/>   <br/>
                <label htmlFor="email" className="signup-form-label">Email:</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your@email.com" className="signup-form-input"/> <br/>       
                <label htmlFor="password" className="signup-form-label">Password:</label>
                <input type = "password" id="pass" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="********" className="signup-form-input"/><br/>
            </div>
            <br/>
            <b className="signup-form-error">{errorMsg}</b>
            <br/>
            <button type="submit" disabled={submitButtonDisabled} className="signup-form-submit-button">Submit</button>
            <div className="signup-form-bottom-text">Already have a account ? <br/><Link to="/login"><button className="signup-form-bottom-button">Login</button></Link> </div>
        </form>
    </>
    );
}

export default Signup;