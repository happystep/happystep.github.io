//Paintball Splat Particle System
//Luis Bobadilla -- Inspired by http://codepen.io/Xanmia/

//global variables
var movementSpeed = 50; //we should have an on click event to dynamically change this variable
var totalObjects = 30; //number ofck particles per cli
var objectSize = 50; //relative size of each particle
var sizeRandomness = 10; //sets a random size when on click is hit
var color =  0xFFFFFF; //white color
var isAnimate = true; //boolean to know if we should pause/unpause animation
var image = ["images/blue.png", "images/orange.png","images/limegreen.png", "images/purple.png", "images/turqua.png","images/pink.png"]; //images of the particles
var dirs = []; //array contains directions for the particle systems
var parts = []; //array contains different particle systems
var container = document.createElement('div'); //create the div
document.body.appendChild( container ); //add the container to the document body (the html)

//camera is initialized here
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 2000;

//scene is initialized here
var scene = new THREE.Scene();

//explosion animation function, takes x and y speeds as parameters
function ExplodeAnimation(x,y)
{
    //geometry inilization
    var geometry = new THREE.Geometry();

    for (i =0; i< totalObjects; i ++)
    {
        var vertex = new THREE.Vector3();
        vertex.x = x; //this are actually set to 0
        vertex.y = y; //also set to 0
        vertex.z = 0;

        geometry.vertices.push( vertex);
        dirs.push({x:(Math.random() * movementSpeed)-(movementSpeed/2),y:(Math.random() * movementSpeed)-(movementSpeed/2),z:(Math.random() * movementSpeed)-(movementSpeed/2)});
      }
    var currentColor = image[Math.floor(Math.random() * image.length)]; //randomly choosing an image (particle) for current system on every click
    var material = new THREE.ParticleBasicMaterial( { size: objectSize,  map: THREE.ImageUtils.loadTexture(currentColor),blending: THREE.AdditiveBlending,
        transparent: true  });

    //initialization of the particles with the geometry and material made above
    var particles = new THREE.ParticleSystem( geometry, material );

    this.object = particles;
    this.status = true;
    this.xDir = (Math.random() * movementSpeed);
    this.yDir = (Math.random() * movementSpeed);
    this.zDir = (Math.random() * movementSpeed);

    //here we add the object to the scene
    scene.add( this.object  );

    //update function for the particles (loops thru the number of particles in a system)
    this.update = function(){
        if (isAnimate){
            if (this.status == true){
                var pCount = totalObjects;
                while(pCount--) {
                    var particle =  this.object.geometry.vertices[pCount]
                    particle.y += dirs[pCount].y;
                    particle.x += dirs[pCount].x;
                    particle.z += dirs[pCount].z;
                    }
                this.object.geometry.verticesNeedUpdate = true;
            }
        }
    }
}

//WebGL Renderer Initialized
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

//initialparticle system
renderer.render( scene, camera );
parts.push(new ExplodeAnimation(0, 0));
render();

//render function
function render() {
    requestAnimationFrame( render );

    var pCount = parts.length;
    while(pCount--) {
        parts[pCount].update();
    }

    renderer.render( scene, camera );


}

//event handler for arrow keys
document.onkeydown = function(e) {
    switch (e.keyCode) {
          case 40:
            //pause or unpause case
            if(isAnimate){
                isAnimate = false;
            }
            else
                isAnimate = true;
            break;
        default:
            //any other key
            break;
    }
}

//event handler listeners for click and
window.addEventListener( 'mousedown', onclick, false );
window.addEventListener( 'resize', onWindowResize, false );

//onclick function event handler
function onclick(){
    event.preventDefault();
    parts.push(new ExplodeAnimation(0,0);
}

//takes care of resizing of window event handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}
