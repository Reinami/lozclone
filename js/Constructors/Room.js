function Room(game){
	this.game = game;
};

Room.prototype.create = function (_areaId) {
	// Prep the rooms
	this.areaId = _areaId ? _areaId : 'overworld';
	this.map = this.game.add.tilemap(this.areaId);

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'assets');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 1157, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();
}
