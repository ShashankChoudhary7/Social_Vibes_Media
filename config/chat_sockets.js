module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        io.on('disconnected', function(){
            console.log('socket disconnected');
        });

        socket.on('join_room', function(data){
            console.log('joining req rec..', data);

            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);

        });

     // CHANGE :: detect send_message and broadcast to everyone in the room
     socket.on('send-message', function(data){
        io.in(data.chatroom).emit('receive-message', data);
     });
     
  });
}