function CollisionDetection(game, player, map){
	// Game
	this.game = game;
	
	// Collidable objects
	this.player = player;
	this.map = map;
};

CollisionDetection.prototype = {
	update: function() {
		this.game.physics.arcade.collide(this.player.sprite, this.map.collisionLayer);
    }
};