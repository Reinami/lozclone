var Unicorns = Unicorns || {};

Unicorns.MainMenu = function(){};

Unicorns.MainMenu.prototype = {
	create: function () {
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'assets', 959);
		
		// Start Game Text
		var text = 'Click to begin';
		var style = { font: '30px Arial', fill: '#fff', align: 'center'};
		var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
		t.anchor.set(0.5);
	},
	update: function() {
		if(this.game.input.activePointer.justPressed()) {
			this.game.state.start('Play');
		}
	},
};
