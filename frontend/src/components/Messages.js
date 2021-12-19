import React, {useState, useEffect} from 'react'
import { apiInstance } from '../assets/api'
import Button from './Button'
import {pusher} from '../assets/pusherconfig'

function MessageBox({uuid, getMessage}){

    const [message, setMessage] = useState("")

    function send()
    {
        apiInstance().post('message/send', {
            rec_id: uuid,
            text: message
        }).then(res => {
            getMessage(true)
            setMessage("")
        })
    }

    function handleEnterKey(e)
    {
        if(e.key=="Enter") 
        send()
    }


    return(
        <div className={`w-full mt-auto ml-2`}>
            <div className='flex flex-row'>
            <input type="text" 
            onChange={(e)=>setMessage(e.target.value)}
            onKeyPress={handleEnterKey}
            value={message}
            className="p-2 border border-blue-100 bg-sky-100 bg-opacity-40
            text-gray-900 outline-none shadow rounded w-[90%]" placeholder='Type your message here' />
            <Button onClick={send}>Send</Button>
            </div>
        </div>
    )
}


function Message({text, isSender}){
    return(
    <div className="w-full">    
        <div className={`${isSender ? 'bg-blue-500 text-gray-50 float-right' : 'bg-sky-900 text-gray-50 float-left'} 
        max-w-md py-3 px-8 rounded-3xl` }>
            {text}
        </div>
    </div>
    )
}


function MessageList({messages}){
    const uuid = localStorage.getItem('uuid')
    const list = messages.map((msg, index) => <Message text={msg.content} isSender={msg.sender == uuid} key={index} />)

    return (
        <div className="flex flex-col p-2 overflow-y-auto space-y-3">
            {list}
        </div>
    )
}



export default function Messages({recipient, permissionGiven}) {

    const [messages, setMessages] = useState([]) 

    function getMessages()
    {
        apiInstance().get(`message/${recipient}`).then(res => {
            setMessages(res.data)
        })
    }

    const sender_uuid = localStorage.getItem('uuid')

    useEffect(() => {
        var channel = pusher.subscribe(`channel-${sender_uuid}`);
        channel.bind(`event-${sender_uuid}`, function(data) {
          console.log(data)
          if(sender_uuid != data.sender_uuid)
          { 
            getMessages()
          }
        });
  }, [permissionGiven])

    useEffect(()=>{
        getMessages()
    },[recipient])


    return (
        <div className="flex flex-col w-full overflow-hidden">
                <MessageList messages={messages} />
                <MessageBox uuid={recipient} getMessage={(val)=>getMessages()} />
        </div>
    )
}
