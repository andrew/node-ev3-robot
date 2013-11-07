var Ev3 = require ("ev3-nodejs-bt");
var Ev3_base = Ev3.base;

var XboxController = require('xbox-controller')
var xbox = new XboxController;

var robot = new Ev3_base("/dev/tty.EV3-SerialPort");

var maxAngle = 32768
var maxSpeed = 100

robot.connect(function(){
	robot.start_program(function(ev3){

    var speeds = { a: 0, b: 0, c: 0, d: 0 }

    var setSpeed = function(){
  		var output = ev3.getOutputSequence(speeds.a,speeds.b,speeds.c,speeds.d);
  	  ev3.sp.write(output);
    }
    
    setInterval(setSpeed, 100)
        
    xbox.on('left:move', function(position){
      var x = -(position.x / maxAngle)*-maxSpeed
      var y = (position.y / maxAngle)*-maxSpeed
  
      var left =  y-x
      var right = y+x
      
      speeds.b = left
      speeds.a = right
    })
    
    xbox.on('a:press', function(){
      speeds.d = 100
    })
    
    xbox.on('a:release', function(){
      speeds.d = 0
    })
	});
});
