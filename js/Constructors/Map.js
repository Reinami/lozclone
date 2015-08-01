function Map(game){
	// Game
	this.game = game;
	
	// Main Field
	this.field = null;
	
	// Tile Layers	
	this.backgroundLayer = null;
	this.collisionLayer = null;
	this.worldBounds = null;
	
	// Current bounds
	this.currentBounds = {'x': 32, 'y': 32};
};

Map.prototype = {
    create: function(mapId) {
    	console.log(this);
	    this.game.world.setBounds(this.currentBounds.x, this.currentBounds.y, 1024, 768);
		
		// Prep the rooms
		this.field = this.game.add.tilemap(mapId);
		
	    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	    this.field.addTilesetImage('tiled_assets', 'assets');
	
	    //create layer
	    this.backgroundLayer = this.field.createLayer('backgroundLayer');
	    this.collisionLayer = this.field.createLayer('collisionLayer');
	    this.worldBounds = this.field.createLayer('worldBounds');
	
	    //collision on blockedLayer
	    this.field.setCollisionBetween(1, 1200, true, 'collisionLayer');
	    this.field.setCollision(69, true, this.worldBounds);
    },
   
    scrollMap: function() {
    	this.currentBounds.y = this.currentBounds.y + 768 + 32;
    	this.game.world.setBounds(this.currentBounds.x, this.currentBounds.y, 1024, 768);
    	this.game.state.states.Play.player.sprite.y = this.game.state.states.Play.player.sprite.y + 64;
    }
};
