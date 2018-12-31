var MenuButton = me.GUI_Object.extend({
    "onClick" : function () {
        // Change to the PLAY state when the button is clicked
        me.state.change(me.state.PLAY);
        return true;
    }
});

game.WinScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        // Load background image
		var yellow = new me.ImageLayer(0, 0, {
                image: me.loader.getImage('yellow'),
                z: 0 // z-index
            })
			
		var orange = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('orange'),
            z: 0 // z-index
        })
		
		var red = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('red'),
            z: 0 // z-index
        })
		
        //me.game.world.addChild(yellow);me.game.world.addChild(red);
		setTimeout(function(color,world){world.addChild(color)},0,yellow,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},2000,orange,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},4000,red,me.game.world);
		//setTimeout(me.game.world.addChild,4000,red);

        // Add a button
        //me.game.world.addChild(
       //     new MenuButton(350, 200, { "image" : "start" }),
        //    1 // z-index
        //);

    },

    onDestroyEvent : function () {
        // Stop music
        me.audio.stopTrack();
    }
});
