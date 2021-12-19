import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../assets/auth';
import Cookies from 'universal-cookie'
import { apiInstance } from "../assets/api";

const NonAuthenticatedLinks = () => {
  return (
    <React.Fragment>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
    </React.Fragment>
  );
};


const AuthenticatedLinks = () => {

    function logout(){
        const cookie = new Cookies()
        cookie.remove('access_token')
        apiInstance().post('user/logout').then(res => {
          localStorage.removeItem('uuid')  
          console.log(res)
        })
        // send request to server for logout to destroy refresh token
    }

    return (
      <React.Fragment>
        <button onClick={logout}>  
        <Link to="/">Logout</Link>
        </button>
      </React.Fragment>
    );
  };

export default function Header() {
  return (
    <header className="h-[10vh] bg-sky-900 flex items-center justify-between px-6">
      <div className="text-3xl text-gray-50 font-bold">Logo</div>
      <div className="flex items-center space-x-3 text-gray-50 font-semibold">
         { useAuth() ? <AuthenticatedLinks /> : <NonAuthenticatedLinks />}
      </div>
    </header>
  );
}
