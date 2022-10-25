import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../components/Signup.css';


const Login = () => {
  const [data,setData] = useState({
    email:'',
    password:'',
    checked:false
  });
  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [showPwd, setShowPwd] = useState(false)

  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const pwdPattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const changeHandler = (e) => {
    const { name, value, type, checked} = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  }


  const checkEmailValidation = (email) => {
    if(!emailPattern.test(email)){
      setEmailError("Enter Valid email");
    }
    else{
      setEmailError("");
    }
  }

  const checkPwdValidation = (password) => {
    if(!password.match(pwdPattern)){
      setPwdError("Password must contain special symbols");
    }
    else if(password.length<12){
      setPwdError("Password must be more than 12 characters");
    }
    else{
      setPwdError("");
    }
  }

  const togglePwdHandler = () => {
    setShowPwd(!showPwd);
    // console.log(!showPwd)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = data;
    if (!email && password ) {
      setEmailError("Email field can't be blank");
      setPwdError("Password field can't be blank");
      }
    else {
      checkEmailValidation(email);
      checkPwdValidation(password);
      }
  }


    return (
      <div className="container">
          <div className="heading">
            <h2>Login</h2>
            <ion-icon name="close-outline" className="close"></ion-icon>
          </div>
          <button className="google">
            <ion-icon name="logo-google" className="logo-google"></ion-icon> Sign up
            with Google
          </button>
          <hr />
          <form onSubmit={handleSubmit}>
             <div>
                <label>Email</label>
                <input type="email" placeholder="example@mail.com" name="email" value={data.email} onChange={ changeHandler} required/>
                <p className="error">{emailError}</p>
             </div>
             <div>
                <label>Password</label>
                <div className="pwd-container">
                  <input type={showPwd ? "text" : "password"} placeholder="atleast 8 characters" name="password" value={data.password} onChange={changeHandler} required/>
                  <ion-icon name={showPwd ? "eye-outline" : "eye-off-outline"} class={showPwd ? "eyeOnIcon" : "eyeOffIcon"} onClick={togglePwdHandler}></ion-icon>
                </div>
                <p className="error">{pwdError}</p>
             </div>
             <div className="termsBox">
              <input type="checkbox" className="checkButton" name="checked" value={data.checked} onClick={changeHandler}/>
              <span>Remember me</span>
            </div>
            <input type="submit" className="login" value="Log in" />
            <a href="#" className="forgot">Forgot Password?</a>
          </form>
          <hr/>
          <div className="account">
            <p>Don't have an account?</p>
            <NavLink to="/Signup">Sign up</NavLink>
          </div>
      </div >
    )
}

export default Login
