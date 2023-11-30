const net = require('net');
var server = net.createServer();

let clients = {}
let count = 0;

server.on('connection',(socket) =>{
    let cname;                                  // this denotes the client name
    console.log('The client is connected');
    socket.write('Please enter your name')
    
    socket.on('data', (data)=>{
        console.log('received data from client');
        if(!cname)   // first time client is getting connected
        {
            cname = data.toString(); //.replace('\n','');
            count++;
            clients[cname] = socket; //we are inserting the new client into the empty array 'cleints'
            socket.write(`Welcome ${cname} to this chat room. There are ${count} active users`)
            sendMessage( `${cname} joined the chat room`, socket);   // 1st time message 
        }
        else{
            sendMessage(`> ${cname} : ${data}`)   // client is sedning messages which is already part of the chatroom
        }
    });

    socket.on('close',()=>{   // this event will be triggered if user is leaving the chat room
    count--;
    delete clients[cname];
    sendMessage(`${cname} left the room`);
})

    socket.on('end',()=>{      // this event will be triggered if ended the connection
        console.log('client disconnected')
        //process.exit();
    });
});

function sendMessage(message, connection){  // client connected + cleint leaving + client sending messages
    for(let client in clients)
    {
        if(clients[client] !== connection)
        {
            clients[client].write(message); // it wiil work for second time client sending message
        }
    }
}

server.on('error',(err)=>{
    console.log(err)
})

server.listen(8000,()=>{
    console.log('server listening');
})