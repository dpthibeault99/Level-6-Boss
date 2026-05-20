var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// time and frames
var interval = 1000/60;
var timer = setInterval(animate,interval);

var fx = .90;
var fy = .90;

var bullets = [];


player = new gameObject();
player.x = 200;
player.y = 200;
player.force = 1;

player2 = new gameObject();
player2.x =824;
player2.y = 600;
player2.color = "#ff0000";
player2.force = 1;



function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);
   
    angularMovement();

    player.drawTriangle();
    player2.drawLeftTriangle();

    shoot();
    moveBullets();
}

function angularMovement()
{ 
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
        player.angle -= 2;
    }

    if(d)
    {
        player.angle += 2;
    }

    player.vx *= fx;
    player.vy *= fy;


    // player2

    if (up)
    {
        var radians = player2.angle * Math.PI / 180;

        player2.ax = Math.cos(radians);
        player2.ay = Math.sin(radians);

        player2.vx += player2.ax * -player2.force;
        player2.vy += player2.ay * -player2.force;
    }

    if (down)
    {
        var radians = player2.angle * Math.PI / 180;

        player2.ax = Math.cos(radians);
        player2.ay = Math.sin(radians);

        player2.vx += player2.ax * player2.force;
        player2.vy += player2.ay * player2.force;
    }

    if(left)
    {
        player2.angle -= 2;
    }

    if(right)
    {
        player2.angle += 2;
    }

    player2.vx *= fx;
    player2.vy *= fy;

    player.move();
    player2.move();
}

function shoot()
{
    if(enter)
    {
        console.log("P2 Shoots");

        var radians = (player2.angle + 180) * Math.PI / 180;

        var tipX = player2.x + Math.cos(radians) * (player2.width / 2);
        var tipY = player2.y + Math.sin(radians) * (player2.width / 2);

        var bullet = new gameObject(tipX, tipY, 10, 10, player2.color);

        bullet.force = 8;
        bullet.vx = Math.cos(radians) * bullet.force;
        bullet.vy = Math.sin(radians) * bullet.force;

        bullets.push(bullet);
    }
}

function moveBullets()
{
    for(var i = 0; i < bullets.length; i++)
    {
        bullets[i].move();
        bullets[i].drawCircle();
    }
}