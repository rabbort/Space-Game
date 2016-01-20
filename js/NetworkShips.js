var networkship = (function()
{
    var networkships = new Map();
    var shipstoremove = new Array();

    var controlsenabled = false;
    var redloader = new THREE.ColladaLoader();
    var blueloader = new THREE.ColladaLoader();
    var yellowloader = new THREE.ColladaLoader();
    var greenloader = new THREE.ColladaLoader();
    var hull;
    var hullbody;
    var hullmass = 5000;
    var firerate = 175;
    var maxhp = 200;
    var firing = false;
    var lastTime;
    var thrusting = false;

    return {
        addship: function(id, team)
        {
            var thrusters = new Array();
            
            if(team == 'red')
                redloader.load('assets/models/redship.dae', function(collada)
                {
                    scene.add(collada.scene);
                    
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
                    hull.position.set(-1500, -1500, 100);
                    
                    hullbody = new CANNON.Body({mass:hullmass, position:hull.position, angularDamping:0.5, linearDamping:0.5});
                    
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
                    
                    var shipdata = {model:hull, body:hullbody, thrusters:thrusters, hp:maxhp, color:0x550000};
                    networkships.set(id, shipdata);
                });
            else if(team == 'blue')
                blueloader.load('assets/models/blueship.dae', function(collada)
                {
                    scene.add(collada.scene);
                    
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
                    hull.position.set(1500, 1500, 100);
                    
                    hullbody = new CANNON.Body({mass:hullmass, position:hull.position, angularDamping:0.5, linearDamping:0.5});

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
                    
                    var shipdata = {model:hull, body:hullbody, thrusters:thrusters, hp:maxhp, color:0x000055};
                    networkships.set(id, shipdata);
                });
            else if(team == 'yellow')
                yellowloader.load('assets/models/yellowship.dae', function(collada)
                {
                    scene.add(collada.scene);
                    
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
                    hull.position.set(-1500, 1500, 100);
                    
                    hullbody = new CANNON.Body({mass:hullmass, position:hull.position, angularDamping:0.5, linearDamping:0.5});

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
                    
                    var shipdata = {model:hull, body:hullbody, thrusters:thrusters, hp:maxhp, color:0x555500};
                    networkships.set(id, shipdata);
                });
            else if(team == 'green')
                greenloader.load('assets/models/greenship.dae', function(collada)
                {
                    scene.add(collada.scene);
                    
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
                    hull.position.set(1500, -1500, 100);

                    hullbody = new CANNON.Body({mass:hullmass, position:hull.position, angularDamping:0.5, linearDamping:0.5});

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
                    
                    var shipdata = {model:hull, body:hullbody, thrusters:thrusters, hp:maxhp, color:0x005500};
                    networkships.set(id, shipdata);
                });
        },
        removeship: function(id)
        {
            var remove = networkships.get(id);
            scene.remove(remove.model);
            shipstoremove.push(remove.body);
            networkships.delete(id);
        },
        removeshipbodies: function()
        {
            for(var i = shipstoremove.length - 1; i >= 0; i--)
            {
                world.remove(shipstoremove[i]);
                shipstoremove.splice(i, 1);
            }
        },
        update: function(id, position, quaternion)
        {
            // Get the appropriate ship from map
            var thisship = networkships.get(id);
            
            if(thisship !== undefined)
            {
                // Update model
                thisship.model.position.copy(position);
                thisship.model.quaternion.copy(quaternion);
                // Update body
                thisship.body.position.copy(position);
                thisship.body.quaternion.copy(quaternion);
            }
        },
        getPosition: function()
        {
            if(typeof(hull) != "undefined")
                return hull.position;
        },
        getbodyposition: function()
        {
            if(hullbody !== undefined)
                return hullbody.position;
        },
        getnumthrusters: function()
        {
            return 1;
        },
        setvisible: function(bool)
        {
            hull.visible =  bool;
        },
        setcontrols: function(bool)
        {
            controlsenabled = bool;
        },
        updatedamage: function(id)
        {
            /*networkships.forEach(function(value, key, map)
            {
                if(key == id)
                {
                    value.hp -= 10;
                    
                    if(value.hp <= 0 && value.model.visible)
                    {
                        // Explode, hide mesh, deactivate collisions
                        particles.explode(value.model.position);
                        sounds.explode(value.model.position.sub(ship.getPosition()));
                        value.model.visible = false;
                        value.body.collisionFilterGroup = 0;
                        
                        // Respawn 
                        setTimeout(function() 
                        {  
                            value.body.collisionFilterGroup = 1;
                            value.model.visible = true; 
                            value.hp = maxhp;
                        }, 10000);
                    }
                }
            });*/
        },
        destroy: function(id)
        {
            networkships.forEach(function(value, key, map)
            {
                if(key == id)
                {
                    // Explode, hide mesh, deactivate collisions
                    particles.explode(value.model.position);
                    sounds.explode(value.model.position.sub(ship.getPosition()));
                    value.model.visible = false;
                    value.body.collisionFilterGroup = 0;
                    
                    // Respawn 
                    setTimeout(function() 
                    {  
                        value.body.collisionFilterGroup = 1;
                        value.model.visible = true; 
                        value.hp = maxhp;
                    }, 10000);
                }
            });
        },
        getships: function()
        {
            return networkships;
        }
    };
})();