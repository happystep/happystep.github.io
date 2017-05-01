// inspiration from this website
// http://codepen.io/Xanmia/
//threejs - demo - http://threejs.org/examples/webgl_particles_random.html

//variables we need for it

var movementSpeed = 50; //we should have an on click event to dynamically change this variable
var totalObjects = 30;
var objectSize = 20;
var sizeRandomness = 10; //since we are setting x and y initial for the particles to 0, we don't need thi variable but lets keep it for now
var color =  0xFFFFFF;
var isAnimate = true;
var image = ["images/blue.png", "images/orange.png","images/limegreen.png", "images/purple.png", "images/turqua.png","images/pink.png"];

//other variables we need to declare at the top of the script

var dirs = [];
var parts = [];
var container = document.createElement('div');
document.body.appendChild( container );

//camera is initialized here

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 2000;

//scene is initialized here

var scene = new THREE.Scene();


//explosion animation function here

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
        //dirs.push({x:(Math.random() * movementSpeed),y:(Math.random () *movementSpeed),z:(Math.random() *movementSpeed)});
    }
    var currentColor = image[Math.floor(Math.random() * image.length)];
    var material = new THREE.ParticleBasicMaterial( { size: objectSize,  map: THREE.ImageUtils.loadTexture(currentColor),blending: THREE.AdditiveBlending,
        transparent: true  });
    //color: color[Math.round(Math.random() * color.length)],
    ///
    var particles = new THREE.ParticleSystem( geometry, material );

    this.object = particles;
    this.status = true;

    //this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
    //this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
    //this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);

    this.xDir = (Math.random() * movementSpeed);
    this.yDir = (Math.random() * movementSpeed);
    this.zDir = (Math.random() * movementSpeed);

    //this.xDir = (movementSpeed);
    //this.yDir = (movementSpeed);
    //this.zDir = (movementSpeed);


    scene.add( this.object  );

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


}//end of Explosion Animation function



var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

//initialparticle
renderer.render( scene, camera );
parts.push(new ExplodeAnimation(0, 0));
render();

function render() {
    requestAnimationFrame( render );

    var pCount = parts.length;
    while(pCount--) {
        parts[pCount].update();
    }

    renderer.render( scene, camera );


}

function leftArrowPressed(){
  movementSpeed -= 10;
    //render();
}

function rightArrowPressed(){
  movementSpeed += 10;
  //  render();
}
function upArrowPressed(){
  movementSpeed = 50;
}


document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            //alert('left'); //this will be slow down
            leftArrowPressed();

            break;
        case 38:
            //alert('up') does nothing
            upArrowPressed();
            break;
        case 39:
            //alert('right'); //this will be make it faster
            rightArrowPressed();
            break;
        case 40:
            //alert('down'); this will be pause
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
};
window.addEventListener( 'mousedown', onclick, false );
window.addEventListener( 'resize', onWindowResize, false );

function onclick(){
    event.preventDefault();
    parts.push(new ExplodeAnimation(0,0));
    //parts.push(new ExplodeAnimation((Math.random() * sizeRandomness)-(sizeRandomness/2), (Math.random() * sizeRandomness)-(sizeRandomness/2)));
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
