spacestation = (function()
{
    var loader = new THREE.ColladaLoader();
    var redstation;
    var bluestation;
    var yellowstation;
    var greenstation;
    
    function addshapes(stationbody)
    {
        // Make various shapes to fit the station
        uppertopshape = new CANNON.Cylinder(60, 80, 18, 20);
        upperbottomshape = new CANNON.Cylinder(80, 60, 15, 20);
        antennashape = new CANNON.Box(new CANNON.Vec3(5, 5, 30));
        bodyuppercone = new CANNON.Cylinder(50, 10, 40, 20);
        centershaftsmall = new CANNON.Cylinder(10, 10, 13, 20);
        centershaftlarge = new CANNON.Cylinder(15, 15, 10, 20);
        bottomofshaft = new CANNON.Cylinder(10, 20, 10, 20);
        bottomcyl = new CANNON.Cylinder(20, 10, 16, 20);
        bottomantenna1 = new CANNON.Box(new CANNON.Vec3(3, 6.5, 13));
        bottomantenna2 = new CANNON.Box(new CANNON.Vec3(2, 3, 15));
        bottomantenna3 = new CANNON.Box(new CANNON.Vec3(1, 1, 19));
        bottomantenna4 = new CANNON.Box(new CANNON.Vec3(3, 6, 5));
        bottomantenna5 = new CANNON.Box(new CANNON.Vec3(2, 3, 10));
        bottomantenna6 = new CANNON.Box(new CANNON.Vec3(1, 1, 12));
        bottomantenna7 = new CANNON.Box(new CANNON.Vec3(3, 3, 7));
        bottomantenna8 = new CANNON.Box(new CANNON.Vec3(1, 1, 10));
        cylinderarraybox = new CANNON.Box(new CANNON.Vec3(12, 12, 12));
        ringpiece = new CANNON.Box(new CANNON.Vec3(3, 12, 3));
        ringpiece2 = new CANNON.Box(new CANNON.Vec3(3, 14, 4));
        smallringpiece = new CANNON.Box(new CANNON.Vec3(2, 11, 2));
        smallringpiece2 = new CANNON.Box(new CANNON.Vec3(2, 5, 2));
        smallringpiece3 = new CANNON.Box(new CANNON.Vec3(2, 8, 2));
        largebox = new CANNON.Box(new CANNON.Vec3(11, 34, 7));
        
        // Place them in the appropriate locations
        stationbody.addShape(uppertopshape, new CANNON.Vec3(0, 0, 95));
        stationbody.addShape(upperbottomshape, new CANNON.Vec3(0, 0, 78));
        stationbody.addShape(bodyuppercone, new CANNON.Vec3(0, 0, 50));
        stationbody.addShape(centershaftsmall, new CANNON.Vec3(0, 0, 23));
        stationbody.addShape(centershaftlarge, new CANNON.Vec3(0, 0, 12));
        stationbody.addShape(centershaftsmall, new CANNON.Vec3(0, 0, 0));
        stationbody.addShape(bottomofshaft, new CANNON.Vec3(0, 0, -10));
        stationbody.addShape(bottomcyl, new CANNON.Vec3(0, 0, -23));
        stationbody.addShape(bottomantenna1, new CANNON.Vec3(0, 10, -30));
        stationbody.addShape(bottomantenna2, new CANNON.Vec3(0, 5, -50));
        stationbody.addShape(bottomantenna3, new CANNON.Vec3(0, 7, -84));
        stationbody.addShape(bottomantenna4, new CANNON.Vec3(0, -11, -32));
        stationbody.addShape(bottomantenna5, new CANNON.Vec3(0, -5, -42));
        stationbody.addShape(bottomantenna6, new CANNON.Vec3(0, -7, -64));
        stationbody.addShape(bottomantenna7, new CANNON.Vec3(-9, -7, -32));
        stationbody.addShape(bottomantenna8, new CANNON.Vec3(-9, -5, -50));
        stationbody.addShape(antennashape, new CANNON.Vec3(0, -40, 135));
        stationbody.addShape(ringpiece, new CANNON.Vec3(-27, -62, 21), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 3), Math.cos(-Math.PI / 3)));
        stationbody.addShape(cylinderarraybox, new CANNON.Vec3(-42, -50, 21), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 7), Math.cos(Math.PI / 7)));
        stationbody.addShape(ringpiece, new CANNON.Vec3(-59, -34, 21), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 11), Math.cos(Math.PI / 11)));
        stationbody.addShape(cylinderarraybox, new CANNON.Vec3(-67, -12, 21), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 3.5), Math.cos(Math.PI / 3.5)));
        stationbody.addShape(ringpiece, new CANNON.Vec3(27, -62, 21), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 3), Math.cos(Math.PI / 3)));
        stationbody.addShape(cylinderarraybox, new CANNON.Vec3(42, -50, 21), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 7), Math.cos(-Math.PI / 7)));
        stationbody.addShape(ringpiece, new CANNON.Vec3(59, -34, 21), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 11), Math.cos(-Math.PI / 11)));
        stationbody.addShape(cylinderarraybox, new CANNON.Vec3(67, -12, 21), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 3.5), Math.cos(-Math.PI / 3.5)));
        stationbody.addShape(ringpiece2, new CANNON.Vec3(35, 56, 21), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 6.5), Math.cos(Math.PI / 6.5)));
        stationbody.addShape(ringpiece2, new CANNON.Vec3(-35, 56, 21), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 6.5), Math.cos(-Math.PI / 6.5)));
        stationbody.addShape(ringpiece, new CANNON.Vec3(12, 66, 14), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 4.5), Math.cos(Math.PI / 4.5)));
        stationbody.addShape(ringpiece, new CANNON.Vec3(-12, 66, 14), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 4.5), Math.cos(-Math.PI / 4.5)));
        stationbody.addShape(smallringpiece, new CANNON.Vec3(-20, -37, 47), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 3), Math.cos(-Math.PI / 3)));
        stationbody.addShape(smallringpiece, new CANNON.Vec3(-35, -24, 47), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 2.5), Math.cos(-Math.PI / 2.5)));
        stationbody.addShape(smallringpiece, new CANNON.Vec3(-41, -7, 47), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 2.1), Math.cos(-Math.PI / 2.1)));
        stationbody.addShape(smallringpiece2, new CANNON.Vec3(-42, 9, 47), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 1.9), Math.cos(-Math.PI / 1.9)));
        stationbody.addShape(smallringpiece, new CANNON.Vec3(20, -37, 47), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 3), Math.cos(Math.PI / 3)));
        stationbody.addShape(smallringpiece, new CANNON.Vec3(35, -24, 47), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 2.5), Math.cos(Math.PI / 2.5)));
        stationbody.addShape(smallringpiece, new CANNON.Vec3(41, -7, 47), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 2.1), Math.cos(Math.PI / 2.1)));
        stationbody.addShape(smallringpiece2, new CANNON.Vec3(42, 9, 47), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 1.9), Math.cos(Math.PI / 1.9)));
        stationbody.addShape(smallringpiece, new CANNON.Vec3(9, 41, 47), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 3.6), Math.cos(-Math.PI / 3.6)));
        stationbody.addShape(smallringpiece, new CANNON.Vec3(-9, 41, 47), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 3.6), Math.cos(Math.PI / 3.6)));
        stationbody.addShape(smallringpiece3, new CANNON.Vec3(24, 34, 47), new CANNON.Quaternion(0, 0, Math.sin(-Math.PI / 2.9), Math.cos(-Math.PI / 2.9)));
        stationbody.addShape(smallringpiece3, new CANNON.Vec3(-24, 34, 47), new CANNON.Quaternion(0, 0, Math.sin(Math.PI / 2.9), Math.cos(Math.PI / 2.9)));
        stationbody.addShape(largebox, new CANNON.Vec3(0, -75, 41), new CANNON.Quaternion(Math.sin(Math.PI / 50), 0, 0, Math.cos(Math.PI / 50)));
        stationbody.addShape(largebox, new CANNON.Vec3(0, -75, 41), new CANNON.Quaternion(Math.sin(Math.PI / 50), 0, 0, Math.cos(Math.PI / 50)));
        stationbody.addShape(largebox, new CANNON.Vec3(50, 75, 41), (new CANNON.Quaternion(Math.sin(Math.PI / 50), 0, 0, Math.cos(Math.PI / 50))).setFromEuler(0, 0, -35, 'ZYX'));
    }
    
    return {
        addredstation: function()
        {
            loader.load('assets/models/stationred.dae', function(collada)
            {
                scene.add(collada.scene);
                collada.scene.position.set(-1000, -1000, 0);
                redstation = collada.scene;
                
                // Create a stationary body (0 mass) for the space station
                stationbody = new CANNON.Body({mass:0.0, position:collada.scene.position});
                
                addshapes(stationbody);
                
                world.add(stationbody);
            });
        },
        addbluestation: function()
        {
            loader.load('assets/models/stationblue.dae', function(collada)
            {
                collada.scene.position.set(1000, 1000, 0);
                scene.add(collada.scene);
                bluestation = collada.scene;
                
                // Create a stationary body (0 mass) for the space station
                stationbody = new CANNON.Body({mass:0, position:collada.scene.position});
                
                addshapes(stationbody);
                
                world.add(stationbody);
            });
        },
        addgreenstation: function()
        {
            loader.load('assets/models/stationgreen.dae', function(collada)
            {
                collada.scene.position.set(1000, -1000, 0);
                scene.add(collada.scene);
                greenstation = collada.scene;
                
                // Create a stationary body (0 mass) for the space station
                stationbody = new CANNON.Body({mass:0, position:collada.scene.position});
                
                addshapes(stationbody);
                
                world.add(stationbody);
            });
        },
        addyellowstation: function()
        {
            loader.load('assets/models/stationyellow.dae', function(collada)
            {
                collada.scene.position.set(-1000, 1000, 0);
                scene.add(collada.scene);
                yellowstation = collada.scene;
                
                // Create a stationary body (0 mass) for the space station
                stationbody = new CANNON.Body({mass:0, position:collada.scene.position});
                
                addshapes(stationbody);
                
                world.add(stationbody);
            });
        },
        getdistance: function(objectposition, stationcolor)
        {
            if(stationcolor == 'red')
                return redstation.position.distanceTo(objectposition);
            else if(stationcolor == 'blue')
                return bluestation.position.distanceTo(objectposition);
            else if(stationcolor == 'yellow')
                return yellowstation.position.distanceTo(objectposition);
            else if(stationcolor == 'green')
                return greenstation.position.distanceTo(objectposition);
        }
    };
})();