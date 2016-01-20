var hud = (function() 
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    var littlefont = height / 50;
    var bigfont = height / 30;
    
    var redscore = 0;
    var bluescore = 0;
    var yellowscore = 0;
    var greenscore = 0;

    // Create a 2D canvas element for the HUD
    var hudCanvas = document.createElement('canvas');

    hudCanvas.width = width;
    hudCanvas.height = height;

    // Get 2D context and set the font
    var hudBitmap = hudCanvas.getContext('2d');
    hudBitmap.font = "Normal 40px Arial";
    hudBitmap.textAlign = 'left';
    hudBitmap.fillStyle = "rgba(245,0,245,0.75)";

    // Create the camera and set the viewport to match the screen dimensions
    var cameraHUD = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 30);

    // Create a custom scene for the HUD
    var sceneHUD = new THREE.Scene();

    // Create texture from rendered graphics
    var hudTexture = new THREE.Texture(hudCanvas) 
    hudTexture.minFilter = THREE.LinearFilter;
    hudTexture.needsUpdate = true;

    // Create HUD material
    var material = new THREE.MeshBasicMaterial({map: hudTexture});
    material.transparent = true;

    // Create plane to render the HUD. This plane fill the whole screen
    var planeGeometry = new THREE.PlaneGeometry(width, height);
    var plane = new THREE.Mesh(planeGeometry, material);
    sceneHUD.add(plane);
    
    return {
        update: function()
        {
            // Clear the old stuff
            hudBitmap.clearRect(0, 0, width, height);
            
            //Background
            hudBitmap.fillStyle = "rgba(50, 50, 50, 0.75)";
            hudBitmap.fillRect(0, 0, littlefont * 16, height / 6);
            
            if(ship.getcolor() !== undefined)
            {
                hudBitmap.fillRect(width - bigfont * 9, height - bigfont * 3.5, bigfont * 9, bigfont * 3.5);
                
                hudBitmap.font = "Normal "+bigfont+"px Arial";

                var team = ship.getteam();
                if(team == 'red')
                {
                    hudBitmap.fillStyle = "rgba(200, 0, 0, 0.75)";
                    hudBitmap.strokeStyle = "rgba(200, 0, 0, 0.75)";
                }
                else if(team == 'blue')
                {
                    hudBitmap.fillStyle = "rgba(0, 0, 200, 0.75)";
                    hudBitmap.strokeStyle = "rgba(0, 0, 200, 0.75)";
                }
                else if(team == 'yellow')
                {
                    hudBitmap.fillStyle = "rgba(200, 200, 0, 0.75)";
                    hudBitmap.strokeStyle = "rgba(200, 200, 0, 0.75)";
                }
                else if(team == 'green')
                {
                    hudBitmap.fillStyle = "rgba(0, 200, 0, 0.75)";
                    hudBitmap.strokeStyle = "rgba(0, 200, 0, 0.75)";
                }
                    
                if(ship !== undefined)
                {
                    // Speed
                    hudBitmap.fillText('Speed: '+(ship.getvisible() ? (ship.getspeed()).toFixed(1) : 0.0), width - bigfont * 7, height - bigfont * 1);
                    // HP
                    hudBitmap.fillText('HP: '+ship.gethp(), width - bigfont * 7, height - bigfont * 2);
                }
                
                // Draw the "crosshair"
                hudBitmap.beginPath();
                hudBitmap.arc(width / 2, height / 2 - 80, 50, -Math.PI / 4, Math.PI / 4);
                hudBitmap.lineWidth = 5;
                hudBitmap.stroke();
                hudBitmap.beginPath();
                hudBitmap.arc(width / 2, height / 2 - 80, 50, Math.PI / 1.32, -Math.PI / 1.32);
                hudBitmap.lineWidth = 5;
                hudBitmap.stroke();
            }
            
            // Team scores
            hudBitmap.font = "Normal "+littlefont+"px Arial";
            hudBitmap.fillStyle = "rgba(255, 255, 255, 0.75)";
            hudBitmap.fillText('Game Mode: Team Deathmatch', littlefont, littlefont * 2 - 5);
            hudBitmap.fillText('Team Scores', littlefont, littlefont * 3);
            hudBitmap.fillStyle = "rgba(255, 0, 0, 0.75)";
            hudBitmap.fillText('Red: '+redscore, littlefont, littlefont * 4);
            hudBitmap.fillStyle = "rgba(0, 0, 255, 0.75)";
            hudBitmap.fillText('Blue: '+bluescore, littlefont, littlefont * 5);
            hudBitmap.fillStyle = "rgba(0, 255, 0, 0.75)";
            hudBitmap.fillText('Green: '+greenscore, littlefont, littlefont * 6);
            hudBitmap.fillStyle = "rgba(255, 255, 0, 0.75)";
            hudBitmap.fillText('Yellow: '+yellowscore, littlefont, littlefont * 7);

            hudTexture.needsUpdate = true;
        },
        getscene: function()
        {
            return sceneHUD;
        },
        updatedimensions: function()
        {
            hudBitmap.clearRect(0, 0, width, height);
        
            width = window.innerWidth;
            height = window.innerHeight;
            
            littlefont = height / 50;
            bigfont = height / 30;
            
            hudCanvas.width = width;
            hudCanvas.height = height;
        },
        getcamera: function()
        {
            return cameraHUD;
        },
        updatescore: function(scores)
        {
            redscore = scores.red;
            bluescore = scores.blue;
            yellowscore = scores.yellow;
            greenscore = scores.green;
        }
    }
})();