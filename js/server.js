var Server = function(channel, timeStep) {
	this.channel = channel;
	this.timeStep = timeStep;
	this.time = 10 * 60 * 1000;
};

Server.prototype.gameLoop = function() {
	console.log('SERVER TIME', this.time);
	this.time -= this.timeStep;
	if (this.time > 0) {
		this.sendMessage(this.time);
	}
};

Server.prototype.sendMessage = function() {
	this.channel.sendMessage(this.time);
};

Server.prototype.init = function() {
	this.gameLoop();

	setInterval((function(self) {
		return function() {
			self.gameLoop();
		};
	})(this), this.timeStep);
};