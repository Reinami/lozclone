var Unicorns = Unicorns || {};

Unicorns.Game = function(){};

Unicorns.Game.prototype = {
	create: function () {
		// Debug
		this.game.time.advancedTiming = true;

		// Create the ground
		this.map = new Map(this.game);
		this.map.create();

		// Create the player
		this.player = new Player(this.game);
		this.player.create();
	},
	update: function() {
		this.player.update();
		// console.log(this.game.time.fps);
	},
};
