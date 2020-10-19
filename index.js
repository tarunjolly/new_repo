const express = require('express');
const app = express();
var http = require('http');

var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.use('/',express.static(__dirname))

let players={};



app.get('/',(req,res)=>{
    console.log(' koi toh aaya ')
    res.send('Helloooooooooooo')
})


io.on('connect', function(socket){
    
    
    socket.on('create', function (player) {
        //console.log("idiidid" + player.roomName);
        socket.join(player.roomName);
        console.log(io.sockets.adapter.rooms[player.roomName]);
        players[`${player.socketId}`]=player;
        console.log(players);
      });


      socket.on('checkRoomExist',function(roomid){
          console.log(roomid);
          console.log(io.sockets.adapter.rooms[roomid]);
            if( io.sockets.adapter.rooms[roomid]!=undefined && io.sockets.adapter.rooms[roomid].length<2 ){
                socket.emit('existVerified',true)
            }else{
                socket.emit('existVerified',false)
   
            }
      })

    socket.on('get',function(roomid){
        let a =io.sockets.adapter.rooms[roomid].length;
        socket.emit('out',a);
    })


    socket.on('setopponent',function(roomid){
        console.log("all user in this room "+ roomid);
        var clients = io.sockets.adapter.rooms[roomid].sockets;   
        console.log(clients);
        let arr=[];
        for (const [key, value] of Object.entries(clients)) {
            arr.push(key);
          }
          console.log(arr);
          let player1=players[arr[0]]
          player1["opponent"]=arr[1];

          let player2=players[arr[1]];
          player2["opponent"]=arr[0];

          console.log(players);

    })


    socket.on("make_move",function(socketid){
        console.log("make_move");
        console.log(socketid);
        console.log(players[`${socketid}`]["opponent"]);
        let pla=players[`${socketid}`]["opponent"];
       // io.to().emit('player1_turn','your turn play now');
        //socket.to(`${pla}`).emit('player1_turn','your turn play now');
        //socket.emit('player1_turn',"abc");
        socket.to(pla).emit('hey', 'I just met you');
        console.log("done");
      //  io.sockets.in(players[`${socketid}`]["roomName"]).emit('connectToRoom', "You are in room no. ");


    })


    
    
    
    console.log('A user connected!' + socket.id); // We'll replace this with our own events
});



 server.listen(5000, () => {
     console.log("http://localhost:5000");
 })