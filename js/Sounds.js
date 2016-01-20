var sounds = (function() 
{
    // Load up some bullet impact sound effects - used when a bullet collides with something
    var bullethits = new Array();
    /*bullethits.push(new Howl({urls:['assets/audio/IMPACT_Bullet_Metal_01_mono.ogg']}));
    bullethits.push(new Howl({urls:['assets/audio/IMPACT_Bullet_Metal_04_mono.ogg']}));
    bullethits.push(new Howl({urls:['assets/audio/IMPACT_Bullet_Metal_05_mono.ogg']}));*/
    bullethits.push(new Howl({urls:['assets/audio/EXPLOSION_Subtle_Bright_Swoosh_stereo.ogg']}));
    
    var fire = new Howl({urls:['assets/audio/BLASTER_Short_Medium_Muffled_stereo.ogg']});
    var thruster = new Howl({urls:['assets/audio/THRUSTER_Flanger_Shifting_Burning_Air_Muffled_loop.ogg'], loop:true});
    var explode = new Howl({urls:['assets/audio/EXPLOSION_Long_Two_Stage_Burning_then_Smooth_Short.ogg']});
    var spawn = new Howl({urls:['assets/audio/MAGIC_SPELL_Slow_Fade_Metallic_Wobble_Echo_stereo.ogg']});
    
    return {
        hit: function(position) 
        {
            // Select a random bullet sound to play 
            var index = Math.floor(Math.random() * bullethits.length);
            
            // Set the 3D position of the hit and play the sound
            bullethits[index].pos3d(position.x / 2, position.y / 2, position.z / 2).play();
        },
        shoot: function(position)
        {
            fire.pos3d(position.x / 10, position.y / 10, position.z / 10).play();
        },
        thrust: function()
        {
            thruster.volume(1.0);
            thruster.play();
        },
        stopthrust: function()
        {
            thruster.fade(1.0, 0.0, 2500, function() {thruster.stop()});
        },
        explode: function(position)
        {
            explode.pos3d(position.x / 10, position.y / 10, position.z / 10).play();
        },
        spawn: function()
        {
            spawn.play();
        }
    };
})();