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
		
		me.game.world.addChild(new me.ColorLayer("background", "#0f0f0f"), 0);
		var money = new me.ImageLayer(0, 0, {
                image: me.loader.getImage('money'),
                z: 0, // z-index
				repeat :"no-repeat"
            })
			
		var idylla1 = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('idylla1'),
            z: 0, // z-index
			repeat :"no-repeat"
        })
		
		var idylla2 = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('idylla2'),
            z: 0, // z-index
			repeat :"no-repeat"
        })
		
		var idylla3 = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('idylla3'),
            z: 0, // z-index
			repeat :"no-repeat"
        })
		var idylla4 = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('idylla4'),
            z: 0, // z-index
			repeat :"no-repeat"
        })
		var idylla5 = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('idylla5'),
            z: 0, // z-index
			repeat :"no-repeat"
        })
		var idylla6 = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('idylla6'),
            z: 0, // z-index
			repeat :"no-repeat"
        })
		var idylla7 = new me.ImageLayer(0, 0, {
            image: me.loader.getImage('idylla7'),
            z: 0, // z-index,
			repeat :"no-repeat"
        })
		
		
        //me.game.world.addChild(yellow);me.game.world.addChild(red);
		setTimeout(function(color,world){world.addChild(color)},0,money,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},500,idylla1,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},1000,idylla2,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},1500,idylla3,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},2000,idylla4,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},2500,idylla5,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},3000,idylla6,me.game.world);
		setTimeout(function(color,world){world.addChild(color)},3500,idylla7,me.game.world);
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
