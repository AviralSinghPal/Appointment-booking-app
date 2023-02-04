import React,{useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
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
        <form onSubmit={handleSubmit}>
        <h1>SignUp </h1>
        <br/>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your Name"/>   <br/>
            <label htmlFor="email">Email:</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your@email.com"/> <br/>       
            <label htmlFor="password">Password:</label>
            <input type = "password" id="pass" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="********"/><br/>
        </div>
        <br/>
        <b>{errorMsg}</b>
        <br/>
        <button type="submit" disabled={submitButtonDisabled} >Submit</button>
        <div>Already have a account ? <br/><Link to="/login"><button >Login</button></Link> </div>
        </form>
        </>);
}

export default Signup;