var TIMER_PERIOD = 100;

var Client = function(realTimerElement, serverTimerElement, fakeTimerElement, serverTimeStep) {
	this.realTimerElement = realTimerElement;
	this.serverTimerElement = serverTimerElement;
	this.fakeTimerElement = fakeTimerElement;
	this.serverTimeStep = serverTimeStep;

	this.realTimer = undefined;
	this.serverTimer = 0;
	this.fakeTimer = undefined;
};

Client.prototype.formatTime = function(time) {
	var min = Math.floor(time / 60000),
		sec = Math.floor((time - min * 60000)/ 1000);

	return min + ':' + sec;
} 

Client.prototype.gameLoop = function() {
	if (this.realTimer > 0) {
		(this.realTimer -= TIMER_PERIOD);
		this.realTimerElement.innerHTML = 'REAL TIME: ' + this.formatTime(this.realTimer);
	}

	if (this.serverTimer > 0) {
		(this.serverTimer -= TIMER_PERIOD);
		this.serverTimerElement.innerHTML = 'SERVER TIME: ' + this.formatTime(this.serverTimer);
	}

	if (this.fakeTimer > 0) {
		this.fakeTimer -= this.fakeSecond;
		this.fakeTimerElement.innerHTML = 'FAKE TIME: ' + this.formatTime(this.fakeTimer);
	}
};

Client.prototype.onNewMessage = function(time) {
	this.serverTimer = time;

	if (this.realTimer === undefined) {
		this.realTimer = time;
	}

	if (this.fakeTimer === undefined) {
		this.fakeTimer = time;
	}

	this.fakeSecond = TIMER_PERIOD + (this.fakeTimer - this.serverTimer) / (this.serverTimeStep / TIMER_PERIOD);
	console.log('FAKE SECOND:', this.fakeSecond);
};

Client.prototype.init = function() {
	this.gameLoop();

	setInterval((function(self) {
		return function() {
			self.gameLoop();
		}
	})(this), TIMER_PERIOD);
}