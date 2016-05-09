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
		(this.realTimer -= 1000);
		this.realTimerElement.innerHTML = 'REAL TIME: ' + this.formatTime(this.realTimer);
	}

	if (this.serverTimer > 0) {
		(this.serverTimer -= 1000);
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

	this.fakeSecond = 1000 + (this.fakeTimer - this.serverTimer) / (this.serverTimeStep / 1000);
	console.log('FAKE SECOND:', this.fakeSecond);
};

Client.prototype.init = function() {
	this.gameLoop();

	setInterval((function(self) {
		return function() {
			self.gameLoop();
		}
	})(this), 1000);
}