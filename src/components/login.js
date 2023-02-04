import React,{useState} from "react";
import { Link ,useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "./firebase";
import "./login.css"

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
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Login</h1>
          <br />
          <div className="form-input">
            <label className="form-label">Email:</label>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            /><br />
            <label className="form-label">Password:</label>
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            /><br />
          </div>
          <br />
          <b className="error-message">{errorMsg}</b>
          <br />
          <button className="submit-button" type="submit">Login</button>
          <div className="signup-link">
            Don't have an account?
            <Link to="/signup">
              <button className="signup-button">SignUp</button>
            </Link>
          </div>
        </form>
      </>
      
    );
}

export default Login;