const fileNum = 5
var fileOrder = []
var currTestImgId = 0
var testImgCorrect = 0
var timerStr
var firstTimeTest = true;
var countDownDate = new Date().getTime();

// http://stackoverflow.com/questions/962802#962890
function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

function joemama(intbaby) {
	x = document.createElement("div");
	x.innerHTML = "AMONGUS!!! " +  intbaby*intbaby;
	document.body.appendChild(x);
}
isTesting = false;
function beginTest() {
	document.getElementById("testoptions").className = "hidden";
	isTesting = true;
	countDownDate = new Date().getTime();
	if(firstTimeTest) {
		var x = setInterval(function() {
		var now = new Date().getTime();
		var distance = now - countDownDate;
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		var milliseconds = Math.floor((distance % (1000 * 60)));
		
		// Output the result in an element with id="demo"
		if(seconds > 0) {
			milliseconds = String(milliseconds).slice(-3);
		}
		if(isTesting) {
			timerStr = minutes + "m " + seconds + "s " + milliseconds + "milli"
			document.getElementById("timer").innerHTML = timerStr
			+ "<br>" + (currTestImgId+1) + "/" + fileNum*2;
			document.getElementById("testimg").src = fileOrder[currTestImgId];
		}
		}, 1);
	}
	firstTimeTest = false;
	
	document.getElementById("testimg").className = "testimg";
	currTestImgId = 0;
	testImgCorrect = 0;
	fileOrder = []
	for(var i = 0; i != fileNum; i++) fileOrder.push("testimg/p" + i + ".png");
	for(var i = 0; i != fileNum; i++) fileOrder.push("testimg/n" + i + ".png");
	fileOrder = shuffle(fileOrder);
}

function endTest() {
	isTesting = false;
	document.getElementById("testimg").className = "hidden";
	document.getElementById("testoptions").className = "";
	resultstr = "You got " + testImgCorrect + " out of " + fileNum*2 + " correct in " + timerStr;
	if(isRight) resultstr += " in right handed mode!<br>";
	else resultstr += " in left handed mode!<br>";
	document.getElementById("results").innerHTML += resultstr
}

function restartWebsite() {
	window.location.reload();
}

function upvoteDownvoteButtons(isAlt) {
	up = document.getElementById("upvote");
	down = document.getElementById("downvote");
	console.log("AMONGUS", isAlt);
	if(isAlt) {
		down.className = "bottomright";
		up.className = "bottomleft";
	} else {
		up.className = "bottomright";
		down.className = "bottomleft";
	}
}

function swapVoteButtons() {
	upvoteDownvoteButtons(document.getElementById("upvote").className == "bottomright");
}

function userDownVote() {
	console.log("downvote");
	if(fileOrder[currTestImgId][8] == 'n') testImgCorrect += 1;
	currTestImgId += 1;
	if(currTestImgId >= fileNum*2) endTest();
}
function userUpVote() {
	console.log("upvote");
	if(fileOrder[currTestImgId][8] == 'p') testImgCorrect += 1;
	currTestImgId += 1;
	if(currTestImgId >= fileNum*2) endTest();
}

upvoteDownvoteButtons(false);

document.addEventListener('keydown', function(event) {
	isRight = document.getElementById("upvote").className == "bottomright";
	pushedp = event.keyCode == 80;
	pushedq = event.keyCode == 81;
	if(!isTesting) {
		if(pushedp || pushedq) beginTest();
		return;
	}
	
    if(pushedp && isRight || pushedq && !isRight) userUpVote();
	else if(pushedq && isRight || pushedp && !isRight) userDownVote();
}, true);