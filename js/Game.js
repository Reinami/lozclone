var Unicorns = Unicorns || {};

Unicorns.Game = function(){};

Unicorns.Game.prototype = {
	create: function (self, mapId) {
		// If no map id given, assume start of the game.
		this.mapId = mapId ? mapId : 'overworld';
		console.log(this.mapId);
		// Debug
		this.game.time.advancedTiming = true;

		// Create the ground
		this.map = new Map(this.game);
		this.map.create(this.mapId);

		// Create the player
		this.player = new Player(this.game);
		this.player.create();
	},
	update: function() {
		this.player.update();
		// console.log(this.game.time.fps);
	},
};
