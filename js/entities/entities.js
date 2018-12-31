/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings)
    {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(3, 15);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
		this.renderable.addAnimation("appear",  [0,1,2,3,4,5,6]);
        this.renderable.addAnimation("walk",  [10,11,12,13,14,15,16,17,18,19,20]);
		this.renderable.addAnimation("jump",  [21,22,23,24]);
		this.renderable.addAnimation("shoot",  [25,26,27]);
        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand",  [7, 8, 9]);
        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");
		// set initial direction
		this.directionright = true;
    },

    /**
     * update the entity
     */
    update : function (dt) {

        if (me.input.isKeyPressed('left'))
        {
            // flip the sprite on horizontal axis
            this.renderable.flipX(true); this.directionright = false;
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }
        else if (me.input.isKeyPressed('right'))
        {
            // unflip the sprite
            this.renderable.flipX(false); this.directionright = true;
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }
        else
        {
            this.body.vel.x = 0;
            // change to the standing animation
			if (!this.renderable.isCurrentAnimation("jump") && !this.renderable.isCurrentAnimation("stand")) {
                this.renderable.setCurrentAnimation("stand");
			}
            //this.renderable.setCurrentAnimation("stand");
        }
        if (me.input.isKeyPressed('jump'))
        {
            if (!this.body.jumping && !this.body.falling)
            {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
				if (!this.renderable.isCurrentAnimation("jump")) {
					this.renderable.setCurrentAnimation("jump", (function(that){
						//that.animationpause = true;
						that.renderable.setCurrentAnimation("stand");
					})(this));
					
					/*, (function(that){
						//alert(that);
						that.animationpause = true;
						setTimeout(function (that) {
							that.renderable.setCurrentAnimation("stand");
							return false;
						}, 1000, that);
						
						that.renderable.setCurrentAnimation("stand");
					})(this));*/
				}
                // play some audio
                //me.audio.play("jump");
            }
        }
		if (me.input.isKeyPressed("shoot")) {
			if (!this.renderable.isCurrentAnimation("shoot")) {
				this.renderable.setCurrentAnimation("shoot");
				/*this.renderable.setCurrentAnimation("shoot", (function(){
					this.animationpause = true;
					 setTimeout(function () {
						 console.log("jkak");
						this.setCurrentAnimation("standing");
					}, 1000);
						//this.setCurrentAnimation("stand");
				}).bind(this));*/
			}
			if(this.directionright)
				me.game.world.addChild(new game.Laser(this.pos.x + 25, this.pos.y + 30, this.directionright));
			else
				me.game.world.addChild(new game.Laser(this.pos.x - 25, this.pos.y + 30, this.directionright));
		}


        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

  /**
     * colision handler
     */
    onCollision : function (response, other) {
		//if (!this.renderable.isCurrentAnimation("stand")) {
		//	this.renderable.setCurrentAnimation("stand");
        //}
        switch (response.b.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                // Simulate a platform object
                if (other.type === "platform") {
                    if (this.body.falling &&
                        !me.input.isKeyPressed('down') &&
                        // Shortest overlap would move the player upward
                        (response.overlapV.y > 0) &&
                        // The velocity is reasonably fast enough to have penetrated to the overlap depth
                        (~~this.body.vel.y >= ~~response.overlapV.y)
                    ) {
                        // Disable collision on the x axis
                        response.overlapV.x = 0;
                        // Repond to the platform (it is solid)
                        return true;
                    }
                    // Do not respond to the platform (pass through)
                    return false;
                }
                break;
			case me.collision.types.PROJECTILE_OBJECT:
				return false;
				break;
            case me.collision.types.ENEMY_OBJECT:
                //if ((response.overlapV.y>0) && !this.body.jumping) {
                    // bounce (force jump)
                    //this.body.falling = false;
                    //this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    //this.body.jumping = true;
                    // play some audio
                    //me.audio.play("stomp");
                //}
                //else {
                    // let's flicker in case we touched an enemy
                    this.renderable.flicker(750);
                //}
                return false;
                break;

            default:
                // Do not respond to other objects (e.g. coins)
                return false;
        }

        // Make the object solid
        return true;
    }
});


/**
 * Coin Entity
 */
game.CoinEntity = me.CollectableEntity.extend(
{

    init: function (x, y, settings)
    {
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y , settings]);
    },

    /**
     * colision handler
     */
    onCollision : function (response, other) {
        // do something when collide
        //me.audio.play("cling");
        // give some score
        //game.data.score += 250;
        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        // remove it
        me.game.world.removeChild(this);

        return false;
    }
});

/**
 * Enemy Entity
 */
