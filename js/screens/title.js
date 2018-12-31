game.TitleScreen = me.ScreenObject.extend({

    /**
     *  action to perform on state change
     */
    onResetEvent : function() {

		me.game.world.addChild(new me.ColorLayer("background", "#0f0f0f"), 0);
		

        // add a new renderable component with the scrolling text
        me.game.world.addChild(new (me.Renderable.extend ({
            // constructor
            init : function() {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

                // font for the scrolling text
				//var myFont = new me.BitmapText(100, 100, {font:"arial", text:"Hello"});
                this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

                //this.scroller = "A SMALL STEP BY STEP TUTORIAL FOR GAME CREATION WITH MELONJS       ";
                //this.scrollerpos = 600;

                 // a tween to animate the arrow
                //this.scrollertween = new me.Tween(this).to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
				//this.font.textAlign = "left";
				//this.text = "PRESS ENTER TO PLAY";
				this.framescount=0;
				//var that = this;
				//for (var i=0;i<this.text.length;i++) {
					
					//alert(i);
				   /*(function(ind,that,rend) {
					   //that.font.draw(renderer, that.text[i], me.game.viewport.width / 2 +i*25 , 480);
					   var hello=that;
					   //setTimeout(function(that){that.font.draw(renderer, that.text[i], me.game.viewport.width / 2 +i*32 , 480);}, 1000 + (3000 * ind), hello);
					   setTimeout(function(that,rend){alert(rend); that.font.draw(rend, that.text[ind], me.game.viewport.width / 2 +ind*32 , 480);},1000,that,rend);
				   })(i,this,renderer);*/
				//}
            },

            // some callback for the tween objects
            /*scrollover : function() {
                // reset to default value
                this.scrollerpos = 640;
                this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
            },*/

            update : function (dt) {
                return true;
            },

            draw : function (renderer) {
                this.font.textAlign = "left";
				this.text = "NADESZLY MROCZNE CZASY...";
				this.text2 = "W OKOLICY POJAWIA SIE"
				this.text3 = "CORAZ WIECEJ NAPALENCOW";
				this.text4 = "KOBIETY NIE MOGA JUZ";
				this.text5 = "CZUC SIE BEZPIECZNIE...";
				this.text6 = "NA SZCZESCIE W PORE";
				this.text7 = "POJAWILO SIE FIREADS";
				this.text8 = "RAZEM Z NAJLEPSZYMI";
				this.text9 = "EROTYCZNYMI PROGRAMAMI";
				this.text10 = "AFILIACYJNYMI";
				//this.text6 = "NACISNIJ ENTER ABY ROZPOCZAC";
				
				this.framescount+=1;
				//if(this.framescount>=300)
				//{
				//	this.font.draw(renderer, this.text, me.game.viewport.width / 2 , 480);
				//	alert(this.framescount);
				//}
				/*if(this.framescount>=30)
				{
					this.font.draw(renderer, this.text[0], me.game.viewport.width / 2 + 0*32, 480);
				}
				if(this.framescount>=60)
				{
					this.font.draw(renderer, this.text[1], me.game.viewport.width / 2 +1*32, 480);
				}
				if(this.framescount>=90)
				{
					this.font.draw(renderer, this.text[2], me.game.viewport.width / 2 +2*32, 480);
				}*/
				
				for(var i=0;i<this.text.length;i++)
				{
					if (this.framescount>=i*10)
					{
						this.font.draw(renderer, this.text[i], me.game.viewport.width / 2 + i*32, 320);
					}
				}
				
				for(var i=0;i<this.text2.length;i++)
				{
					if (this.framescount>= 100+this.text.length*10 + i*10)
					{
						this.font.draw(renderer, this.text2[i], me.game.viewport.width / 2 + i*32, 360);
					}
				}
				
				for(var i=0;i<this.text3.length;i++)
				{
					if (this.framescount>= 100+(this.text.length+this.text2.length)*10 + i*10)
					{
						this.font.draw(renderer, this.text3[i], me.game.viewport.width / 2 + i*32, 400);
					}
				}
				
				for(var i=0;i<this.text4.length;i++)
				{
					if (this.framescount>= 100+(this.text.length+this.text2.length+this.text3.length)*10 + i*10)
					{
						this.font.draw(renderer, this.text4[i], me.game.viewport.width / 2 + i*32, 440);
					}
				}
				
				for(var i=0;i<this.text5.length;i++)
				{
					if (this.framescount>= 100+(this.text.length+this.text2.length+this.text3.length+this.text4.length)*10 + i*10)
					{
						this.font.draw(renderer, this.text5[i], me.game.viewport.width / 2 + i*32, 480);
					}
				}
				
				for(var i=0;i<this.text6.length;i++)
				{
					if (this.framescount>= 100+(this.text.length+this.text2.length+this.text3.length+this.text4.length+this.text5.length)*10 + i*10)
					{
						this.font.draw(renderer, this.text6[i], me.game.viewport.width / 2 + i*32, 520);
					}
				}
				
				for(var i=0;i<this.text7.length;i++)
				{
					if (this.framescount>= 100+(this.text.length+this.text2.length+this.text3.length+this.text4.length+this.text5.length+this.text6.length)*10 + i*10)
					{
						this.font.draw(renderer, this.text7[i], me.game.viewport.width / 2 + i*32, 560);
					}
				}
				for(var i=0;i<this.text8.length;i++)
				{
					if (this.framescount>= 100+(this.text.length+this.text2.length+this.text3.length+this.text4.length+this.text5.length+this.text6.length+this.text7.length)*10 + i*10)
					{
						this.font.draw(renderer, this.text8[i], me.game.viewport.width / 2 + i*32, 600);
					}
				}
				
				for(var i=0;i<this.text9.length;i++)
				{
					if (this.framescount>= 100+(this.text.length+this.text2.length+this.text3.length+this.text4.length+this.text5.length+this.text6.length+this.text7.length+this.text8.length)*10 + i*10)
					{
						this.font.draw(renderer, this.text9[i], me.game.viewport.width / 2 + i*32, 640);
					}
				}
				
				for(var i=0;i<this.text10.length;i++)
				{
					if (this.framescount>= 100+(this.text.length+this.text2.length+this.text3.length+this.text4.length+this.text5.length+this.text6.length+this.text7.length+this.text8.length+this.text9.length)*10 + i*10)
					{
						this.font.draw(renderer, this.text10[i], me.game.viewport.width / 2 + i*32, 680);
					}
				}
				if (this.framescount>= 100+(this.text.length+this.text2.length+this.text3.length+this.text4.length+this.text5.length+this.text6.length+this.text7.length+this.text8.length+this.text9.length)*10 + i*10)
				
				this.font.draw(renderer, "NACISNIJ ENTER ABY ROZPACZAC GRE", me.game.viewport.width / 2, 720);
			
			//for(var i=0;i<this.text.length;i++)
				//{
				//	this.font.draw(renderer, this.text[i], me.game.viewport.width / 2 +i*32 , 480);
				//}
				//var that = this;
				//for (var i=0;i<this.text.length;i++) {
					
					//alert(i);
				   /*(function(ind,that,rend) {
					   //that.font.draw(renderer, that.text[i], me.game.viewport.width / 2 +i*25 , 480);
					   var hello=that;
					   //setTimeout(function(that){that.font.draw(renderer, that.text[i], me.game.viewport.width / 2 +i*32 , 480);}, 1000 + (3000 * ind), hello);
					   setTimeout(function(that,rend){alert(rend); that.font.draw(rend, that.text[ind], me.game.viewport.width / 2 +ind*32 , 480);},1000,that,rend);
				   })(i,this,renderer);*/
				//}
                //this.font.draw(renderer, "PRESS ENTER TO PLAY", me.game.viewport.width , 480);
				//this.font.draw(renderer, "SECOND LINE", me.game.viewport.width , 520);
				//this.font.drawStroke(renderer, "third LINE", me.game.viewport.width , 560);
				//this.font.setText("myText");
                this.font.textAlign = "left";
                //this.font.draw(renderer, this.scroller, this.scrollerpos, 440);
            },
            onDestroyEvent : function() {
                //just in case
                //this.scrollertween.stop();
            }
        })), 2);

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                // play something on tap / enter
                // this will unlock audio on mobile devices
                me.audio.play("cling");
                me.state.change(me.state.PLAY);
            }
        });
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
   }
});
