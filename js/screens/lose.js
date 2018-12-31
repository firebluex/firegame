var MenuButton = me.GUI_Object.extend({
    "onClick" : function () {
        // Change to the PLAY state when the button is clicked
        me.state.change(me.state.PLAY);
        return true;
    }
});

game.LoseScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        // Load background image
		me.game.world.addChild(new me.ColorLayer("background", "#0f0f0f"), 0);
		var polana1 = new me.ImageLayer(0, 0, {
                image: me.loader.getImage('polana1'),
                z: 0 // z-index
            })
			
		var polana2 = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('polana2'),
            z: 0 // z-index
        })
		
		var polana3 = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('polana3'),
            z: 0 // z-index
        })
		
		var gameover = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('gameover'),
            z: 0 // z-index
        })
		
        //me.game.world.addChild(yellow);me.game.world.addChild(red);
		setTimeout(function(color,world){world.addChild(color)},0,polana1,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},1000,polana2,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},2000,polana3,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},3000,gameover,me.game.world);
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
