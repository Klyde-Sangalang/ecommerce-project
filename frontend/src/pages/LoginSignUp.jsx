import { useState } from 'react';
import './css/LoginSignUp.css';

export const LoginSignUp = () => {

  const [state, setState] = useState("Sign Up")

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-field">
          {state === "Sign Up" ? <input type="text" placeholder="Your Name" /> : <></>}
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, you agree to our <span>Terms & Conditions</span></p>
        </div>
        <button>Continue</button>
        {state === "Sign Up" ? 
          <p className="loginsignup-login">Already Have An Account? <span onClick={()=>{setState("Login")}}>Log In Here</span></p>
          : <p className="loginsignup-login">Create an Account? <span onClick={()=>{setState("Sign Up")}}>Sign In Here</span></p>
        }
        
        
        
      </div>
    </div>
  )
}

export default LoginSignUp;