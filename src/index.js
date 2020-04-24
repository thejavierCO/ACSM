const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const express = require("express");
const socket = require("socket.io");
const port = new SerialPort("COM5", { baudRate: 9600 });
const parser = new Readline();

const app = express();

app.set('port',process.env.PORT||3000);

app.use("/",express.static(__dirname+"/public"));

let serv = app.listen(app.get('port'),()=>{
console.log('run',app.get('port'))
});
const SIO = socket.listen(serv);

SIO.on("connection",(a)=>{
    console.log(a.id);
});
port.pipe(parser)
parser.on("data",(a)=>{
    SIO.emit("btntest",a);
});