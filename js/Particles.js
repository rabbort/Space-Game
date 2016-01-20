var particles = (function ()
{
    var tick = 0;
    var spawnrate = 15000;
    var particleSystem = new THREE.GPUParticleSystem({maxParticles: 500000});

    // Used to visualize thrusters
    var thrusteroptions = 
    {
        position: new THREE.Vector3(),
        positionRandomness: 0.5,
        velocity: new THREE.Vector3(),
        velocityRandomness: 0.5,
        color: 0xff1011,
        colorRandomness: 0.05,
        turbulence: 0.0,
        lifetime: 0.15,
        size: 30,
        sizeRandomness: 5
    };
    
    // Used as a visual for projectiles
    var ammooptions = 
    {
        position: new THREE.Vector3(),
        positionRandomness: 1.2,
        velocity: new THREE.Vector3(),
        velocityRandomness: 0.1,
        color: 0x1110ff,
        colorRandomness: 0.05,
        turbulence: 0.0,
        lifetime: 0.5,
        size: 20,
        sizeRandomness: 1
    };
    
    var bulletoptions =
    {
        position: new THREE.Vector3(),
        positionRandomness: 2,
        velocity: new THREE.Vector3(),
        velocityRandomness: 1.5,
        color: 0xff3933,
        colorRandomness: .2,
        turbulence: 0.1,
        lifetime: 2,
        size: 6,
        sizeRandomness: 1
    };
    
    // Used to create space dust particles
    var dustoptions = 
    {
        position: new THREE.Vector3(),
        positionRandomness: 500.0,
        velocity: new THREE.Vector3(),
        velocityRandomness: 1.1,
        color: 0xffffff,
        colorRandomness: 0.2,
        turbulence: 0.0,
        lifetime: 10.0,
        size: 15,
        sizeRandomness: 1
    };
    
    // Used in ship explosions
    var explosionoptions = 
    {
        position: new THREE.Vector3(),
        positionRandomness: 8,
        velocity: new THREE.Vector3(),
        velocityRandomness: 2222222.5,
        color: 0xff3933,
        colorRandomness: .2,
        turbulence: 0.1,
        lifetime: 5,
        size: 10,
        sizeRandomness: 500
    };
    var abc = 0;
    return {
        addsystem:function()
        {
            scene.add(particleSystem);
        },
        spawn: function(delta)
        {
            tick += delta;

            // Thrusters - Player ship
            thrusteroptions.color = ship.getcolor();
            for(var i = 0; i < ship.getnumthrusters(); i++)
            {
                if(ship.getvisible())
                {
                    // Get the thruster positions
                    thrusteroptions.position.setFromMatrixPosition(ship.getthrustermatrix(i));
                    
                    // Spawn particles for each thruster
                    for(var j = 0; j < 5000 * delta; j++)
                    {
                        particleSystem.spawnParticle(thrusteroptions);
                    }
                }
            }
            
            networkship.getships().forEach(function(value, key, map)
            {
                if(value.model.visible)
                {
                    thrusteroptions.color = value.color;
                    for(var i = 0; i < value.thrusters.length; i++)
                    {
                        // Copy position from the body found inside the map
                        thrusteroptions.position.setFromMatrixPosition(value.thrusters[i].matrixWorld);
                        
                        
                        // Spawn particles for each thruster
                        for(var j = 0; j < 5000 * delta; j++)
                        {
                            particleSystem.spawnParticle(thrusteroptions);
                        }
                    }
                }
            });
            
            // Projectiles
            ammooptions.color = ship.getcolor();
            projectiles.getbulletmap().forEach(function(value, key, map) 
            {
                // Get the position of the projectile
                ammooptions.position.copy(key.position);
                
                // Spawn particles for it
                for(var i = 0; i < 1000 * delta; i++)
                {
                    particleSystem.spawnParticle(ammooptions);
                }
            });     

            networkprojectiles.getprojectilemap().forEach(function(value, key, map)
            {
                // Get the position of the projectile
                ammooptions.position.copy(key.position);
                // Set the color
                ammooptions.color = value.color;
                
                // Spawn particles for it
                for(var i = 0; i < 1000 * delta; i++)
                {
                    particleSystem.spawnParticle(ammooptions);
                }
            });

            // Space dust
            if(ship.getPosition() !== undefined && Math.random() > 0.7)
            {
                dustoptions.position.copy(ship.getPosition());
            
                particleSystem.spawnParticle(dustoptions);
            }
            
            particleSystem.update(tick);
        },
        bullethit: function(position, color)
        {
            bulletoptions.position.copy(position);
            bulletoptions.color = color;
                
            for(var i = 0; i < 2500; i++)
            {
                particleSystem.spawnParticle(bulletoptions);
            }
        },
        explode: function(position)
        {
            explosionoptions.position.copy(position);
                
            for(var i = 0; i < 2500; i++)
            {
                particleSystem.spawnParticle(explosionoptions);
            }
        }
    };
})();