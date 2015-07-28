function Map(game){
	this.game = game;
};

Map.prototype = {
	create: function(mapId) {
		// Prep the rooms
		this.map = this.game.add.tilemap(mapId);
		
	    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	    this.map.addTilesetImage('tiled_assets', 'assets');
	
	    //create layer
	    this.backgroundlayer = this.map.createLayer('backgroundLayer');
	    this.blockedLayer = this.map.createLayer('blockedLayer');
	    this.triggerLayer = this.map.createLayer('triggerLayer');
	
	    //collision on blockedLayer
	    this.map.setCollisionBetween(1, 1157, true, 'blockedLayer');
	
	    //resizes the game world to match the layer dimensions
	    this.backgroundlayer.resizeWorld();
   }
};
