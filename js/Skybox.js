var skybox = (function()
{
    var textureloader = new THREE.TextureLoader();

    // Load the textures for each face of a cube
    var textures = [new THREE.MeshBasicMaterial({map:textureloader.load("assets/textures/Sky_Space_Nebula_Red_Cam_2_Left-X.png")}),
                    new THREE.MeshBasicMaterial({map:textureloader.load("assets/textures/Sky_Space_Nebula_Red_Cam_3_Right-X.png")}),
                    new THREE.MeshBasicMaterial({map:textureloader.load("assets/textures/Sky_Space_Nebula_Red_Cam_4_Up-Y.png")}),
                    new THREE.MeshBasicMaterial({map:textureloader.load("assets/textures/Sky_Space_Nebula_Red_Cam_5_Down-Y.png")}),
                    new THREE.MeshBasicMaterial({map:textureloader.load("assets/textures/Sky_Space_Nebula_Red_Cam_0_Front-Z.png")}),
                    new THREE.MeshBasicMaterial({map:textureloader.load("assets/textures/Sky_Space_Nebula_Red_Cam_1_Back-Z.png")})];
    var material = new THREE.MeshFaceMaterial(textures);
    
    // Make the cube mesh and add to scene
    var sky = new THREE.Mesh(new THREE.BoxGeometry(4200, 4200, 4200, 7, 7, 7), material);
    sky.scale.x = -1;
    
    return {
        addsky: function()
        {
            // Add the skybox to the scene
            scene.add(sky);
            sky.position.copy(camera.position);
        },
        update: function(position)
        {
            // Moves the skybox, position is meant to be the players position
            if(sky !== undefined && position !== undefined)
                sky.position.copy(position);
        }
    };    
})();