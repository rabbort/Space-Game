var ship = (function()
{
    var controlsenabled = false;
    var loader = new THREE.ColladaLoader();
    var hull;
    var hullbody;
    var hullmass = 5000;
    var firerate = 175;
    var healrate = 1000;
    var firing = false;
    var lastTime;
    var lastheal;
    var thrusting = false;
    var maxhp = 200;
    var hp = maxhp;
    var id;
    var shipcolor;
    var shipteam;
    var textureloader = new THREE.TextureLoader();
    var spawnposition = new THREE.Vector3();
    
    // The position of this will be used to spawn bullets
    var bulletpoint = new THREE.Object3D();
    
    // Position of these used to spawn thruster particles
    var thrusters = new Array();
    
    // Set up these now so they don't have to be calculated every time the ship moves
    var localorigin = new CANNON.Vec3(0, 0, 0);
    var rollpoint = new CANNON.Vec3(50000, 0, 0);
    var pitchpoint = new CANNON.Vec3(0, 50000, 0);
    var strafeforceleft = new CANNON.Vec3(hullmass / 4, 0, 0);
    var strafeforceright = new CANNON.Vec3(-hullmass / 4, 0, 0);
    var turnforceleft = new CANNON.Vec3(hullmass / 70000, 0 ,0);
    var turnforceright = new CANNON.Vec3(-hullmass / 70000, 0, 0);
    var thrustforceforward = new CANNON.Vec3(0, -hullmass * 1.1, 0);
    var thrustforcebackward = new CANNON.Vec3(0, hullmass / 4, 0);
    var verticlethrustup = new CANNON.Vec3(0, 0, hullmass / 4);
    var verticlethrustdown = new CANNON.Vec3(0, 0, -hullmass / 4);

    return {
        addship: function(team)
        {
            shipteam = team;
        
            if(team == 'red')
                loader.load('assets/models/redship.dae', function(collada)
                {
                    shipcolor = 0x550000;
                
                    scene.add(collada.scene);
                    camera.position.set(0, 20, 5);
                    collada.scene.add(camera);
                    
                    collada.scene.traverse(function(child)
                    {
                        if (child.material) 
                        {
                            child.material.materials[0].emissive.r = 4;
                            child.material.materials[0].emissive.g = 1;
                            child.material.materials[0].emissive.b = 1
                            child.material.materials[1].emissive.r = 4;
                            child.material.materials[1].emissive.g = 1;
                            child.material.materials[1].emissive.b = 1;
                        }
                    });

                    hull = collada.scene;
                    spawnposition.set(-1000, -1000, 110);
                    hull.position.copy(spawnposition);
                    
                    scene.add(bulletpoint);
                    bulletpoint.position.set(0, -16, 0);
                    hull.add(bulletpoint);
                    camera.lookAt(bulletpoint.position);
                    
                    var thruster1 = new THREE.Object3D();
                    scene.add(thruster1);
                    thruster1.position.set(3.8, -0.2, 1.2);
                    hull.add(thruster1);
                    thrusters.push(thruster1);
                    
                    var thruster2 = new THREE.Object3D();
                    scene.add(thruster2);
                    thruster2.position.set(0.0, -1.5, 1.8);
                    hull.add(thruster2);
                    thrusters.push(thruster2);
                    
                    var thruster3 = new THREE.Object3D();
                    scene.add(thruster3);
                    thruster3.position.set(-3.8, -0.2, 1.2);
                    hull.add(thruster3);
                    thrusters.push(thruster3);
                    
                    hullbody = new CANNON.Body({mass:hullmass, position:hull.position, angularDamping:0.5, linearDamping:0.5});
                                            
                    shape = new CANNON.Sphere(3);
                    hullbody.addShape(shape, new CANNON.Vec3(-2, -1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, -1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-6, -2, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(6, -2, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(8, -4, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-8, -4, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-2, -6, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, -6, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(0, -9, 0));
                                            
                    world.add(hullbody);
                });
            else if(team == 'blue')
                loader.load('assets/models/blueship.dae', function(collada)
                {
                    shipcolor = 0x000055;
                
                    scene.add(collada.scene);
                    camera.position.set(0, 20, 5);
                    collada.scene.add(camera);
                    
                    collada.scene.traverse(function(child)
                    {
                        if (child.material) 
                        {
                            child.material.materials[0].emissive.r = 0;
                            child.material.materials[0].emissive.g = 0;
                            child.material.materials[0].emissive.b = 255;
                            child.material.materials[1].emissive.r = 0;
                            child.material.materials[1].emissive.g = 0;
                            child.material.materials[1].emissive.b = 255;
                            child.material.materials[2].emissive.r = 0;
                            child.material.materials[2].emissive.g = 0;
                            child.material.materials[2].emissive.b = 255;
                        }
                    });

                    hull = collada.scene;
                    spawnposition.set(1000, 1000, 110);
                    hull.position.copy(spawnposition);
                    
                    scene.add(bulletpoint);
                    bulletpoint.position.set(0, -16, 0);
                    hull.add(bulletpoint);
                    camera.lookAt(bulletpoint.position);
                    
                    var thruster1 = new THREE.Object3D();
                    scene.add(thruster1);
                    thruster1.position.set(5.25, 6.5, 0.5);
                    hull.add(thruster1);
                    thrusters.push(thruster1);
                    
                    var thruster2 = new THREE.Object3D();
                    scene.add(thruster2);
                    thruster2.position.set(-5.25, 6.5, 0.5);
                    hull.add(thruster2);
                    thrusters.push(thruster2);

                    
                    hullbody = new CANNON.Body({mass:hullmass, position:hull.position, angularDamping:0.5, linearDamping:0.5});
                                            
                    shape = new CANNON.Sphere(3);
                    hullbody.addShape(shape, new CANNON.Vec3(-2, 1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, 1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-6, -2, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(6, -2, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(4, 5, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-4, 5, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-2, -4, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, -4, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(0, -7, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, 5, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-2, 5, 0));
                                            
                    world.add(hullbody);
                });
            else if(team == 'yellow')
                loader.load('assets/models/yellowship.dae', function(collada)
                {
                    shipcolor = 0x555500;
                
                    scene.add(collada.scene);
                    camera.position.set(0, 20, 5);
                    collada.scene.add(camera);
                    
                    collada.scene.traverse(function(child)
                    {
                        if (child.material) 
                        {
                            child.material.materials[0].emissive.r = 4;
                            child.material.materials[0].emissive.g = 4;
                            child.material.materials[0].emissive.b = 1
                            child.material.materials[1].emissive.r = 4;
                            child.material.materials[1].emissive.g = 4;
                            child.material.materials[1].emissive.b = 1;
                        }
                    });

                    hull = collada.scene;
                    spawnposition.set(-1000, 1000, 110);
                    hull.position.copy(spawnposition);
                    
                    scene.add(bulletpoint);
                    bulletpoint.position.set(0, -16, 0);
                    hull.add(bulletpoint);
                    camera.lookAt(bulletpoint.position);
                    
                    var thruster1 = new THREE.Object3D();
                    scene.add(thruster1);
                    thruster1.position.set(-5.0, 2.5, 0);
                    hull.add(thruster1);
                    thrusters.push(thruster1);
                    
                    var thruster2 = new THREE.Object3D();
                    scene.add(thruster2);
                    thruster2.position.set(0.0, 3.5, 0);
                    hull.add(thruster2);
                    thrusters.push(thruster2);
                    
                    var thruster3 = new THREE.Object3D();
                    scene.add(thruster3);
                    thruster3.position.set(5.0, 2.5, 0);
                    hull.add(thruster3);
                    thrusters.push(thruster3);
                    
                    hullbody = new CANNON.Body({mass:hullmass, position:hull.position, angularDamping:0.5, linearDamping:0.5});
                                            
                    shape = new CANNON.Sphere(3);
                    hullbody.addShape(shape, new CANNON.Vec3(-2, -1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, -1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-6, -1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(6, -1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(7, 1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-7, 1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-2, -6, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, -6, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(0, -9, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, 3, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-2, 3, 0));
                                            
                    world.add(hullbody);
                });
            else if(team == 'green')
                loader.load('assets/models/greenship.dae', function(collada)
                {
                    shipcolor = 0x005500;
                
                    scene.add(collada.scene);
                    camera.position.set(0, 20, 5);
                    collada.scene.add(camera);
                    
                    collada.scene.traverse(function(child)
                    {
                        if (child.material) 
                        {                            
                            child.material.materials[0].emissive.r = 1;
                            child.material.materials[0].emissive.g = 4;
                            child.material.materials[0].emissive.b = 1
                            child.material.materials[1].emissive.r = 1;
                            child.material.materials[1].emissive.g = 4;
                            child.material.materials[1].emissive.b = 1;
                        }
                    });

                    hull = collada.scene;
                    spawnposition.set(1000, -1000, 110);
                    hull.position.copy(spawnposition);
                    
                    scene.add(bulletpoint);
                    bulletpoint.position.set(0, -16, 0);
                    hull.add(bulletpoint);
                    camera.lookAt(bulletpoint.position);
                    
                    var thruster1 = new THREE.Object3D();
                    scene.add(thruster1);
                    thruster1.position.set(-2.4, 5.5, 1);
                    hull.add(thruster1);
                    thrusters.push(thruster1);
                    
                    var thruster2 = new THREE.Object3D();
                    scene.add(thruster2);
                    thruster2.position.set(2.4, 5.5, 1);
                    hull.add(thruster2);
                    thrusters.push(thruster2);

                    
                    hullbody = new CANNON.Body({mass:hullmass, position:hull.position, angularDamping:0.5, linearDamping:0.5});
                                            
                    shape = new CANNON.Sphere(3);
                    hullbody.addShape(shape, new CANNON.Vec3(-2, 1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, 1, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-6, -2, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(6, -2, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(3, 4, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-3, 4, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(-2, -4, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(2, -4, 0));
                    hullbody.addShape(shape, new CANNON.Vec3(0, -7, 0));
                                            
                    world.add(hullbody);
                });
        },
        sendposition: function()
        {
            if(typeof(hullbody) != "undefined")
            {
                // Send position to server
                client.updateposition(hullbody.position, hullbody.quaternion);
            }
        },
        update: function(time)
        {
            if(typeof(hull) != "undefined" && typeof(hullbody) != "undefined")
            {             
                // Update the model to match physics body
                hull.position.copy(hullbody.position);
                hull.quaternion.copy(hullbody.quaternion);
                
                if(ship.getvisible())
                {
                    if(lastTime == undefined && firing)
                    {
                        projectiles.spawnBullet((new THREE.Vector3).setFromMatrixPosition(ship.getbulletmatrix()));
                        lastTime = time;
                    }
                    else if(lastTime !== undefined && firing)
                    {
                        if(time - lastTime > firerate)
                        {
                            projectiles.spawnBullet((new THREE.Vector3).setFromMatrixPosition(ship.getbulletmatrix()));
                            lastTime = time;
                        }
                    }
                    
                    if(lastheal === undefined)
                    {
                        lastheal = time;
                    }
                    else if(hp < 200 && spacestation.getdistance(hullbody.position, shipteam) < 150)
                    {
                        if(time - lastheal > healrate)
                        {
                            hp += 5;
                            lastheal = time;
                        }
                    }
                }
                
                if(controlsenabled)
                {
                    // Forward/backward
                    if(keyboard.pressed('w'))
                    {
                        hullbody.applyLocalImpulse(thrustforceforward, localorigin);
                        if(!thrusting)
                        {
                            sounds.thrust();
                            thrusting = true;
                        }
                    }
                    else if(keyboard.pressed('s'))
                        hullbody.applyLocalImpulse(thrustforcebackward, localorigin);
                    else if(thrusting)
                    {
                        sounds.stopthrust();
                        thrusting = false;
                    }
                    
                    // Strafe left/right
                    if(keyboard.pressed('q'))
                        hullbody.applyLocalImpulse(strafeforceleft, localorigin);
                    else if(keyboard.pressed('e'))
                        hullbody.applyLocalImpulse(strafeforceright, localorigin);
                        
                    // Turn left/right
                    if(keyboard.pressed('a'))
                        hullbody.applyLocalImpulse(turnforceright, pitchpoint);
                    else if(keyboard.pressed('d'))
                        hullbody.applyLocalImpulse(turnforceleft, pitchpoint);
                        
                    // Vertical thrust
                    if(keyboard.pressed('z'))
                        hullbody.applyLocalImpulse(verticlethrustup, localorigin);
                    else if(keyboard.pressed('x'))
                        hullbody.applyLocalImpulse(verticlethrustdown, localorigin);
                }
            }
        },
        getPosition: function()
        {
            if(typeof(hull) != "undefined")
                return hull.position;
        },
        getcolor: function()
        {
            return shipcolor;
        },
        getteam: function()
        {
            return shipteam;
        },
        getbodyposition: function()
        {
            if(hullbody !== undefined)
                return hullbody.position;
        },
        getbody: function()
        {
            return hullbody;
        },
        setid: function(clientid)
        {
            // Set the player's id - given by server
            id = clientid;
        },
        getid: function()
        {
            if(id !== undefined)
                return id;
        },
        getbulletmatrix: function()
        {
            return bulletpoint.matrixWorld;
        },
        mousecontrol: function(event)
        {
            if(controlsenabled)
            {
                // Get the change in mouse position
                var movementX = event.movementX || event.mozMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || 0;
                
                // Apply it to the ship - X direction is for roll, Y direction for pitch
                if(hullbody !== undefined)
                {
                    hullbody.applyLocalImpulse(new CANNON.Vec3(0, 0, hullmass / 2000000 * movementY), pitchpoint);
                    hullbody.applyLocalImpulse(new CANNON.Vec3(0, 0, hullmass / 2000000 * movementX), rollpoint);
                }
            }
        },
        setfiringstatus: function()
        {
            firing = !firing;
        },
        getthrustermatrix: function(index)
        {
            return thrusters[index].matrixWorld;
        },
        getnumthrusters: function()
        {
            return thrusters.length;
        },
        setvisible: function(bool)
        {
            hull.visible = bool;
        },
        getvisible: function()
        {
            if(hull !== undefined)
                return hull.visible;
        },
        setcontrols: function(bool)
        {
            controlsenabled = bool;
        },
        getspeed: function()
        {
            if(hullbody !== undefined)
                return hullbody.velocity.length();
            else
                return 0;
        },
        getteam: function()
        {
            return shipteam;
        },
        gethp: function()
        {
            return hp;
        },
        updatedamage: function(team)
        {
            hp -= 10;
            
            if(hp <= 0 && hull.visible)
            {
                client.scoreupdate(team);
                client.destroy();
                // Explode, hide mesh, deactivate collisions/forces
                particles.explode(hull.position);
                sounds.explode(hull.position);
                hull.visible = false;
                hullbody.sleep();
                hullbody.collisionFilterGroup = 0;
                
                // Respawn after 10 seconds
                setTimeout(function() 
                { 
                    // Reactivate forces
                    hullbody.wakeUp();
                    // Set quaternion to make the ship upright again
                    hullbody.quaternion.set(0, 0, 0, 1);
                    // Set position to the station
                    hullbody.position.copy(spawnposition);
                    // Apply an upward force
                    hullbody.applyLocalImpulse(new CANNON.Vec3(0, 0, hullmass * 15), localorigin);
                    // Reactivate collisions
                    hullbody.collisionFilterGroup = 1;
                    // Make mesh visible again
                    hull.visible = true;
                    // Reset hp to full
                    hp = maxhp;
                    // Play the spawning sound
                    sounds.spawn();
                }, 10000);
            }
        }
    };
})();