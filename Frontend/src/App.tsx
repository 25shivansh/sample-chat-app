import { useEffect, useRef, useState } from "react"


function App() {
  const [message,setMesages]=useState(["hi there","hello"])
  const wsRef=useRef();
  useEffect(()=>{
    const ws=new WebSocket("ws://localhost:8080");
    ws.onmessage=(event)=>{
      
      setMesages(n =>[...n,event.data])
    }
    wsRef.current=ws;
    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }
  },[]);
  

  return (
    <div className='h-screen bg-black '>
      <br /><br /><br />
      <div className="h-[95vh]">
        {message.map(message=>
        <div className="m-8">
          <span className="bg-white text-black text-black rounded p-4 m-8">
            {message}
          </span>
        </div>)}
      </div>
      <div className="w-full h-fit bg-white flex  ">
        <input id="message" className="flex-1" type="text" placeholder="Message.." />
        <button onClick={()=>{
          const message=document.getElementById("message")?.value;
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message:message
            }
          }))
        }} className="bg-purple-600 text-white p-4">Send Message</button>
      </div>
    </div>
  )
}

export default App
