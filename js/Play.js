var Unicorns = Unicorns || {};

Unicorns.Play = function(){};

Unicorns.Play.prototype = {
	create: function (self, mapId, player) {
		// If no map id given, assume start of the game.
		this.mapId = mapId ? mapId : 'overworld';
		
		// Debug
		this.game.time.advancedTiming = true;

		// Create the ground
		this.map = new Map(this.game);
		this.map.create(this.mapId);

		// Create the player
		this.player = player ? player : new Player(this.game);
		this.player.create();
	},
	update: function() {
		this.player.update();
		this.game.physics.arcade.collide(this.player.sprite, this.map.collisionLayer);
		// console.log(this.game.time.fps);
	},
};
