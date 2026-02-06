import React, { useState } from 'react'
import api from '../api/axios';

function LoginPage() {
  const [formData,setFormData]=useState({
    email:"",
    password:"",
  })
  const [isLoading,setIsLoading]=useState(false);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const [errorMsg,setErrorMsg]=useState({});

  const submitHandler= (e)=>{
    e.preventDefault();
    const error= {
        email:"",
        password:"",
    }
    if(!formData.email){
        error.email="please enter the valid email"
    }if(!formData.password){
        error.password="please enter the password!!"
    }
    if (error.email || error.password) {
    setErrorMsg(error);
    return;
  }

   setIsLoading(true)
    api.post("/api/users/login",formData)
    .then((result)=>{
        console.log(result.data.message);
        console.log(result.data)
        localStorage.setItem("token",result.data.token)
        console.log("Token saved to localStorage");
        alert(result.data.message);
        navigate("/dashboard");
    })
    .catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response?.data?.message);
    })
    .finally(()=>{
         setIsLoading(false);
         console.log("From localStorage:", localStorage.getItem("token"));
    })

  }

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="Email"
        onChange={handleChange}
        name="email"
        value={formData.email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handleChange}
        name="password"
        value={formData.password}
      />
      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginPage
