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
		
        me.game.world.addChild(
            new me.ImageLayer(0, 0, {
                image: me.loader.getImage('title_screen'),
                z: 0 // z-index
            })
        );

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
