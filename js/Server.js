var server = (function()
{
    var http = require('http');
    
    http.createServer([function(request, response) // Request
    {
        // probably put if/else statements here based on what is received...
    },
    function(request, socket, head) // Client connect
    {
        console.log("client connected");
    }]).listen(8124);
    
    console.log("Server running...");
})();