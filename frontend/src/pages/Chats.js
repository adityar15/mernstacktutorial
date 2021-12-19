import React, { useEffect, useState } from 'react'
import Contacts from '../components/Contacts'
import Messages from '../components/Messages';
import Layout from './Layout'
import { apiInstance } from '../assets/api';

export default function Chats() {


    const [contacts, setContacts] = useState([])

    const [uuid, setUUID] = useState(localStorage.getItem('uuid'))

    const [recipient, setRecipient] = useState("")


    const [permissionGiven, setPermissionGiven] = useState(false)

    useEffect(() => {

        if (!('Notification' in window)) {
            console.log("This browser does not support notifications.");
          } 
          
          else if(Notification.permission === 'granted')
          {
            setPermissionGiven(true)
          }
          else {
              Notification.requestPermission()
              .then((permission) => {
                
                if(permission === 'granted')
                setPermissionGiven(true)
              })
            } 


    }, [Notification.permission === 'granted'])



    useEffect(()=>{
        apiInstance().get('user/contacts', {
            uuid: uuid
        }).then(res => {
            setContacts(res.data)
        }).catch(err => console.log(err))
    }, [uuid])



    return (
        <Layout>
          
            <div className="h-full w-full overflow-hidden flex items-stretch">
                <Contacts contacts={contacts} showMessage={(uid)=>setRecipient(uid)} permissionGiven={permissionGiven} />
                {recipient &&<Messages recipient={recipient} permissionGiven={permissionGiven}  />}
                
            </div>

        </Layout>
    )
}
