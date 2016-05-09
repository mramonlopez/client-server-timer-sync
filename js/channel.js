var Channel = function() {
	this.callback = undefined;
	this.callbackContext = undefined;
};

Channel.prototype.listen = function(callback, context) {
	this.callback = callback;
	this.callbackContext = context;
};

Channel.prototype.sendMessage = function(message) {
	var delay = Math.floor(Math.random() * 3000) + 1000;

	console.log('DELAY', delay);

	if (this.callback && this.callbackContext) {
		setTimeout((function(self, callback) {
			return function() {
				callback.call(self, message);
			}
		})(this.callbackContext, this.callback), delay);
	}
};