game.EnemyEntity = me.Entity.extend(
{
    init: function (x, y, settings)
    {
        // define this here instead of tiled
        settings.image = "enemy";

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.framewidth = settings.width = 50;
        settings.frameheight = settings.height = 60;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.framewidth
        this.pos.x  = x + width - settings.framewidth;

        // to remember which side we were walking
        //this.walkLeft = false;
		this.walkLeft = settings.directionright;

        // walking & jumping speed
        this.body.setVelocity(0.5, 6);
		//this.body.collisionType = me.collision.types.ENEMY_OBJECT;
    },

    // manage the enemy movement
    update : function (dt)
    {
        if (this.alive)
        {/*
            if (this.walkLeft && this.pos.x <= this.startX)
            {
                this.walkLeft = false;
            }
            else if (!this.walkLeft && this.pos.x >= this.endX)
            {
                this.walkLeft = true;
            }
*/
            this.renderable.flipX(this.walkLeft);
            this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;

        }
        else
        {
            this.body.vel.x = 0;
        }
        // check & update movement
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    /*onCollision : function (response, other) {
        if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
            // res.y >0 means touched by something on the bottom
            // which mean at top position for this one
            if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
                this.renderable.flicker(750);
            }
            return false;
        }
        // Make all other objects solid
        return true;
    }*/
	
	onCollision : function (response, other) {
		console.log(response.b.body.collisionType);
		switch (response.b.body.collisionType){
			case me.collision.types.ACTION_OBJECT:
				if (other.type === "princess") {
					//game.data.score-=100;
					//console.log("lose");
					//me.state.change(me.state.GAME_END);
					setTimeout(me.state.change,1000,me.state.GAME_OVER);
					//me.state.change(me.state.GAME_END);
					//me.state.set(me.state.MENU, new game.TitleScreen());
					//me.state.change(me.state.MENU);
				}
				else if (other.type === "door") {
					game.data.score+=250;
					me.game.world.removeChild(this);
					//game.data.score=-25000;
					//me.state.change(me.state.GAME_END);
					var sprite = new me.Sprite(400, 100, {
						image : "leadnotify",
						framewidth : 251,
						frameheight : 102,
						anchorPoint : new me.Vector2d(0.5, 0.5)
					});
					//me.game.add(sprite, 100); 
					//me.game.sort();
					me.game.world.addChild(sprite,100);
					//setTimeout(me.game.world.removeChild,10000,sprite);
					//me.game.world.removeChild(sprite);
					setTimeout(function(obj){me.game.world.removeChild(obj);}, 1000, sprite);
				}
				return false;
				break;
			case me.collision.types.PROJECTILE_OBJECT:
				this.walkLeft = !this.walkLeft;
				return false;
				break;
			case 8:
			//alert("LOL");
				this.walkLeft = !this.walkLeft;
				return false;
				break;
			case me.collision.types.WORLD_SHAPE:
				if (other.type === "side") {
					this.walkLeft = !this.walkLeft;
				}
				return true;
				break;
			default:
				if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
					this.renderable.flicker(750);
				}
				return false;
		}
    }
});

game.PrincessEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings)
    {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
		this.body.collisionType = me.collision.types.ACTION_OBJECT;
		this.erodatesprite = new me.Sprite(51, 432, {
						image : "erodate",
						framewidth : 102,
						frameheight : 32,
						anchorPoint : new me.Vector2d(0.5, 0.5)
					});
		this.flirtsprite = new me.Sprite(764, 424, {
						image : "flirt",
						framewidth : 67,
						frameheight : 50,
						anchorPoint : new me.Vector2d(0.5, 0.5)
					});
		this.fireadsprite = new me.Sprite(400, 300, {
						image : "fireads",
						framewidth : 213,
						frameheight : 49,
						anchorPoint : new me.Vector2d(0.5, 0.5)
					});
					//me.game.add(sprite, 100); 
					//me.game.sort();
					me.game.world.addChild(this.erodatesprite,100);
					me.game.world.addChild(this.flirtsprite,100);
					me.game.world.addChild(this.fireadsprite,100);
	},
	
	update : function (time) {
		if (game.data.score >= 750)
			setTimeout(me.state.change,1000,me.state.GAME_END);
			//me.state.change(me.state.GAME_END);

        return true;
    },
	
	onCollision : function (response, other) {
		return false;
	}
});

game.DoorEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings)
    {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
		this.body.collisionType = me.collision.types.ACTION_OBJECT;
	},
	
	onCollision : function (response, other) {
		switch (response.b.body.collisionType){
			case me.collision.types.ENEMY_OBJECT:
			//alert("LOL");
				//game.data.score=2000;			
				return false;
				break;
			default:
				return false;
		}
    }
});

game.Laser = me.Entity.extend({
    init : function (x, y, directionright) {
        this._super(me.Entity, "init", [x, y, { width: game.Laser.width, height: game.Laser.height }]);
        this.z = 5;
		this.directionright = directionright;
		if(this.directionright)
			this.body.setVelocity(1000, 0);
		else
			this.body.setVelocity(1000, 0);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable = new (me.Renderable.extend({
            init : function () {
                this._super(me.Renderable, "init", [0, 0, game.Laser.width, game.Laser.height]);
            },
            destroy : function () {},
            draw : function (renderer) {
                var color = renderer.getColor();
                renderer.setColor('#5EFF7E');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));
        this.alwaysUpdate = true;
    },

    update : function (time) {
		if (this.directionright) {
			this.body.vel.x += this.body.accel.x * time / 1000;
		}
		else
			this.body.vel.x -= this.body.accel.x * time / 1000;
        if (this.pos.x + this.width <= 0 || this.pos.x - this.width >= me.game.viewport.width) {
            me.game.world.removeChild(this);
        }

        this.body.update();
        me.collision.check(this);

        return true;
    }
});

game.Laser.width = 28;
game.Laser.height = 5;

