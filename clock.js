//notes for what's needed
//--need to add break stuff including increasing and decreasing it

//set variables that change for session
var sessionNum = $("#sessionNum");
var breakNum = $("#breakNum");

var fullTime = sessionNum.html();
var timeDigits = Number(fullTime[0] + fullTime[1])

var breakTime = breakNum.html();

//when timer hits 0:00, turn orange for a second and then go to break mode
//--how do I check if timer has gone to 0?
//if (fullTime = "0:00")) {
  //display breakNum where sessionNum is
  //$('#sessionNum').html(breakTime);
//}

//if timer has changed 4 times go into bigger break mode

//make + and - buttons adjust the variable up and down and stop propogation
$('#plusSession').click(function(event){
  event.stopPropagation();
  //bring up the start time
  timeDigits++;
  sessionNum.html(String(timeDigits) + ":" + "00");
});

$('#minusSession').click(function(event){
  event.stopPropagation();
  //bring down start time
  timeDigits--;
  sessionNum.html(String(timeDigits) + ":" + "00");
});

//make timer countdown on and off when clicked
$('.circle').click(function(){
  $(this).toggleClass('start')
  if ($('.circle').hasClass('start')){
    timer();
  } else {
    pauseTimer();
  }
});

//initiate timer and save to variable so we can pause and resume
var t = 0;
//function to initiate timer
function timer() {
  var myTime = sessionNum.html();
  //split time so we can put into date through individual numbers
  var ss = myTime.split(":");
  var dt = new Date();
  //assign set time to date
  dt.setHours(0);
  dt.setMinutes(ss[0]);
  dt.setSeconds(ss[1]);
  //set the time interval
  var dt2 = new Date(dt.valueOf() - 1000);
  // break date up into only times
  var temp = dt2.toTimeString().split(" ");
  //split time up
  var ts = temp[0].split(":");

  sessionNum.html(ts[1]+":"+ts[2]);
  t = setTimeout(timer, 1000);
  console.log(ts);
}

//function to pause timer
function pauseTimer(){
  clearTimeout(t);
}
