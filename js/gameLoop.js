var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// time and frames
var interval = 1000/60;
var timer = setInterval(animate,interval);

var fx = .90;
var fy = .90;


player = new gameObject();
player.force = 1;

follower = new gameObject();
follower.x =20;
follower.y = 20;
follower.color = "#ff0000";
follower.force = 1;



function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);
   
    angularMovement();
    player.drawTriangle();
    follower.drawTriangle();
    point();
    follow();


}
function angularMovement()
{ 
    // follower.angle +=2; // infinate spins

    if (w)
    {
        var radians = player.angle * Math.PI / 180;

        player.ax = Math.cos(radians);
        player.ay = Math.sin(radians);

        player.vx += player.ax * player.force;
        player.vy += player.ay * player.force;
    }

    if (s)
    {
        var radians = player.angle * Math.PI / 180;

        player.ax = Math.cos(radians);
        player.ay = Math.sin(radians);

        player.vx += player.ax * -player.force;
        player.vy += player.ay * -player.force;
    }


    if(a)
    {
        player.angle -=2;
    }
    if(d)
    {
        player.angle +=2;
    }
    player.vx *=fx
    player.vy *=fy


    player.move();
}

function point() // in game compass?
{
    var dx = player.x - follower.x;
    var dy = player.y - follower.y;

    var radians = Math.atan2(dy,dx);
    follower.angle = radians * 180/Math.PI;

}
function follow()
{
    var dx = player.x - follower.x;
    var dy = player.y - follower.y;

    var radians = Math.atan2(dy,dx);

    follower.vx = Math.cos(radians) * follower.force;
    follower.vy = Math.sin(radians) * follower.force;

    follower.x +=follower.vx * 2;
    follower.y +=follower.vy * 2;


}
