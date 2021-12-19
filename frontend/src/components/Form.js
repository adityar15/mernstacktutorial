import React from "react";
import Button from "./Button";
import Title from "./Title";
import {useState} from 'react'
function FormGroup({label, type, placeholder, setValue, value}) {
  return (
    <div className="flex md:flex-row flex-col space-x-0 md:space-x-4 md:items-center">
      <label className="w-[100px] text-lg">{label}</label>
      <input
        type={type}
        onChange={(e)=> setValue(e.target.value)}
        placeholder={placeholder}
        value={value}
        className="p-2 border border-zinc-100 shadow rounded w-full md:w-[400px]"
      />
      {/* added responsive width */}
    </div>
  );
}

export default function Form({ isLogin = true, submitted }) {
  const [name, setName] = useState(""),
  [email, setEmail] = useState(""),
  [password, setPassword] = useState("")


  const formSubmit = (e)=>{
    e.preventDefault()
    submitted({
      name: name,
      email: email,
      password: password
    })
  
  }

  return (
    // added responsive width
    <form className="block space-y-5 m-auto w-full md:w-auto" onSubmit={formSubmit}>
      <Title
        content={isLogin ? "Login" : "Register"}
        className="text-center text-2xl font-bold text-zinc-800"
      />
      {!isLogin && <FormGroup type="name" label="Name" placeholder="Enter your name" setValue={setName} value={name} />}
      <FormGroup type="email" label="Email" placeholder="Enter your Email"  setValue={setEmail} value={email} />
      <FormGroup type="password" label="Password" placeholder="Enter your Password" setValue={setPassword} value={password} />

    {/* added this class float-right */}
      <div className="float-right">
       <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
      </div>
    </form>
  );
}
