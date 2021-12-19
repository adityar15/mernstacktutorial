import React from 'react'

import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../assets/auth';


export function Protected() {

    const isAuth = useAuth()    

    return (
       isAuth ? <Outlet /> : <Navigate to="/" />
    )
}


export function Public() {

    const isAuth = useAuth()    

    return (
       isAuth ? <Navigate to="/chats" /> : <Outlet />
    )
}
