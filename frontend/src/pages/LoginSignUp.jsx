import { useState } from 'react';
import './css/LoginSignUp.css';

export const LoginSignUp = () => {
  const [user, setUser] = useState(null);
  const [state, setState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLogin = async () => {
    console.log("login", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      // Instead of directly storing the token, use the context's login function.
      // Assuming responseData includes a "user" field with user details.
      console.log("LOGIN success");
      console.log(responseData);
      localStorage.setItem("auth-token", responseData.token);
      await getUser(formData.email);
      // login(responseData.user);
      alert("Login Successful");
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };



  const getUser = async(email) => {
    await fetch("http://localhost:4000/getUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        
        console.log("Fetched User");
        setUser(data.username);
        localStorage.setItem("user", data.username);
        console.log("Set User");
      });
  }

  const handleSignup = async () => {
    console.log("signup", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      // Use the context's login function after successful signup.
      console.log("signup success");
      // window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-field">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>
            By continuing, you agree to our <span>Terms & Conditions</span>
          </p>
        </div>
        <button
          onClick={() => {
            state === "Login" ? handleLogin() : handleSignup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already Have An Account?{" "}
            <span onClick={() => setState("Login")}>Log In Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an Account?{" "}
            <span onClick={() => setState("Sign Up")}>Sign In Here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;