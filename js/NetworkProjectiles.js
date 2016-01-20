var networkprojectiles = (function()
{
    var projectiles = new Map();
    var toberemoved = new Array();
    
    return {
        addprojectile(color, position, direction)
        {
            // Create the projectile
            var data = {lifespan:5000, color:color};
            var bulletbody = new CANNON.Body({mass:0.0000001, 
                                              position:position, 
                                              shape:new CANNON.Sphere(2),
                                            });
            
            // Add the bullet to world
            world.add(bulletbody);
            
            // Store in a map so we can update the lifespan later
            projectiles.set(bulletbody, data);
            
            // Apply an impulse in the direction
            bulletbody.applyImpulse(new CANNON.Vec3(direction.x, direction.y, direction.z).scale(0.00003), bulletbody.position);

            // Play firing sound
            sounds.shoot(bulletbody.position.vsub(ship.getbodyposition()));
            
            // When the bullet collides with something, play an impact sound and remove it from the map, scene, and world
            bulletbody.addEventListener("collide", function(e)
            {
                sounds.hit(e.body.position.vsub(ship.getbodyposition()));
                particles.bullethit(bulletbody.position, data.color);
                projectiles.delete(bulletbody);
                toberemoved.push(bulletbody);
            });
        },
        update: function(time) 
        {
            // Update all bullet meshes to their corresponding physics entities
            if(lastTime !== undefined)
            {
                projectiles.forEach(function(value, key, map) 
                {
                    // Subtract the delta time from this bullets lifespan
                    value.lifespan -= time - lastTime;
                    
                    // If the lifespan reaches 0, remove from the world
                    if(value.lifespan < 0)
                    {
                        toberemoved.push(key);
                        projectiles.delete(key);
                    }
                });
            }
                
            lastTime = time;
        },
        removeprojectiles: function()
        {
            // Removes all projectiles that need to be removed - called after the step
            for(var i = toberemoved.length - 1; i >= 0; i--)
            {
                world.remove(toberemoved[i]);
                toberemoved.splice(i, 1);
            }
        },
        getprojectilemap: function()
        {
            return projectiles;
        }
    };
})();