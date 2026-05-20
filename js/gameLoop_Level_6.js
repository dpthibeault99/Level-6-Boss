var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// time and frames
var interval = 1000/60;
var timer = setInterval(animate,interval);

var fx = .90;
var fy = .90;

var bullets = [];

var canShootP1 = true;
var canShootP2 = true;

var p1Score = 0;
var p2Score = 0;


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

    shootP1();
    shootP2();
    moveBullets();
    checkBulletHits();
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
function shootP1()
{
    if(spaceBar && canShootP1)
    {
        canShootP1 = false; // booleans prevent bullet hell

        console.log("P1 Shoots");

        var radians = (player.angle) * Math.PI / 180;

        var tipX = player.x + Math.cos(radians) * (player.width / 2);
        var tipY = player.y + Math.sin(radians) * (player.width / 2);

        var bullet = new gameObject(tipX, tipY, 10, 10, player.color);
        bullet.owner = "p1"; // this doesnt actully need to be here... (see function moveBullets() )


        bullet.force = 8;
        bullet.vx = Math.cos(radians) * bullet.force;
        bullet.vy = Math.sin(radians) * bullet.force;

        bullets.push(bullet);
    }

    if(!spaceBar)
    {
        canShootP1 = true;
    }
}
function shootP2()
{
    // player2
    if(enter && canShootP2)
    {
        canShootP2 = false;

        console.log("P2 Shoots");

        var radians = (player2.angle + 180) * Math.PI / 180;

        var tipX = player2.x + Math.cos(radians) * (player2.width / 2);
        var tipY = player2.y + Math.sin(radians) * (player2.width / 2);

        var bullet = new gameObject(tipX, tipY, 10, 10, player2.color);
        bullet.owner = "p2";


        bullet.force = 8;
        bullet.vx = Math.cos(radians) * bullet.force;
        bullet.vy = Math.sin(radians) * bullet.force;

        bullets.push(bullet);
    }

    if(!enter)
    {
        canShootP2 = true;
    }
}
// function shoot() // bullet hell code!!
// {
//     // player2
//     if(enter)
//     {
//         console.log("P2 Shoots");

//         var radians = (player2.angle + 180) * Math.PI / 180;

//         var tipX = player2.x + Math.cos(radians) * (player2.width / 2);
//         var tipY = player2.y + Math.sin(radians) * (player2.width / 2);

//         var bullet = new gameObject(tipX, tipY, 10, 10, player2.color);

//         bullet.force = 8;
//         bullet.vx = Math.cos(radians) * bullet.force;
//         bullet.vy = Math.sin(radians) * bullet.force;

//         bullets.push(bullet);
//     }
// }

function moveBullets()
{
    for(var i = 0; i < bullets.length; i++)
    {
        bullets[i].move();
        bullets[i].drawCircle();
    }
}

function checkBulletHits()
{
    for(var i = bullets.length - 1; i >= 0; i--)
    {
        var bullet = bullets[i];

        if(bullet.owner != "p1") // .ownwer needs to be in this function only
        {
            var dx1 = bullet.x - player.x;
            var dy1 = bullet.y - player.y;
            var distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

            if(distance1 < player.width / 2)
            {
                console.log("P1 was hit");
                bullets.splice(i, 1); // splice removes data from an array
                continue;
            }
        }

        if(bullet.owner != "p2")
        {
            var dx2 = bullet.x - player2.x;
            var dy2 = bullet.y - player2.y;
            var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            if(distance2 < player2.width / 2)
            {
                console.log("P2 was hit");
                bullets.splice(i, 1);
                continue;
            }
        }
    }
}