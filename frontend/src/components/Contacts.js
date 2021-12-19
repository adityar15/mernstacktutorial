import React, {useState, useEffect} from 'react'
import ContactItem from './ContactItem'



export default function Contacts({contacts, showMessage, permissionGiven}) {

    const list = contacts.map((contact,index) => <ContactItem key={index} permissionGiven={permissionGiven}
    contact={contact} showMessageFor={(uid)=>showMessage(uid)} />)

    return (
        <div className="bg-white shadow shadow-gray-400 w-1/4 flex flex-col overflow-auto space-y-3 p-3 divide-y-2">
            {list}
        </div>
    )
}





