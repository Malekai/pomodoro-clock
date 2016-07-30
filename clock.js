//notes for what's needed
//--need to make sure that when user hits 0; clicker turns off.

//set variables that change for session
  var sessionNum = $("#sessionNum");
  var fullTime = sessionNum.html();
  var timeDigits = Number(fullTime[0] + fullTime[1])
  var breakNum = $("#breakNum");
  var breakTime = breakNum.html();
  var digits = Number(breakTime[0]);

//make + and - buttons adjust the variable up and down
  $('#plusSession').click(function(event){
    event.stopPropagation();
    //bring up the start time
    timeDigits++;
    sessionNum.html(String(timeDigits) + ":" + "00");
  });

  $('#minusSession').click(function(event){
    event.stopPropagation();
    //bring down start time
    if (timeDigits > 0) {
      timeDigits--;
      sessionNum.html(String(timeDigits) + ":" + "00");
    }
  });

  $('#plusBreak').click(function(){
    //bring up the start time
    digits++;
    breakNum.html(String(digits) + ":" + "00");
  });

  $('#minusBreak').click(function(){
    //bring down start time
    if (digits > 0) {
      digits--;
      breakNum.html(String(digits) + ":" + "00");
    }
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
var timeStore
//function to initiate timer
function timer() {
  var myTime = sessionNum.html();
  //check if clock has hit 00:00 and then turn into break
  if (myTime == "00:00") {
    $('.circle').toggleClass('start');
    $('#sessionNum').toggleClass("onBreak");
    $('h2').toggleClass("orange");
    $('#sessionNum').toggleClass("orange");
    if ($('#sessionNum').hasClass("onBreak")) {
      $('#sessionNum').html(String(digits) + ":" + "00");
      $('h2').text("Break Time!");
      return;
    } //make timer go back to session time
    else if(!$('#sessionNum').hasClass("onBreak")) {
      timeDigits = Number(fullTime[0] + fullTime[1])
      $('#sessionNum').html(String(timeDigits) + ":" + "00");
      $('h2').text("Session");
      return;
    }
  }

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

}

//function to pause timer
function pauseTimer(){
  clearTimeout(t);
}
