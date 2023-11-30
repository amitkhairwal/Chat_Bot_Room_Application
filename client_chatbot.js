const net = require('net');

var standard_input = process.stdin; // to take the message from the user console
standard_input.setEncoding('utf-8');  // message encoding

var client = net.connect({port:8000},()=>{
    console.log('connected to server')
});

client.setEncoding('utf8')  // server communication

client.on('data',(data) =>{   // data coming from server side
    console.log(data)
});

//Prompt the user to take input data in console.
console.log('Please input text in command line');

//When the user will enter the data and press enter key
standard_input.on('data',function (data){
    if(data == 'exit\n')
    {
        console.log('User input complete')
        client.end()
    }
    else{
        client.write(data)
    }
});


client.on('end',()=>{
    console.log('disconnected from server');
    process.exit();
})