function Map(game){
	// Game
	this.game = game;
	
	// Main Field
	this.field = null;
	
	// Tile Layers	
	this.backgroundLayer = null;
	this.collisionLayer = null;
	this.worldBounds = null;
	
	// Map Bounds is checked in player.js to see if player is going beyond the bounds to scroll the map, mapScrollDirection will only not be null when it needs to scroll
	this.mapBounds = {'minX': this.game.world.bounds.x, 
	                  'minY': this.game.world.bounds.y, 
	                  'maxX': GAMEHEIGHT + this.game.world.bounds.x, 
	                  'maxY': GAMEWIDTH + this.game.world.bounds.y};
	this.scrollDirection = null;
	
};

Map.prototype = {
    create: function(mapId) {
	    console.log(this.game.world.bounds);
		// Prep the rooms
		this.field = this.game.add.tilemap(mapId);
		console.log(this.mapBounds);
		
	    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	    this.field.addTilesetImage('tiled_assets', 'assets');
	
	    //create layer
	    this.backgroundLayer = this.field.createLayer('backgroundLayer');
	    this.collisionLayer = this.field.createLayer('collisionLayer');
	    this.worldBounds = this.field.createLayer('worldBounds');
	
	    //collision on blockedLayer
	    this.field.setCollisionBetween(1, 1200, true, 'collisionLayer');
    },
    
    update: function() {
    	if (this.scrollDirection) {
    		this.scrollMap();
    		this.scrollDirection = null;
    	}
    },
    
    scrollMap: function() {
    	if (this.scrollDirection === 'up') {
    		this.mapBounds.maxY = this.mapBounds.minY - TILESPACING / 2;
    		this.mapBounds.minY = this.mapBounds.minY - GAMEWIDTH - TILESPACING / 2;
    	}
    	else if (this.scrollDirection === 'down') {
    		this.mapBounds.minY = this.mapBounds.maxY + TILESPACING / 2;
    		this.mapBounds.maxY = this.mapBounds.maxY + GAMEWIDTH + TILESPACING / 2;
    	}
    	else if (this.scrollDirection === 'left') {
    		this.mapBounds.maxX = this.mapBounds.minX - TILESPACING / 2;
    		this.mapBounds.minX = this.mapBounds.minX - GAMEHEIGHT - TILESPACING / 2;
    	}
    	else if (this.scrollDirection === 'right') {
    		this.mapBounds.minX = this.mapBounds.maxX + TILESPACING / 2;
    		this.mapBounds.maxX = this.mapBounds.maxX + GAMEHEIGHT + TILESPACING / 2;
    	}
    	
    	this.game.world.setBounds(this.mapBounds.minX, this.mapBounds.minY, GAMEHEIGHT, GAMEWIDTH);
    	
    	console.log(this.mapBounds);
    	console.log(this.game.world.bounds);
    }
};
