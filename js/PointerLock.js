var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) 
{
    var element = document.body;
    var pointerlockchange = function ( event ) {
        if(document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) 
        {
            ship.setcontrols(true);
            blocker.style.display = 'none';
        } 
        else 
        {
            ship.setcontrols(false);
            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';
            if(ship.getcolor() == undefined)
                instructions = document.getElementById('instructions');
            else
            {
                instructions.style.fontSize = '30px';
                instructions.innerHTML = '<span style="font-size:30px">Click to resume game<br></span>'+
                '<div id="controls" style="font-size:15px;">'+
                    '<table border="1">'+
                        '<tr>'+
                            '<td><b>Controls:</b></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Help: ESC</td>'+
                            '<td>Fire: Left Click</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Forward: W</td>'+
                            '<td>Backward: S</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Turn Left: A</td>'+
                            '<td>Turn Right: D<br>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Strafe Left: Q</td>'+
                            '<td>Strafe Right: E</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Roll: Mouse X</td>'+
                            '<td>Pitch: Mouse Y</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Vertical Thrust Up: Z</td>'+
                            '<td>Vertical Thrust Down: X</td>'+
                        '</tr>'+
                    '</table>'+
                '</div>';
            }
            instructions.style.display = '';
        }
    };

var pointerlockerror = function(event) 
{
    instructions.style.display = '';
};

// Hook pointer lock state change events
document.addEventListener('pointerlockchange', pointerlockchange, false);
document.addEventListener('mozpointerlockchange', pointerlockchange, false);
document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
document.addEventListener('pointerlockerror', pointerlockerror, false);
document.addEventListener('mozpointerlockerror', pointerlockerror, false);
document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
instructions.addEventListener('click', function(event) 
{
    instructions.style.display = 'none';
    
    // Ask the browser to lock the pointer
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    if(/Firefox/i.test( navigator.userAgent)) 
    {
        var fullscreenchange = function(event)
        {
            if(document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) 
            {
                document.removeEventListener('fullscreenchange', fullscreenchange);
                document.removeEventListener('mozfullscreenchange', fullscreenchange);
                element.requestPointerLock();
            }
        };
        
        document.addEventListener('fullscreenchange', fullscreenchange, false);
        document.addEventListener('mozfullscreenchange', fullscreenchange, false);
        element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
        element.requestFullscreen();
    } 
    else 
    {
        element.requestPointerLock();
    }
}, false);
} 
else 
{
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}