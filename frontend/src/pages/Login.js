import React, { useState } from 'react'
import Form from '../components/Form'
import Layout from './Layout'
import { apiInstance } from '../assets/api'
import { useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet'

export default function Login() {
    
    const navigate = useNavigate()

    const [errors, setErrors] = useState("")

    function doLogin(payload)
    {
        apiInstance().post('user/login', payload).then(res => {
            console.log(res)
            localStorage.setItem('uuid', res.data.user.uuid);
            navigate('/chats')
        })
        .catch(err => {
            if(err.response)
            setErrors(err.response.data.errors)
        })
        console.log(payload)
    }
    
    return (
        <Layout>
             {/* <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet> */}
            { errors && <div className="text-red-500">You have entered incorrect credentials</div> }
                <Form submitted={doLogin} />

        </Layout>
    )
}
