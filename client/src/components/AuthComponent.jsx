import React from "react";
import { useState } from "react";
import api from "../api/axios";

function AuthComponent() {
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");

    const [errorMsg,setErrorMsg]=useState({
        
    })
    const [loading,setLoading]=useState(false);

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"User"
    
    })
    // const handleChange=(e)=>{
    //     const {name,value}=e.target;
    //     setFormData({...formData,[name]:value})

    //     setFormData({...formData,[e.target.name]:e.target.value})
    // }

    const submitHandler=(e)=>{
        e.preventDefault();
        let error={
            username:"",
            email:"",
            password:"",
            role:"",
        }
        if(!username){
            error.username="Name is Mandatory!"
        }
        if(!email){
            error.email="Email is Mandatory!"
        }
        if(!password){
            error.password="Password is Mandatory!"
        }
        if(!role){
            error.role="Role is Mandatory!"
        }

        setErrorMsg(error);

        setLoading(true);
        api.post("/api/users/register",{username,email,password,role})
        .then((result)=>{console.log(result)
            alert(result.data.message)
        })
        .catch((err)=>{console.log(err.response.data)
            alert(err.response.data.err)
        })
        .finally(() => {
        setLoading(false);
      });
        
    }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className=" w-[33vw] p-8 border border-gray-300 bg-white rounded-lg ">
        <h1 className="text-center font-bold text-2xl">Register</h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center  p-2 justify-center gap-6 "
        >
          <div className="input-label flex flex-col w-full h-full ">
            <label htmlFor="username" className="my-1 font-500">
              Username:
            </label>
            <input
              type="text"
              placeholder="Enter your name !"
              name="username"
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
              className=" w-full px-5 py-2 rounded-md outline-none bg-gray-300"
            />
          </div>
          <div className="input-label flex flex-col w-full ">
            <label htmlFor="email" className="my-1 font-500">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email !"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="px-5 py-2 rounded-md outline-none bg-gray-300"
            />
          </div>
          <div className="input-label flex flex-col w-full ">
            <label htmlFor="password" className="my-1 font-500">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter Password !"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="px-5 py-2 rounded-md outline-none bg-gray-300"
            />
          </div>
          <div className="input-label flex flex-col w-full ">
            <label htmlFor="role" className="my-2 font-500">
              Role:
            </label>
            <div className="flex items-center justify-evenly">
              <div>
                <label htmlFor="user">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    onChange={(e)=>setRole(e.target.value)}
                    className="px-5 py-2 rounded-md outline-none bg-gray-300"
                  />{" "}
                  User
                </label>
              </div>
              <div>
                <label htmlFor="user">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    onChange={()=>setRole(e.target.value)}
                    className="px-5 py-2 rounded-md outline-none bg-gray-300"
                  />{" "}
                  Admin
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="px-5 py-2 w-full rounded-lg bg-blue-600 text-white " >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AuthComponent;
