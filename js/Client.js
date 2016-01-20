var client = (function()
{
    var socket = io('http://52.90.253.152:25555');
    socket.on('addship', function(data) { networkship.addship(data.id, data.color); });
    socket.on('event', function(data) { console.log("Event"); });
    socket.on('disconnect', function(data) { networkship.removeship(data.id); });
    socket.on('news', function(data) { console.log(data); });
    socket.on('position', function(data) { networkship.update(data.id, data.position, data.quaternion) });
    socket.on('map', function(data)
    {
        // Wait until scene is loaded
        if(typeof(scene) === "undefined")
        {
            setTimeout(function() 
            { 
                ship.setid(data.id);
            
                for(var i = 0; i < data.map.length; i++)
                {
                    networkship.addship(data.map[i].id, data.map[i].color);
                }

            }, 5000);
        }
        else
        {
            ship.setid(data.id);
            
            for(var i = 0; i < data.map.length; i++)
            {
                networkship.addship(data.map[i].id, data.map[i].color);
            }
        }
    });
    
    socket.on('spawnprojectile', function(data)
    {
        networkprojectiles.addprojectile(data.color, data.position, data.direction);
    });
    
    socket.on('damageupdate', function(data)
    {
        // Check if the player is taking damage
        // If so, update the player's HP
        if(ship.getid() == data.id)
            ship.updatedamage(data.team);
        // Otherwise, it must be another player
        else
            networkship.updatedamage(data.id);
    });
    
    socket.on('scoreupdate', function(data)
    {
        hud.updatescore(data.scores);
    });
    
    socket.on('destroy', function(data)
    {
        networkship.destroy(data.id);
    });
    
    return {
        updateposition: function(position, quaternion)
        {
            socket.emit('position', {pos:position, quat:quaternion});
        },
        spawnprojectile: function(color, position, direction)
        {
            socket.emit('spawnprojectile', {color:color, pos:position, dir:direction});
        },
        damageupdate: function(id, team)
        {
            socket.emit('damageupdate', {id:id, team:team});
        },
        scoreupdate: function(team)
        {
            socket.emit('scoreupdate', {team:team});
        },
        addship: function(color)
        {
            socket.emit('addship', {color:color});
        },
        destroy: function()
        {
            socket.emit('destroy', {});
        }
    };
})();