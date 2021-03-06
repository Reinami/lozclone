var Unicorns = Unicorns || {};

Unicorns.Play = function(){};

Unicorns.Play.prototype = {
	create: function (self, mapId, player) {
		var self = this;
		// If no map id given, assume start of the game.
		this.mapId = mapId ? mapId : 'overworld';
		
		// Debug
		this.game.time.advancedTiming = true;
		
		// Create the map
		this.game.world.setBounds(64, 64, GAMEHEIGHT, GAMEWIDTH);
		this.map = new Map(this.game);
		this.map.create(this.mapId);

		// Create the player
		this.player = player ? player : new Player(this.game, this.map);
		this.player.create();
		
		// Create Collision detection
		this.collisionDetection = new CollisionDetection(this.game,
														 this.player,
														 this.map);
	},
	update: function() {
		this.player.update();
		this.map.update();
		this.collisionDetection.update();
		// console.log(this.game.time.fps);
	},
};
