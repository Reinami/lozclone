function CollisionDetection(game, player, map){
	// Game
	this.game = game;
	
	// Collidable objects
	this.player = player;
	this.map = map;
};

CollisionDetection.prototype = {
	update: function() {
		// Collide with impassable terrain
		this.game.physics.arcade.collide(this.player.sprite, this.map.collisionLayer);
		
		// Detect collision with world bounds, if collision is detect, scroll the map
		this.game.physics.arcade.collide(this.player.sprite, this.map.worldBounds);
		this.map.field.setTileIndexCallback(69, this.map.scrollMap.bind(this.map), this.game, this.map.worldBounds);
    }
};