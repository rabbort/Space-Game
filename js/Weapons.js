var projectiles = (function () 
{
    var bulletmap = new Map();
    var toberemoved = new Array();
    var lastTime;
    var fireposition = new THREE.Vector3(0, 0, 0);

    return {
        spawnBullet: function(position) 
        {
            // Create the projectile
            var lifespan = {time:5000};
            var bulletbody = new CANNON.Body({mass:0.0000001, 
                                              position:position, 
                                              shape:new CANNON.Sphere(0.5),
                                            });
            
            // Add the bullet to world
            world.add(bulletbody);
            
            // Store in a map so we can update the lifespan later
            bulletmap.set(bulletbody, lifespan);

            // Calculate the direction to send it in
            var direction = new THREE.Vector3();
            direction.setFromMatrixPosition(ship.getbulletmatrix());
            direction.sub(ship.getPosition()).normalize();
            
            // Send to network
            client.spawnprojectile(ship.getcolor(), position, direction);
            
            // Apply an impulse in the direction
            bulletbody.applyImpulse(new CANNON.Vec3(direction.x, direction.y, direction.z).scale(0.00003), bulletbody.position);

            // Play firing sound
            sounds.shoot(fireposition);
            
            var collided = false;
            
            // When the bullet collides with something, play an impact sound and remove it from the map, scene, and world
            bulletbody.addEventListener("collide", function(e)
            {
                if(!collided && e.body != ship.getbody())
                {
                    collided = true;
                    sounds.hit(e.body.position.vsub(ship.getbodyposition()));
                    bulletmap.delete(bulletbody);
                    toberemoved.push(bulletbody);
                    bulletbody.collisionFilterGroup = 0;
                    particles.bullethit(bulletbody.position, ship.getcolor());

                    var damaged = false;
                    networkship.getships().forEach(function(value, key, map)
                    {
                        if(!damaged)
                        {
                            // Check for the body it collided with and make sure it's an enemy (no friendly fire)
                            if(e.body == value.body && value.color != ship.getcolor())
                            {
                                // Send the damage update to server
                                client.damageupdate(key, ship.getteam());
                                // Update this ship's HP
                                networkship.updatedamage(key);
                                // Update the score if the ship is destroyed
                                /*if(value.hp <= 0)
                                {
                                    client.scoreupdate(ship.getteam());
                                }*/
                                
                                damaged = true;
                            }
                        }
                    });
                 }
            });
        },
        update: function(time) 
        {
            // Update all bullet meshes to their corresponding physics entities
            if(lastTime !== undefined)
            {
                bulletmap.forEach(function(value, key, map) 
                {
                    // Subtract the delta time from this bullets lifespan
                    value.time -= time - lastTime;
                    
                    // If the lifespan reaches 0, remove from the world
                    if(value.time < 0)
                    {
                        toberemoved.push(key);
                        bulletmap.delete(key);
                    }
                });
            }
                
            lastTime = time;
        },
        removebullets: function()
        {
            // Removes all collided/expired bullets, called after the step to reduce stuttering issues
            for(var i = toberemoved.length - 1; i >= 0; i--)
            {
                world.remove(toberemoved[i]);
                toberemoved.splice(i, 1);
            }
        },
        getbulletmap: function()
        {
            return bulletmap;
        }
    };
})();