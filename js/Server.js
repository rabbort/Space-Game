var server = (function()
{
    // Keep track of connected clients
    var clientmap = new Array();

    var scores = {red:0, blue:0, yellow:0, green:0};

    var app = require('http').createServer(handler);
    var io = require('socket.io')(app);
    var fs = require('fs');
    
    app.listen(25555);
    console.log("Server listening");
    
    function handler(req, res)
    {
        fs.readFile(__dirname + '/index.html',
        function(err, data)
        {
            if(err)
            {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            
            res.writeHead(200);
            res.end(data);
        });
    }
    
    io.on('connection', function(socket)
    {
        // Send the currently connected clients and current score to this client
        io.to(socket.id).emit('map', {map:clientmap, id:socket.client.id});
        io.to(socket.id).emit('scoreupdate', {scores:scores});
        
        socket.on('addship', function(data)
        {
            // Add this client to the list of connected clients when they select their team
            clientmap.push({id:socket.client.id, color:data.color});
            socket.broadcast.emit('addship', {id:socket.client.id, color:data.color});
        });

        socket.on('position', function(data)
        {
            socket.broadcast.emit('position', {id:socket.client.id, position:data.pos, quaternion:data.quat});
        });

        socket.on('spawnprojectile', function(data)
        {
            socket.broadcast.emit('spawnprojectile', {color:data.color, position:data.pos, direction:data.dir});
        });

        socket.on('damageupdate', function(data)
        {
            socket.broadcast.emit('damageupdate', {id:data.id, team:data.team});
        });

        socket.on('destroy', function(data)
        {
            socket.broadcast.emit('destroy', {id:socket.client.id});
        });
        
        socket.on('disconnect', function()
        {
            io.emit('disconnect', { id:socket.client.id });
            
            for(var i = clientmap.length - 1; i >= 0; i--)
            {
                 if(clientmap[i].id == socket.client.id)
                 {
                      clientmap.splice(i, 1);
                      
                      // Reset scores if everybody left the game
                      if(clientmap.length == 0)
                      {
                           scores.red = 0;
                           scores.blue = 0;
                           scores.yellow = 0;
                           scores.green = 0;
                      }

                      break;
                 }
            }
        });

        socket.on('scoreupdate', function(data)
        {
             if(data.team == 'red')
                  scores.red++;
             else if(data.team == 'blue')
                  scores.blue++;
             else if(data.team == 'yellow')
                  scores.yellow++;
             else if(data.team == 'green')
                  scores.green++;

             console.log(scores);

             io.emit('scoreupdate', {scores:scores});
        });
    });
})();
