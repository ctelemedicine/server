var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
var usernames={};  
app.listen(3000);

function handler (req, res) {

    res.writeHead(200);
    res.end(data);

}




	
io.sockets.on('connection', function (socket) {
	console.log(socket.id + "has been connected...");


socket.on('adduser', function(message){
		socket.usernames = message;
		 console.log(message +' Register ');
        usernames[message] = socket.id;
       
       

  });
  //BROADCASTING
	 socket.on('message', function(message){
	
		
			io.sockets.emit('message', {socektId:socket.id});
			 console.log("Received message: " + message + " - from client " + socket.id);
	
       
	});
	 socket.on('pmessage',function(message){
	
		//console.log(usernames[message] + " and " + socket.id + " to  " + message);
		console.log(message);
		
		 
	//	message=JSON.stringify(message);
		//message={name:"pmessage"};
		console.log(message.longitude);
		console.log(message.userid);
		console.log(usernames[message.userid]);
		if(usernames[message.userid])
		{		console.log(usernames[message.userid] + "available");
				io.sockets.socket(usernames[message.userid]).emit("message",message); 
		}
		else{
			console.log(message.userid + "   not available");
			console.log(socket.id);
			io.sockets.socket(socket.id).emit("message",{type:"emergency",result:"error",userid:message.userid,name:message.name}); 
		}
		
			
	
		
		
		

  });
	socket.on('user message', function (msg) {
		socket.broadcast.emit('message', '');
	});

	socket.on('disconnect', function(){
		
			delete usernames[socket.usernames];
		console.log("Connection " + socket.id + " terminated.");
  });
  });




