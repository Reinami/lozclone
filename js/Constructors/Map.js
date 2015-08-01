function Map(game){
	// Game
	this.game = game;
	
	// Main Field
	this.field = null;
	
	// Tile Layers	
	this.backgroundLayer = null;
	this.collisionLayer = null;
};

Map.prototype = {
	create: function(mapId) {
		// Prep the rooms
		this.field = this.game.add.tilemap(mapId);
		
	    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	    this.field.addTilesetImage('tiled_assets', 'assets');
	
	    //create layer
	    this.backgroundLayer = this.field.createLayer('backgroundLayer');
	    this.collisionLayer = this.field.createLayer('collisionLayer');
	
	    //collision on blockedLayer
	    this.field.setCollisionBetween(1, 1200, true, 'collisionLayer');
	
	    //resizes the game world to match the layer dimensions
	    this.collisionLayer.resizeWorld();
    }
};
