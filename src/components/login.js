import React,{useState} from "react";
import { Link ,useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "./firebase";

const Login = (props) => {
const navigate = useNavigate();
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [errorMsg, setErrorMsg] = useState("");

const handleSubmit=(e)=>{
    e.preventDefault();
    if (!email || !password) {
        setErrorMsg("Fill all fields");
        return;
    }
    setErrorMsg("");
    console.log(email);
    signInWithEmailAndPassword(auth, email,password)
    .then(async (res) => {    
     console.log(res);         
     navigate("/");
    })
    .catch((err) => {
      
      setErrorMsg(err.message);
    });

}

    return (
    <>
    <form onSubmit={handleSubmit}>
    <h1>Login</h1>
    <br/>
    <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your@email.com"/><br/>        
        <label>Password:</label>
        <input type = "password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="********"/><br/>
    </div>
    <br/>
    <b>{errorMsg}</b>
    <br/>
    <button type="submit" >Login</button>
    <div>Don't have an account?<Link to="/signup"><button >SignUp</button></Link></div>
    </form>
    </>
    );
}

export default Login;