# Space Game

The game can be played [here](https://spacegame.azurewebsites.net)

This was a project done using Three.js to create a 3D multiplayer space combat game. Three.js was used to handle most of the game, including rendering, model loading, texture loading, and particle systems. Cannon.js was used to handle physics, which includes ship and projectile collisions. Socket.IO was used to handle the multiplayer part of the game.

- [Three.js](#three.js)
- [Physics](#Physics)
- [Multiplayer](#Multiplayer)

##Three.js

Three.js was used to create a rendering loop to display the game. Models were loaded with Three.js for the ships and space stations, which were in Collada (.dae) format. Three.js also provided a GPU particle system, which spawned particles for the ship thrusters and projectiles. A space skybox was used for the background by loading a set of six textures to be placed on each face of the cube.

##Physics

Cannon.js was used to handle the physics of the game. Each ship and space station used a compound collider, made up of simple shapes (mostly spheres and boxes) which were placed in such a way to match the mesh of the model as closely as possible. Projectiles used a small sphere collider, which has a force applied to it in the direction the firing ship is facing.

To control the ships, a force is applied in the direction the player wishes to move, allowing the ship to accelerate over time up to a maximum speed. Damping was used to make controlling the ship easier. With this enabled, the ship will decelerate until it is no longer moving if no movement input is received.

##Multiplayer

Socket.IO was used to allow players to play the game together. It used a client-server architecture, with the server being hosted on an AWS Linux VM. The main things being sent between client and server are players connecting/disconnecting, player position and rotation, projectile locations, and damage updates.

Upon connection, the server adds the client to a list of connected players and sends a notification to the other clients that a new player has connected and what team they are on. When a player disconnects, the server removes the player from the list and sends a disconnect notification to each client with the disconnected player's ID.

Each player periodically sends their position and rotation to the server, which then sends this data to all other connected players. When a player fires, a notification is sent to the server with the position and direction of the projectile. This data is sent to each other client so they can spawn and see the projectile. Projectile collision is handled client-side, with each client handling their own projectiles. When a player's projectile hits another ship, a damage update is sent to the server and then sent to the client whose ship was it. When a player's hit points reach 0, the ship explodes by making the mesh invisible and releasing a particle explosion. A notification is also sent to the server so that other players will see the same explosion. After a 10 second delay, the player respawns at their home space station.
