import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../components/Signup.css'

const Signup = () => {
  const [data,setData] = useState({
    username:'',
    email:'',
    password:'',
    checked:false
  });
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [checkError, setCheckError] = useState('');
  const [showPwd, setShowPwd] = useState(false)

  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const pwdPattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  const checkNameValidation = (username) => {
    if(username.length<4){
      setNameError("Name must be more than 4 characters");
    }
    else{
      setNameError("");
    }
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

  const checkTermsValidation = (checked) => {
    if(!checked){
      setCheckError("Please check the terms option");
    }
    else{
      setCheckError("");
    }
  }

  const togglePwdHandler = () => {
    setShowPwd(!showPwd);
    // console.log(!showPwd)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(data.username)
    const {username, email, password, checked } = data;
    if (!username && !email && password && !checked) {
      setNameError("Name field can't be blank");
      setEmailError("Email field can't be blank");
      setPwdError("Password field can't be blank");
      setCheckError("Please check the box");
    }
    else {
      checkNameValidation(username);
      checkEmailValidation(email);
      checkPwdValidation(password);
      checkTermsValidation(checked);

    }
  }

  return (
    <div className="container">
        <div className="heading">
          <h2>Sign up</h2>
          <ion-icon name="close-outline" className="close"></ion-icon>
        </div>
        <button className="google">
          <ion-icon name="logo-google" className="logo-google"></ion-icon> Sign up
          with Google
        </button>
        <hr />
        <form onSubmit={handleSubmit}>
           <div>
              <label>Name</label>
              <input type="text" placeholder="Leslie Alexander" name="username" value={data.username} onChange={changeHandler} required/>
              <p className="error">{nameError}</p>
           </div>
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

           {pwdError==="Password must contain special symbols" && <div className="boxes">
                <span className="box box1" style = {{background:"red"}}></span>
                <span className="box box2"></span>
                <span className="box box3"></span>
           </div>}
           {pwdError==="Password must be more than 12 characters" && <div className="boxes">
                <span className="box box1" style = {{background:"orange"}}></span>
                <span className="box box2" style = {{background:"orange"}}></span>
                <span className="box box3"></span>
           </div>}
           {pwdError==="" &&data.password.length>12 && <div className="boxes">
                <span className="box box1" style = {{background:"green"}}></span>
                <span className="box box2" style = {{background:"green"}}></span>
                <span className="box box3" style = {{background:"green"}}></span>
           </div>}
           {!data.password && <div className="boxes">
                <span className="box box1"></span>
                <span className="box box2"></span>
                <span className="box box3"></span>
           </div>}

           <div className="termsBox">
            <input type="checkbox" className="checkButton" name="checked" value={data.checked} onClick={changeHandler} required/>
            <span>I agree with <a href="#">Terms </a> and <a href="#">Privacy </a></span>
          </div>
          <p className="error">{checkError}</p>
          <input type="submit" className="signup" value="Signup" />
        </form>
        <hr/>
        <div className="account">
          <p>Already have an account?</p>
          <NavLink to="/login">Log in</NavLink>
        </div>
    </div >
  )
}

export default Signup
