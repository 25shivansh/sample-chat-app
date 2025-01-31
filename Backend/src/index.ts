import { WebSocketServer , WebSocket } from "ws";
const wss =new WebSocketServer({port :8080});
interface User{
    socket :WebSocket;
    room: string;
}
let allSockets :WebSocket[]=[];
wss.on("connection",(socket)=>{
    allSockets.push(socket)
    
    socket.on("message",(message)=>{
        
        
    })
    socket.on("disconect",()=>{
        allSockets=allSockets.filter(x=>x!=socket);
    })


})